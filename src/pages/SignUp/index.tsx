import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {
  Container,
  Header,
  TitleContainer,
  Title,
  Description,
  GoBackButton,
  Form,
  Input,
  InputContainer,
  SubmitButton,
  SubmitButtonText,
  InputIcon,
  PlaceInputContainer,
  PlaceInputGroupContainer,
} from './styles';

const SignIn: React.FC = () => {
  const navigator = useNavigation();

  const handleGoBack = useCallback(() => {
    navigator.goBack();
  }, [navigator]);

  return (
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

      <Form>
        <InputContainer>
          <InputIcon name="user" size={18} />
          <Input placeholder="Seu nome" />
        </InputContainer>

        <InputContainer>
          <InputIcon name="mail" size={18} />
          <Input placeholder="E-mail" />
        </InputContainer>

        <InputContainer>
          <InputIcon name="lock" size={18} />
          <Input placeholder="Senha" />
        </InputContainer>

        <PlaceInputGroupContainer>
          <PlaceInputContainer>
            <Input placeholder="UF" />
            <InputIcon name="chevron-down" size={18} />
          </PlaceInputContainer>

          <PlaceInputContainer>
            <Input placeholder="Cidade" />
            <InputIcon name="chevron-down" size={18} />
          </PlaceInputContainer>
        </PlaceInputGroupContainer>

        <SubmitButton>
          <SubmitButtonText>Cadastrar</SubmitButtonText>
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default SignIn;
