import { RectButton } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';

import { shade } from 'polished';

interface IButtonProps {
  disabled: boolean;
}

export const Content = styled.View`
  background-color: #fff;
  padding: 22px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border-color: 'rgba(0, 0, 0, 0.1)';
`;

export const ContentTitle = styled.Text`
  font-size: 20px;
  margin-bottom: 12px;
  font-family: 'Roboto-Bold';

  color: #ff3647;
`;

export const BuyContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const QuantityContainer = styled.View`
  width: 104px;
  flex-direction: row;
  border: 1px solid black;
  border-radius: 16px;
  justify-content: center;
`;

export const QuantityButton = styled.TouchableWithoutFeedback``;

export const BuyButtonText = styled.Text`
  padding: 8px;
  color: #ff3647;

  font-size: 18px;

  font-family: 'Roboto-Bold';
`;

export const QuantityText = styled.Text`
  padding: 8px;
  font-size: 18px;
`;

export const AddButton = styled.TouchableOpacity<IButtonProps>`
  background-color: #ff3647;
  height: 48px;
  width: 60%;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 16px;
  ${props =>
    props.disabled &&
    css`
      background-color: ${shade(0.1, '#d3d3d3')};
    `}
`;

export const AddButtonText = styled.Text`
  padding: 8px;
  color: #fff;

  font-size: 16px;
  margin: auto;

  font-family: 'Roboto-Bold';
`;
