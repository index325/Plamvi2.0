import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef } from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
} from 'react-native';
import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import AntIcon from 'react-native-vector-icons/AntDesign';

import { useDispatch, useSelector } from 'react-redux';
import getValidationErrors from '../../../utils/getValidationErrors';
import Input from '../../../components/Input';

import api from '../../../services/api';

import {
  Container,
  Header,
  TitleContainer,
  Title,
  Description,
  GoBackButton,
  SubmitButton,
  SubmitButtonText,
  PlaceInputContainer,
} from './styles';

import PlaceInput from '../../../components/PlaceInput';
import { IAuthState } from '../../../redux/modules/auth/types';
import { IState } from '../../../redux';
import { IUser } from '../../../interfaces';
import { alertRequest } from '../../../redux/modules/alerts/actions';
import { authSuccess } from '../../../redux/modules/auth/actions';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  state: string;
  city: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigator = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector<IState, IAuthState>(state => state.auth)
    .user as IUser;

  const { token } = useSelector<IState, IAuthState>(state => state.auth);

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
          password: Yup.string()
            .min(6, 'Mínimo de 6 caracteres')
            .required('A senha atual é obrigatória'),
          state: Yup.string().required('O estado é obrigatório'),
          city: Yup.string().required('A cidade é obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        api
          .put<IUser>('/users', data, {
            headers: {
              'Content-Type': 'application/json',
              Accept: '*/*',
              Authorization: `Bearer ${token}`,
            },
          })
          .then(response => {
            dispatch(
              authSuccess({
                token,
                user: response.data,
              }),
            );
            dispatch(
              alertRequest({
                message: 'Informações atualizadas com sucesso',
                isDialog: true,
                messageType: 'success',
              }),
            );
            navigator.goBack();
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
            messageType: 'danger',
          }),
        );
      }
    },
    [navigator, dispatch, token],
  );

  // const handleAvatarPick = useCallback(() => {
  //   ImagePicker.showImagePicker(
  //     {
  //       title: 'Selecione um avatar',
  //       cancelButtonTitle: 'Cancelar',
  //       takePhotoButtonTitle: 'Usar câmera',
  //       chooseFromLibraryButtonTitle: 'Escoher da galeria',
  //     },
  //     response => {
  //       if (response.didCancel) {
  //         return;
  //       }

  //       if (response.error) {
  //         Alert.alert('Erro ao atualizar seu avatar');
  //         return;
  //       }

  //       const data = new FormData();

  //       data.append('avatar', {
  //         type: 'image/jpg',
  //         name: `${user.id}.jpg`,
  //         uri: response.uri,
  //       });

  //       api
  //         .patch('/users/avatar', data)
  //         .then(apiResponse => updateUser(apiResponse.data));
  //     },
  //   );
  // }, [updateUser, user.id]);

  return (
    <>
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
              <Title>Olá, {user.name}.</Title>
              <Description>
                Aqui você poderá alterar os dados de sua conta. Basta preencher
                o formulário abaixo!
              </Description>
            </TitleContainer>
            <Form ref={formRef} initialData={user} onSubmit={handleSignUp}>
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

              <PlaceInputContainer>
                <PlaceInput
                  autoCorrect={false}
                  name="state"
                  icon="map"
                  placeholder="UF"
                  returnKeyType="next"
                  ref={ufInputRef}
                  onSubmitEditing={() => {
                    cityInputRef.current?.focus();
                  }}
                />
                <PlaceInput
                  autoCorrect={false}
                  name="city"
                  icon="home"
                  placeholder="Cidade"
                  returnKeyType="next"
                  ref={cityInputRef}
                  onSubmitEditing={() => {
                    formRef.current?.submitForm();
                  }}
                />
              </PlaceInputContainer>

              <Input
                autoCorrect={false}
                name="password"
                icon="lock"
                placeholder="Senha atual"
                returnKeyType="next"
                ref={passwordInputRef}
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />

              <SubmitButton onPress={() => formRef.current?.submitForm()}>
                <SubmitButtonText>Confirmar alterações</SubmitButtonText>
              </SubmitButton>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;