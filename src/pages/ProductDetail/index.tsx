import { useNavigation, Route } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';

import AntIcon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { IProduct } from '../../interfaces';
import { IState } from '../../redux';
import { alertRequest } from '../../redux/modules/alerts/actions';
import { IAuthState } from '../../redux/modules/auth/types';
import { cartAddItem } from '../../redux/modules/cart/actions';
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
  QuantityContainer,
  QuantityButton,
  QuantityText,
  AddButton,
  AddButtonText,
  BuyContainer,
  CardInformation,
  CardImage,
  CardTextContainer,
  CardText,
  CardTitle,
  RelatedProducts,
  RelatedProduct,
  RelatedProductText,
  RelatedProductImage,
  RelatedProductSectionText,
  RelatedProductSection,
  RelatedProductPrice,
} from './styles';

interface IProps {
  route: any;
}

const ProductDetail: React.FC<IProps> = ({ route }) => {
  const navigator = useNavigation();
  const dispatch = useDispatch();

  const [product, setProduct] = useState({} as IProduct);
  const [quantity, setQuantity] = useState(1);
  const { token } = useSelector<IState, IAuthState>(state => state.auth);

  const handleGoBack = useCallback(() => {
    navigator.goBack();
  }, [navigator]);

  useEffect(() => {
    const { id } = route.params;

    api
      .get<IProduct>(`/products/detail/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        dispatch(
          alertRequest({
            message: error.response.data.message,
            messageType: 'danger',
            isDialog: true,
          }),
        );
      });
  }, [route, dispatch, token]);

  const addQuantity = useCallback(() => {
    setQuantity(quantity + 1);
  }, [quantity]);

  const subtractQuantity = useCallback(() => {
    if (quantity === 1) {
      return;
    }
    setQuantity(quantity - 1);
  }, [quantity]);

  const handleAddProductToCart = useCallback(() => {
    dispatch(cartAddItem({ token, product_id: product.id, quantity }));
  }, [dispatch, token, product, quantity]);

  return (
    <Container>
      <Header>
        <GoBackButton onPress={handleGoBack} activeOpacity={0.6}>
          <AntIcon name="arrowleft" size={20} color="#ff3647" />
        </GoBackButton>
      </Header>
      <TitleContainer>
        <Title>{product.name}</Title>
        <Description>{product.short_description}</Description>
      </TitleContainer>

      <CardInformation>
        <CardImage
          style={{ resizeMode: 'center' }}
          source={{ uri: product.image_url }}
        />
        <CardTextContainer>
          <CardTitle>Informações importanteees:</CardTitle>
          <CardText>{product.description}</CardText>
        </CardTextContainer>
      </CardInformation>

      <Content>
        <BuyContainer>
          <QuantityContainer>
            <QuantityButton onPress={subtractQuantity}>
              <BuyButtonText>-</BuyButtonText>
            </QuantityButton>
            <QuantityText>{quantity}</QuantityText>
            <QuantityButton onPress={addQuantity}>
              <BuyButtonText>+</BuyButtonText>
            </QuantityButton>
          </QuantityContainer>
          <AddButton onPress={() => handleAddProductToCart()}>
            <AddButtonText>Adicionar</AddButtonText>
            <AddButtonText>
              {formatValue(product.price * quantity)}
            </AddButtonText>
          </AddButton>
        </BuyContainer>
      </Content>

      {/* <RelatedProductSection>
        <RelatedProductSectionText>
          Produtos relacionados:
        </RelatedProductSectionText>
      </RelatedProductSection>
      <RelatedProducts horizontal showsHorizontalScrollIndicator={false}>
        <RelatedProduct>
          <RelatedProductImage
            style={{ resizeMode: 'center' }}
            source={require('../../assets/arroz.jpg')}
          />
          <RelatedProductText>
            Teste meu deus do céu que teste grande meu deus do céu o que
            que eu faço agora? jesus
          </RelatedProductText>
          <RelatedProductPrice>R$ 17,90</RelatedProductPrice>
        </RelatedProduct>
        <RelatedProduct>
          <RelatedProductImage
            style={{ resizeMode: 'center' }}
            source={require('../../assets/arroz.jpg')}
          />
          <RelatedProductText>Teste meu deus jesus</RelatedProductText>
          <RelatedProductPrice>R$ 17,90</RelatedProductPrice>
        </RelatedProduct>
        <RelatedProduct>
          <RelatedProductImage
            style={{ resizeMode: 'center' }}
            source={require('../../assets/arroz.jpg')}
          />
          <RelatedProductText>Teste meu deus do céu</RelatedProductText>
          <RelatedProductPrice>R$ 17,90</RelatedProductPrice>
        </RelatedProduct>
        <RelatedProduct>
          <RelatedProductImage
            style={{ resizeMode: 'center' }}
            source={require('../../assets/arroz.jpg')}
          />
          <RelatedProductText>
            Teste meu deus do céu que teste grande
          </RelatedProductText>
          <RelatedProductPrice>R$ 17,90</RelatedProductPrice>
        </RelatedProduct>
        <RelatedProduct>
          <RelatedProductImage
            style={{ resizeMode: 'center' }}
            source={require('../../assets/arroz.jpg')}
          />
          <RelatedProductText>Teste? jesus</RelatedProductText>
          <RelatedProductPrice>R$ 17,90</RelatedProductPrice>
        </RelatedProduct>
      </RelatedProducts> */}
    </Container>
  );
};

export default ProductDetail;
