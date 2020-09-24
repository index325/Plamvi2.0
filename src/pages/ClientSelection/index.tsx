import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import { FormHandles } from '@unform/core';

import AntIcon from 'react-native-vector-icons/AntDesign';

import {
  Content,
  Container,
  GoBackButton,
  Header,
  TitleContainer,
  Description,
  Title,
  Card,
  CardText,
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
        <Title>Seja bem-vindo(a), usuário!</Title>
        <Description>
          Selecione qual é o estabelecimento em que você deseja realizar suas
          compras
        </Description>
      </TitleContainer>
      <Content>
        <Card>
          <CardText>Comprar no Mercadinho BigBoom</CardText>
          <Icon
            name="chevron-right"
            size={18}
            color="#fff"
            style={{ marginRight: 8 }}
          />
        </Card>
        <Card>
          <CardText>Comprar no Mercadinho BigBoom</CardText>
          <Icon
            name="chevron-right"
            size={18}
            color="#fff"
            style={{ marginRight: 8 }}
          />
        </Card>
        <Card>
          <CardText>Comprar no Mercadinho BigBoom</CardText>
          <Icon
            name="chevron-right"
            size={18}
            color="#fff"
            style={{ marginRight: 8 }}
          />
        </Card>
        <Card>
          <CardText>Comprar no Mercadinho BigBoom</CardText>
          <Icon
            name="chevron-right"
            size={18}
            color="#fff"
            style={{ marginRight: 8 }}
          />
        </Card>
        <Card>
          <CardText>Comprar no Mercadinho BigBoom</CardText>
          <Icon
            name="chevron-right"
            size={18}
            color="#fff"
            style={{ marginRight: 8 }}
          />
        </Card>
        <Card>
          <CardText>Comprar no Mercadinho BigBoom</CardText>
          <Icon
            name="chevron-right"
            size={18}
            color="#fff"
            style={{ marginRight: 8 }}
          />
        </Card>
        <Card>
          <CardText>Comprar no Mercadinho BigBoom</CardText>
          <Icon
            name="chevron-right"
            size={18}
            color="#fff"
            style={{ marginRight: 8 }}
          />
        </Card>
        <Card>
          <CardText>Comprar no Mercadinho BigBoom</CardText>
          <Icon
            name="chevron-right"
            size={18}
            color="#fff"
            style={{ marginRight: 8 }}
          />
        </Card>
        <Card>
          <CardText>Comprar no Mercadinho BigBoom</CardText>
          <Icon
            name="chevron-right"
            size={18}
            color="#fff"
            style={{ marginRight: 8 }}
          />
        </Card>
      </Content>
    </Container>
  );
};

export default ClientSelection;
