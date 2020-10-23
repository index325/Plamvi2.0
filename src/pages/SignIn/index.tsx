import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Platform,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';

import AntIcon from 'react-native-vector-icons/AntDesign';
import Spinner from 'react-native-loading-spinner-overlay';
import { authRequest } from '../../redux/modules/auth/actions';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';

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
import { alertRequest } from '../../redux/modules/alerts/actions';
import { IState } from '../../redux';
import { IAuthState } from '../../redux/modules/auth/types';

interface SignUpFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);
  const navigator = useNavigation();

  const { loading } = useSelector<IState, IAuthState>(state => state.auth);

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
        dispatch(
          authRequest({
            password: data.password,
            email: data.email,
            loading: true,
          }),
        );
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        dispatch(
          alertRequest({
            message: 'Ocorreu um erro ao fazer login, tente novamente',
            isDialog: true,
            messageType: 'danger',
          }),
        );
      }
    },
    [dispatch],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Spinner
          visible={loading}
          textContent="Carregando..."
          textStyle={styles.spinnerTextStyle}
        />
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
                secureTextEntry
                placeholder="Senha"
                returnKeyType="send"
                autoCompleteType="password"
                ref={passwordInputRef}
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <ForgotPasswordButton
                onPress={() => navigator.navigate('ForgotPassword')}
                activeOpacity={0.6}
              >
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  spinnerTextStyle: {
    color: '#ff3647',
  },
});

export default SignIn;
