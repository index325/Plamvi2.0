import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  Platform,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';

import AntIcon from 'react-native-vector-icons/AntDesign';
import { authRequest } from '../../redux/modules/auth/actions';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';

import api from '../../services/api';

import { IUser } from '../../interfaces';

import {
  Container,
  Header,
  GoBackButton,
  TitleContainer,
  Title,
  Description,
  SignInForm,
  FormBody,
  ForgotPasswordButton,
  ForgotPasswordText,
  SubmitButton,
  SubmitButtonText,
} from './styles';

interface SignUpFormData {
  email: string;
  password: string;
}

interface SignInResponse {
  user: IUser;
  token: string;
}

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);
  const navigator = useNavigation();

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleGoBack = useCallback(() => {
    navigator.goBack();
  }, [navigator]);

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('Email obrigatório'),
          password: Yup.string().min(6, 'Mínimo de 6 caracteres'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // const response = await api.post<SignInResponse>(
        //   '/users/sessions',
        //   data,
        // );

        dispatch(authRequest({ password: data.password, email: data.email }));

        // navigator.navigate('Dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao fazer cadastro, tente novamente',
        );
      }
    },
    [navigator],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Container>
          <Header>
            <GoBackButton onPress={handleGoBack} activeOpacity={0.6}>
              <AntIcon name="arrowleft" size={20} color="#ff3647" />
            </GoBackButton>
          </Header>
          <TitleContainer>
            <Title>Que legal te ver de novo.</Title>
            <Description>
              Informe as suas credenciais para acessar a sua conta.
            </Description>
          </TitleContainer>
          <SignInForm ref={formRef} onSubmit={handleSignUp}>
            <FormBody>
              <Input
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                ref={emailInputRef}
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                autoCorrect={false}
                name="password"
                icon="lock"
                placeholder="Senha"
                returnKeyType="next"
                ref={passwordInputRef}
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />

              <ForgotPasswordButton onPress={() => {}} activeOpacity={0.6}>
                <ForgotPasswordText>Esqueci minha senha 🤔</ForgotPasswordText>
              </ForgotPasswordButton>
            </FormBody>

            <SubmitButton onPress={() => formRef.current?.submitForm()}>
              <SubmitButtonText>Entrar</SubmitButtonText>
            </SubmitButton>
          </SignInForm>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
