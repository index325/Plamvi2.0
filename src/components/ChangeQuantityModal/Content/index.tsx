import React from 'react';
import { Button } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ICartItem } from '../../../interfaces';
import formatValue from '../../../utils/formatValue';
import {
  Content,
  ContentTitle,
  BuyContainer,
  QuantityContainer,
  QuantityButton,
  BuyButtonText,
  QuantityText,
  AddButton,
  AddButtonText,
} from './styles';

interface IProps {
  setModalVisible: (value: boolean) => void;
  quantity: number;
  subtractQuantity: () => void;
  addQuantity: () => void;
  handleSubmitUpdateQuantity: () => void;
  item: ICartItem;
}

const ModalContent: React.FC<IProps> = ({
  setModalVisible,
  quantity,
  subtractQuantity,
  addQuantity,
  item,
  handleSubmitUpdateQuantity,
}) => {
  return (
    <Content>
      <ContentTitle>{item.product.name}</ContentTitle>
      <BuyContainer>
        <QuantityContainer>
          <TouchableWithoutFeedback>
            <QuantityButton onPress={subtractQuantity}>
              <BuyButtonText>-</BuyButtonText>
            </QuantityButton>
          </TouchableWithoutFeedback>

          <QuantityText>{quantity}</QuantityText>
          <QuantityButton onPress={addQuantity}>
            <BuyButtonText>+</BuyButtonText>
          </QuantityButton>
        </QuantityContainer>
        <AddButton enabled={item.quantity !== quantity}>
          <AddButtonText onPress={handleSubmitUpdateQuantity}>
            Confirmar
          </AddButtonText>
          <AddButtonText>
            {formatValue(item.product.price * quantity)}
          </AddButtonText>
        </AddButton>
      </BuyContainer>
      {/* <Button onPress={() => setModalVisible(false)} title="Close" /> */}
    </Content>
  );
};

export default ModalContent;
