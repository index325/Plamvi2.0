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
} from './styles';

import { IAuthState } from '../../../redux/modules/auth/types';
import { IState } from '../../../redux';
import { alertRequest } from '../../../redux/modules/alerts/actions';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  state: string;
  city: string;
}

const UpdateUserPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigator = useNavigation();
  const dispatch = useDispatch();

  const { token, user } = useSelector<IState, IAuthState>(state => state.auth);

  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);

  const handleGoBack = useCallback(() => {
    navigator.goBack();
  }, [navigator]);

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          old_password: Yup.string()
            .required()
            .min(6, 'Mínimo de 6 caracteres'),
          new_password: Yup.string()
            .min(6, 'Mínimo de 6 caracteres')
            .when('old_password', {
              is: value => !!value.length,
              then: Yup.string().required('Você precisa inserir a nova senha'),
              otherwise: Yup.string(),
            }),
          new_password_confirmation: Yup.string()
            .min(6, 'Mínimo de 6 caracteres')
            .when('old_password', {
              is: value => !!value.length,
              then: Yup.string().required(
                'Você precisa confirmar a nova senha',
              ),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('new_password')], 'As senhas precisam ser iguais'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        api
          .put('/users/password', data, {
            headers: {
              'Content-Type': 'application/json',
              Accept: '*/*',
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            dispatch(
              alertRequest({
                message: 'Senha atualizada com sucesso',
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
            messageType: 'success',
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
              <Title>Olá, {user?.name}.</Title>
              <Description>
                Aqui você poderá alterar a sua senha. Basta informar a senha
                atual, pensar em uma nova, e preencher o formulário abaixo!
              </Description>
            </TitleContainer>
            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                ref={oldPasswordInputRef}
                name="old_password"
                icon="lock"
                placeholder="Senha atual"
                secureTextEntry
                textContentType="password"
                containerStyle={{ marginTop: 16 }}
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />

              <Input
                ref={passwordInputRef}
                name="new_password"
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
                name="new_password_confirmation"
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

export default UpdateUserPassword;
