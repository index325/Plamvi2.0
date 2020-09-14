import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef } from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import AntIcon from 'react-native-vector-icons/AntDesign';

import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
// import Button from '../../components/Button';
import api from '../../services/api';

import {
  Container,
  Header,
  TitleContainer,
  Title,
  Description,
  GoBackButton,
  SubmitButton,
  SubmitButtonText,
  // PlaceInputContainer,
  // PlaceInputGroupContainer,
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigator = useNavigation();

  const emailInputRef = useRef<TextInput>(null);
  const nameInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const ufInputRef = useRef<TextInput>(null);
  const cityInputRef = useRef<TextInput>(null);

  const handleGoBack = useCallback(() => {
    navigator.goBack();
  }, [navigator]);

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('Email obrigatório'),
          password: Yup.string().min(6, 'Mínimo de 6 caracteres'),
          uf: Yup.string().required('O estado é obrigatório'),
          city: Yup.string().required('A cidade é obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        navigator.goBack();

        Alert.alert(
          'Cadastro realizado',
          'Você já pode fazer seu logon no GoBarber',
        );
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          console.log(errors);

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
            <Title>Seja Bem-vindo ao plamvi!</Title>
            <Description>
              Antes de começar, você precisa nos informar alguns dados.
            </Description>
          </TitleContainer>
          <Form ref={formRef} onSubmit={handleSignUp}>
            <Input
              autoCorrect={false}
              name="name"
              icon="user"
              placeholder="Seu nome"
              returnKeyType="next"
              ref={nameInputRef}
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
            />

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

            <Input
              autoCorrect={false}
              name="uf"
              icon="map"
              halfInput={true}
              placeholder="UF"
              returnKeyType="next"
              ref={ufInputRef}
              onSubmitEditing={() => {
                cityInputRef.current?.focus();
              }}
            />
            <Input
              autoCorrect={false}
              name="city"
              icon="home"
              halfInput={true}
              placeholder="Cidade"
              returnKeyType="next"
              ref={cityInputRef}
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />

            <SubmitButton>
              <SubmitButtonText onPress={() => formRef.current?.submitForm()}>
                Cadastrar
              </SubmitButtonText>
            </SubmitButton>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
