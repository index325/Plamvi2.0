import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  StatusBar,
} from 'react-native';
import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import AntIcon from 'react-native-vector-icons/AntDesign';

import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';

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
} from './styles';

import { alertRequest } from '../../redux/modules/alerts/actions';

interface RecoverPasswordFormData {
  verification_code: string;
  password: string;
  password_confirmation: string;
}

const RecoverPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigator = useNavigation();
  const dispatch = useDispatch();

  const [token, setToken] = useState<string>('');

  const verificationCodeRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);

  useEffect(() => {
    async function getToken() {
      setToken((await AsyncStorage.getItem('Plamvi@RecoveryToken')) as string);
    }
    getToken();
  }, []);

  const handleGoBack = useCallback(() => {
    navigator.goBack();
  }, [navigator]);

  const handleSignUp = useCallback(
    async (data: RecoverPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          verification_code: Yup.string().required(
            'Você precisa informar o código de verificação',
          ),
          password: Yup.string().required(
            'Você precisa confirmar a nova senha',
          ),
          password_confirmation: Yup.string()
            .required('Você precisa confirmar a nova senha')
            .oneOf([Yup.ref('password')], 'As senhas precisam ser iguais'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        api
          .post('/users/password/reset', {
            password: data.password,
            password_confirmation: data.password_confirmation,
            verification_code: data.verification_code,
            token,
          })
          .then(() => {
            dispatch(
              alertRequest({
                message: 'Senha atualizada com sucesso',
                isDialog: true,
                messageType: 'success',
              }),
            );
            navigator.navigate('SignIn');
          })
          .catch(error => {
            dispatch(
              alertRequest({
                message: error.response.data.message,
                isDialog: true,
                messageType: 'danger',
              }),
            );
          });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        dispatch(
          alertRequest({
            message: 'Ocorreu um erro ao fazer cadastro, tente novamente',
            isDialog: true,
            messageType: 'success',
          }),
        );
      }
    },
    [navigator, dispatch, token],
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <Container>
            <Header>
              <GoBackButton onPress={handleGoBack} activeOpacity={0.6}>
                <AntIcon name="arrowleft" size={20} color="#ff3647" />
              </GoBackButton>
            </Header>
            <TitleContainer>
              <Title>Olá!</Title>
              <Description>
                Aqui você poderá alterar a sua senha. Basta informar a senha
                atual, pensar em uma nova, e preencher o formulário abaixo!
              </Description>
            </TitleContainer>
            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                ref={verificationCodeRef}
                name="verification_code"
                icon="lock"
                placeholder="Código de verificação"
                secureTextEntry
                keyboardType="phone-pad"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />

              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Nova senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordConfirmationInputRef.current?.focus()
                }
              />

              <Input
                ref={passwordConfirmationInputRef}
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmar senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <SubmitButton onPress={() => formRef.current?.submitForm()}>
                <SubmitButtonText>Confirmar alteração</SubmitButtonText>
              </SubmitButton>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default RecoverPassword;
