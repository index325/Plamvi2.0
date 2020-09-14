import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 48.5%;

  padding: 0 16px;
  border-radius: 10px;
  border-width: 2px;
  border-color: transparent;
  background-color: #fff;

  border-radius: 8px;
  margin-bottom: 8px;

  ${props =>
    props.isErrored &&
    css`
      border-color: #ff3647;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #04d361;
    `}

  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #5e5e5e;
  font-size: 16px;
  font-family: 'Roboto-Regular';
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
