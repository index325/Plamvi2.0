import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;

  padding: 24px;

  background-color: #f7f7f7;
`;

export const LogoContainer = styled.View`
  margin-top: 96px;
`;

export const Logo = styled.Image`
  width: 240px;
  height: 64px;

  margin-bottom: 16px;
`;

export const Subtitle = styled.Text`
  color: #5e5e5e;
  font-size: 15px;
  font-family: 'Roboto-Medium';
`;

export const ButtonsContainer = styled.View`
  margin-top: 248px;

  align-items: center;
`;

export const Button = styled(RectButton)`
  background-color: #ff3647;
  height: 64px;
  width: 100%;

  border-radius: 8px;
  margin-bottom: 8px;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;

  font-size: 16px;
  margin: auto;

  font-family: 'Roboto-Regular';
`;
