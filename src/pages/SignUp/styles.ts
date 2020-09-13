import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  flex: 1;
  padding: 24px;

  background-color: #f7f7f7;
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

export const Form = styled.View`
  flex: 1;
`;

export const InputContainer = styled.View`
  width: 100%;
  height: 56px;

  padding: 0 16px;

  background-color: #fff;

  border-radius: 8px;
  margin-bottom: 8px;

  flex-direction: row;
  align-items: center;
`;

export const InputIcon = styled(Icon)`
  margin-right: 8px;

  color: #5e5e5e;
`;

export const Input = styled.TextInput`
  flex: 1;

  font-size: 16px;
`;

export const PlaceInputGroupContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const PlaceInputContainer = styled.View`
  width: 48%;
  height: 56px;

  padding: 0 16px;

  background-color: #fff;

  border-radius: 8px;

  flex-direction: row;
  align-items: center;
`;

export const SubmitButton = styled(RectButton)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: #ff3647;
  height: 64px;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 8px;

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
