import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';

import AntIcon from 'react-native-vector-icons/AntDesign';

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

const ProductDetail: React.FC = () => {
  const navigator = useNavigation();

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
        <Title>Arroz tipo 1 - Tio João</Title>
        <Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          blandit quis magna elementum faucibus.
        </Description>
      </TitleContainer>

      <CardInformation>
        <CardImage
          style={{ resizeMode: 'center' }}
          source={require('../../assets/arroz.jpg')}
        />
        <CardTextContainer>
          <CardTitle>Informações importantes:</CardTitle>
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            blandit quis magna elementum faucibus.
          </CardText>
        </CardTextContainer>
      </CardInformation>

      <Content>
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
          <AddButton>
            <AddButtonText>Adicionar</AddButtonText>
            <AddButtonText>R$17,90</AddButtonText>
          </AddButton>
        </BuyContainer>
      </Content>

      <RelatedProductSection>
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
            Teste meu deus do céu que teste grande caralho meu deus do céu o que
            que eu faço agora? jesus
          </RelatedProductText>
          <RelatedProductPrice>R$ 17,90</RelatedProductPrice>
        </RelatedProduct>
        <RelatedProduct>
          <RelatedProductImage
            style={{ resizeMode: 'center' }}
            source={require('../../assets/arroz.jpg')}
          />
          <RelatedProductText>Teste um pouco menor</RelatedProductText>
          <RelatedProductPrice>R$ 17,90</RelatedProductPrice>
        </RelatedProduct>
        <RelatedProduct>
          <RelatedProductImage
            style={{ resizeMode: 'center' }}
            source={require('../../assets/arroz.jpg')}
          />
          <RelatedProductText>Teste</RelatedProductText>
        </RelatedProduct>
        <RelatedProduct>
          <RelatedProductImage
            style={{ resizeMode: 'center' }}
            source={require('../../assets/arroz.jpg')}
          />
          <RelatedProductText>Teste</RelatedProductText>
        </RelatedProduct>
        <RelatedProduct>
          <RelatedProductImage
            style={{ resizeMode: 'center' }}
            source={require('../../assets/arroz.jpg')}
          />
          <RelatedProductText>Teste</RelatedProductText>
        </RelatedProduct>
        <RelatedProduct>
          <RelatedProductImage
            style={{ resizeMode: 'center' }}
            source={require('../../assets/arroz.jpg')}
          />
          <RelatedProductText>Teste</RelatedProductText>
        </RelatedProduct>
        <RelatedProduct>
          <RelatedProductImage
            style={{ resizeMode: 'center' }}
            source={require('../../assets/arroz.jpg')}
          />
          <RelatedProductText>Teste</RelatedProductText>
        </RelatedProduct>
      </RelatedProducts>
    </Container>
  );
};

export default ProductDetail;
