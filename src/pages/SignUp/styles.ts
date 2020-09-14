import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 24px;
  background-color: #f7f7f7;

  /* Tive que colocar isso pra funcionar o keyboard avoiding view */
  justify-content: center;
`;

export const Header = styled.View``;

export const GoBackButton = styled.TouchableOpacity``;

export const TitleContainer = styled.View`
  margin-top: 32px;
  margin-bottom: 64px;
`;

export const Title = styled.Text`
  font-size: 32px;
  font-family: 'Roboto-Bold';

  color: #ff3647;

  margin-bottom: 16px;
`;

export const Description = styled.Text`
  font-size: 14px;
  color: #5e5e5e;
`;

export const PlaceInputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin-bottom: 32px;
`;

export const SubmitButton = styled(RectButton)`
  background-color: #ff3647;
  height: 64px;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 8px;
  margin-top: 8px;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const SubmitButtonText = styled.Text`
  color: #fff;

  font-size: 16px;
  margin: auto;

  font-family: 'Roboto-Bold';
`;
