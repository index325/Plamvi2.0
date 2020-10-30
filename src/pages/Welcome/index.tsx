import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import OnboardingScreen from '../../components/OnboardingScreen';
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
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    async function getShowOnboarding() {
      const onboarding = await AsyncStorage.getItem('Plamvi@ShowOnboarding');
      setShowOnboarding(!onboarding);
      await AsyncStorage.setItem('Plamvi@ShowOnboarding', '1');
    }
    getShowOnboarding();
  }, []);

  const handleNavigateTo = useCallback(
    (screen: string) => {
      navigator.navigate(screen);
    },
    [navigator],
  );

  if (showOnboarding) {
    return <OnboardingScreen setShowOnboarding={setShowOnboarding} />;
  }

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
