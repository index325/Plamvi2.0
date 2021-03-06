import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';

import AntIcon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import SadFace from '../../components/SadFace';
import { IProduct } from '../../interfaces';
import { IState } from '../../redux';
import { IAuthState } from '../../redux/modules/auth/types';
import { cartAddItem, cartLoadItems } from '../../redux/modules/cart/actions';
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
  Card,
  CardTextContainer,
  CardText,
  CardTitle,
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
    dispatch(cartLoadItems({ customer_id: client.id, token }));
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

        if (response.data) {
          setProducts(response.data);
        }

        setLoading(false);
      }
    }

    getProducts();
  }, [token, client, dispatch]);

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
                    source={{ uri: product.image_url }}
                  />
                </CardInformation>
                <BuyContainer>
                  <AddButton
                    onPress={() => handleAddProductToCart(product.id, 1)}
                  >
                    <AddButtonText>Adicionar 1 un.</AddButtonText>
                    <AddButtonText>{formatValue(product.price)}</AddButtonText>
                  </AddButton>
                </BuyContainer>
              </Card>
            );
          })}
        {!products[0] && (
          <SadFace text="Que pena... Não encontramos nenhum produto para este estabelecimento" />
        )}
      </Content>
    </Container>
  );
};

export default ProductsSelection;
