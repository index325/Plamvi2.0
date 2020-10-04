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

const ClientSelection: React.FC = () => {
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
        <Title>Seja bem-vindo(a) ao Mercadinho BigBoom!</Title>
        <Description>
          Selecione a quantidade do produto desejado e o adicione na sacola.
          Quando terminar, é só fechar o carrinho!
        </Description>
      </TitleContainer>
      <Content>
        <Card>
          <CardInformation>
            <CardTextContainer>
              <CardTitle>Titulo do card</CardTitle>
              <CardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                blandit quis magna elementum faucibus.
              </CardText>
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
            <AddButton>
              <AddButtonText>Adicionar</AddButtonText>
              <AddButtonText>R$17,90</AddButtonText>
            </AddButton>
          </BuyContainer>
        </Card>
        <Card>
          <CardInformation>
            <CardTextContainer>
              <CardTitle>Titulo do card</CardTitle>
              <CardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                blandit quis magna elementum faucibus.
              </CardText>
            </CardTextContainer>
            <CardImage
              style={{ resizeMode: 'center' }}
              source={require('../../assets/logo.png')}
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
            <AddButton>
              <AddButtonText>Adicionar</AddButtonText>
              <AddButtonText>R$17,90</AddButtonText>
            </AddButton>
          </BuyContainer>
        </Card>
      </Content>
    </Container>
  );
};

export default ClientSelection;
