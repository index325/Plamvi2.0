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
  ProductImageContainer,
  ProductImage,
  ProductInformationContainer,
  ProductInformation,
  CardInformation,
  CardImage,
  CardTextContainer,
  CardText,
  CardTitle,
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
      {/* <ProductInformationContainer>
        <ProductImageContainer>
          <ProductImage
            style={{ resizeMode: 'center' }}
            source={require('../../assets/arroz.jpg')}
          />
        </ProductImageContainer>
        <ProductInformation />
      </ProductInformationContainer> */}

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

      {/* <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >

</ScrollView> */}

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
    </Container>
  );
};

export default ProductDetail;
