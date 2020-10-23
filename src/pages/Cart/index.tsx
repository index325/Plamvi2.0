import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';

import AntIcon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { ICartState } from '../../redux/modules/cart/types';
import { IState } from '../../redux';
import ChangeQuantityModal from '../../components/ChangeQuantityModal';
import { cartRemoveItem } from '../../redux/modules/cart/actions';

import {
  Content,
  Container,
  GoBackButton,
  Header,
  TitleContainer,
  Description,
  Title,
  Card,
  CardTextContainer,
  CardText,
  CardTitle,
  CardInformation,
  CardImage,
  RemoveButton,
  RemoveButtonText,
  ActionsContainer,
  Button,
  ButtonText,
  TotalContainer,
  TotalText,
  TotalValue,
  QuantityAndPriceContainer,
  QuantityText,
  PriceText,
} from './styles';
import { IAuthState } from '../../redux/modules/auth/types';
import formatValue from '../../utils/formatValue';

const Cart: React.FC = () => {
  const navigator = useNavigation();
  const dispatch = useDispatch();

  const handleGoBack = useCallback(() => {
    navigator.goBack();
  }, [navigator]);

  const { cart } = useSelector<IState, ICartState>(state => state.cart);
  const { token } = useSelector<IState, IAuthState>(state => state.auth);

  const handleDeleteCartItem = useCallback(
    (id: string) => {
      dispatch(cartRemoveItem({ cart_item_id: id, token }));
    },
    [dispatch, token],
  );

  return (
    <Container>
      <Header>
        <GoBackButton onPress={handleGoBack} activeOpacity={0.6}>
          <AntIcon name="arrowleft" size={20} color="#ff3647" />
        </GoBackButton>
      </Header>
      <TitleContainer>
        <Title>Bem-vindo ao seu carrinho!</Title>
        <Description>
          Aqui você pode alterar a quantidade e excluir produtos do carrinho.
          Quando terminar, é só clicar em Fechar Carrinho!
        </Description>
      </TitleContainer>
      <Content>
        {cart.cart_item &&
          cart.cart_item.map(item => (
            <View key={item.id}>
              <QuantityAndPriceContainer>
                <QuantityText>{item.quantity}x</QuantityText>
                <PriceText>
                  {formatValue(item.quantity * item.product.price)}
                </PriceText>
              </QuantityAndPriceContainer>
              <Card>
                <CardInformation>
                  <CardTextContainer>
                    <CardTitle>{item.product.name}</CardTitle>
                    <CardText>{item.product.short_description}</CardText>
                  </CardTextContainer>
                  <CardImage
                    style={{ resizeMode: 'center' }}
                    source={{ uri: item.product.image_url }}
                  />
                </CardInformation>
                <ActionsContainer>
                  <ChangeQuantityModal token={token} item={item} />
                  <RemoveButton onPress={() => handleDeleteCartItem(item.id)}>
                    <RemoveButtonText>Remover</RemoveButtonText>
                  </RemoveButton>
                </ActionsContainer>
              </Card>
            </View>
          ))}
        <TotalContainer>
          <TotalText>Total:</TotalText>
          <TotalValue>{formatValue(cart.total)}</TotalValue>
        </TotalContainer>
        <Button>
          <ButtonText>Fechar Carrinho</ButtonText>
          <Entypo
            name="chevron-right"
            size={18}
            color="#fff"
            style={{ marginRight: 8 }}
          />
        </Button>
      </Content>
    </Container>
  );
};

export default Cart;
