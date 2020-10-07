import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';

import AntIcon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { IProduct } from '../../interfaces';
import { IState } from '../../redux';
import { IAuthState } from '../../redux/modules/auth/types';
import { cartAddItem } from '../../redux/modules/cart/actions';
import { IClientState } from '../../redux/modules/client/types';
import api from '../../services/api';
import formatValue from '../../utils/formatValue';

import {
  Content,
  Container,
  GoBackButton,
  Header,
  TitleContainer,
  Description,
  Title,
  BuyButtonText,
  Card,
  CardTextContainer,
  CardText,
  CardTitle,
  QuantityContainer,
  QuantityButton,
  QuantityText,
  CardInformation,
  CardImage,
  AddButton,
  AddButtonText,
  BuyContainer,
} from './styles';

const ProductsSelection: React.FC = () => {
  const navigator = useNavigation();
  const dispatch = useDispatch();

  const { client } = useSelector<IState, IClientState>(state => state.client);
  const { token } = useSelector<IState, IAuthState>(state => state.auth);

  const [products, setProducts] = useState<IProduct[]>([{}] as IProduct[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      if (token) {
        const response = await api.get<IProduct[]>(
          `/products/list_by_customer/${client.id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: '*/*',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setProducts(response.data);
        setLoading(false);
      }
    }

    getProducts();
  }, [token, client]);

  const handleAddProductToCart = useCallback(
    (product_id, quantity) => {
      dispatch(cartAddItem({ token, product_id, quantity }));
    },
    [dispatch, token],
  );

  const handleGoBack = useCallback(() => {
    navigator.goBack();
  }, [navigator]);

  return (
    <Container>
      <Header>
        <GoBackButton onPress={handleGoBack} activeOpacity={0.6}>
          <AntIcon name="arrowleft" size={20} color="#ff3647" />
        </GoBackButton>
      </Header>
      <TitleContainer>
        <Title>Seja bem-vindo(a) ao {client.name}</Title>
        <Description>
          Selecione a quantidade do produto desejado e o adicione na sacola.
          Quando terminar, é só fechar o carrinho!
        </Description>
      </TitleContainer>
      <Content>
        {!loading &&
          products.map((product: IProduct) => {
            return (
              <Card key={product.id}>
                <CardInformation
                  onPress={() =>
                    navigator.navigate('ProductDetail', { id: product.id })
                  }
                >
                  <CardTextContainer>
                    <CardTitle>{product.name}</CardTitle>
                    <CardText>{product.short_description}</CardText>
                  </CardTextContainer>
                  <CardImage
                    style={{ resizeMode: 'center' }}
                    source={require('../../assets/arroz.jpg')}
                  />
                </CardInformation>
                <BuyContainer>
                  <QuantityContainer>
                    <QuantityButton>
                      <BuyButtonText>-</BuyButtonText>
                    </QuantityButton>
                    <QuantityText>1</QuantityText>
                    <QuantityButton>
                      <BuyButtonText>+</BuyButtonText>
                    </QuantityButton>
                  </QuantityContainer>
                  <AddButton
                    onPress={() => handleAddProductToCart(product.id, 1)}
                  >
                    <AddButtonText>Adicionar</AddButtonText>
                    <AddButtonText>{formatValue(product.price)}</AddButtonText>
                  </AddButton>
                </BuyContainer>
              </Card>
            );
          })}
      </Content>
    </Container>
  );
};

export default ProductsSelection;
