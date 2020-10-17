import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  View,
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

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  state: string;
  city: string;
}

const RecoverPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const emailInputRef = useRef<TextInput>(null);

  const handleGoBack = useCallback(() => {
    navigator.goBack();
  }, [navigator]);

  const handleForgotPassword = useCallback(
    async (data: SignUpFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string().required('Você precisa digitar o seu e-mail'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        api
          .post('/users/password/forgot', data)
          .then(async response => {
            setLoading(false);
            await AsyncStorage.setItem(
              'Plamvi@RecoveryToken',
              response.data.token,
            );
            navigator.navigate('RecoverPassword');
          })
          .catch(error => {
            setLoading(false);
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
            message:
              'Ocorreu um erro ao tentar recuperar a sua senha. Tente mais tarde',
            isDialog: true,
            messageType: 'success',
          }),
        );
      }
    },
    [dispatch],
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {loading ? (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#ff3647" />
          </View>
        ) : (
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
                  Então quer dizer que você esqueceu a sua senha? Não fique
                  triste! Basta preencher o seu e-mail abaixo que o resto é por
                  nossa conta! 😀
                </Description>
              </TitleContainer>
              <Form ref={formRef} onSubmit={handleForgotPassword}>
                <Input
                  ref={emailInputRef}
                  name="email"
                  icon="lock"
                  placeholder="Seu e-mail"
                  textContentType="emailAddress"
                  returnKeyType="send"
                  onSubmitEditing={() => formRef.current?.submitForm()}
                />

                <SubmitButton onPress={() => formRef.current?.submitForm()}>
                  <SubmitButtonText>Enviar</SubmitButtonText>
                </SubmitButton>
              </Form>
            </Container>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </>
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
});

export default RecoverPassword;
