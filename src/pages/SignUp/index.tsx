import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import AntIcon from 'react-native-vector-icons/AntDesign';

import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { useDispatch } from 'react-redux';
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
  PlaceInputContainer,
} from './styles';

import SelectState from '../../components/Select/State';
import SelectCity from '../../components/Select/City';
import { alertRequest } from '../../redux/modules/alerts/actions';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  state: string;
  city: string;
}

interface IBGEUFResponse {
  nome: string;
  sigla: string;
  id: number;
}

interface IIBGEResponse {
  value: string;
  label: string;
  key: string | number;
}

interface IBGECityResponse {
  nome: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigator = useNavigation();
  const dispatch = useDispatch();

  const emailInputRef = useRef<TextInput>(null);
  const nameInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const ufInputRef = useRef<TextInput>(null);
  const cityInputRef = useRef<TextInput>(null);
  const [states, setStates] = useState<IIBGEResponse[]>([]);
  const [cities, setCities] = useState<IIBGEResponse[]>([]);
  const [selectedState, setSelectedState] = useState<any>();
  const [selectedCity, setSelectedCity] = useState<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get<IBGEUFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      )
      .then(response => {
        const ufInitials = response.data.map(uf => ({
          value: uf.sigla,
          label: uf.nome,
          key: uf.id,
        }));
        setLoading(false);
        setStates(ufInitials);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    setCities([]);
    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`,
      )
      .then(response => {
        const cityNames = response.data.map(city => ({
          value: city.nome,
          label: city.nome,
          key: city.nome,
        }));
        setCities(cityNames);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [selectedState]);

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
          state: Yup.string().required('O estado é obrigatório'),
          city: Yup.string().required('A cidade é obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        navigator.goBack();

        Alert.alert(
          'Cadastro realizado',
          'Você já pode fazer seu login no PLamvi!',
        );
        dispatch(
          alertRequest({
            isDialog: true,
            message:
              'Cadastro realizado! Você já pode fazer seu login no PLamvi!',
            messageType: 'success',
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
            isDialog: true,
            message: 'Ocorreu um erro ao efetuar o cadastro',
            messageType: 'danger',
          }),
        );
      }
    },
    [navigator, dispatch],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      // enabled
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
            <Title>Seja Bem-vindo ao plamvi.</Title>
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
              secureTextEntry
              placeholder="Senha"
              returnKeyType="next"
              ref={passwordInputRef}
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
            />
            <PlaceInputContainer>
              <SelectState
                name="state"
                items={states}
                setSelectedState={setSelectedState}
              />
              <SelectCity
                name="city"
                items={cities}
                setSelectedCity={setSelectedCity}
              />
            </PlaceInputContainer>

            <SubmitButton onPress={() => formRef.current?.submitForm()}>
              <SubmitButtonText>Cadastrar</SubmitButtonText>
            </SubmitButton>
          </Form>
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

export default SignUp;
