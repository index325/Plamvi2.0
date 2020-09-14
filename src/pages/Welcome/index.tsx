import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import {
  Button,
  ButtonsContainer,
  ButtonText,
  Container,
  Logo,
  LogoContainer,
  Subtitle,
} from './styles';

const WelcomeScreen: React.FC = () => {
  const navigator = useNavigation();

  const handleNavigateTo = useCallback(
    (screen: string) => {
      navigator.navigate(screen);
    },
    [navigator],
  );

  return (
    <Container>
      <LogoContainer>
        <Logo
          source={require('../../assets/logo.png')}
          style={{ resizeMode: 'stretch' }}
        />
        <Subtitle>Compre mais, pague menos.</Subtitle>
      </LogoContainer>

      <ButtonsContainer>
        <Button onPress={() => handleNavigateTo('SignUp')}>
          <ButtonText>Não tenho uma conta</ButtonText>
          <Icon
            name="chevron-right"
            size={18}
            color="#fff"
            style={{ marginRight: 8 }}
          />
        </Button>
        <Button onPress={() => handleNavigateTo('SignIn')}>
          <ButtonText>Já tenho uma conta</ButtonText>
          <Icon
            name="chevron-right"
            size={18}
            color="#fff"
            style={{ marginRight: 8 }}
          />
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default WelcomeScreen;
