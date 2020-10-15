import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const ModalContainer = styled.View`
  margin: 0;
  justify-content: flex-end;
`;

export const OpenModalButton = styled(RectButton)`
  background-color: #ff3647;
  height: 48px;
  width: 50%;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ModalButtonText = styled.Text`
  padding: 8px;
  color: #fff;

  font-size: 16px;
  margin: auto;

  font-family: 'Roboto-Bold';
`;
