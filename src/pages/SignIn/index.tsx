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
        <Subtitle>Onde você compra mais, pagando menos.</Subtitle>
      </LogoContainer>

      <ButtonsContainer>
        <Button>
          <ButtonText onPress={() => handleNavigateTo('SignUp')}>
            Não tenho uma conta
          </ButtonText>
          <Icon
            name="chevron-right"
            size={18}
            color="#fff"
            style={{ marginRight: 8 }}
          />
        </Button>
        <Button>
          <ButtonText onPress={() => handleNavigateTo('SignIn')}>
            Já tenho uma conta
          </ButtonText>
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
