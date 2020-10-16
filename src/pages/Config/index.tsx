import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

import { clientRequest } from '../../redux/modules/client/actions';

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
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Container>
      <Header>
        <GoBackButton onPress={handleGoBack} activeOpacity={0.6}>
          <AntIcon name="arrowleft" size={20} color="#ff3647" />
        </GoBackButton>
      </Header>
      <TitleContainer>
        <Title>Seja bem-vindo(a) às configurações</Title>
        <Description>Aqui você pode configurar dados da sua conta</Description>
      </TitleContainer>
      <Content>
        <Card onPress={() => navigation.navigate('UpdateUserInfo')}>
          <CardText>Alterar dados da conta</CardText>
          <Icon
            name="chevron-right"
            size={18}
            color="#fff"
            style={{ marginRight: 8 }}
          />
        </Card>
        <Card onPress={() => navigation.navigate('UpdateUserPassword')}>
          <CardText>Alterar senha</CardText>
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
