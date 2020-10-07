import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../../redux/modules/auth/actions';

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
import api from '../../services/api';
import { IState } from '../../redux';
import { IAuthState } from '../../redux/modules/auth/types';
import { IClient } from '../../interfaces';

const ClientSelection: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [clients, setClients] = useState<IClient[]>([{}] as IClient[]);
  const [loading, setLoading] = useState(true);

  const { token, user } = useSelector<IState, IAuthState>(state => state.auth);

  const handleGoBack = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    async function getClients() {
      if (token) {
        const response = await api.get<IClient[]>(
          '/users/list_all_available_customers',
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: '*/*',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setClients(response.data);
        setLoading(false);
      }
    }

    getClients();
  }, [token]);

  const handleSelectClient = (client: IClient) => {
    navigation.navigate('Home');
    dispatch(clientRequest(client));
  };

  return (
    <Container>
      <Header>
        <GoBackButton onPress={handleGoBack} activeOpacity={0.6}>
          <AntIcon name="arrowleft" size={20} color="#ff3647" />
        </GoBackButton>
      </Header>
      <TitleContainer>
        <Title>Seja bem-vindo(a), {user?.name}</Title>
        <Description>
          Selecione qual é o estabelecimento em que você deseja realizar suas
          compras
        </Description>
      </TitleContainer>
      <Content>
        {!loading &&
          clients.map(value => (
            <Card onPress={() => handleSelectClient(value)} key={value.id}>
              <CardText>{`Comprar no ${value.name}`}</CardText>
              <Icon
                name="chevron-right"
                size={18}
                color="#fff"
                style={{ marginRight: 8 }}
              />
            </Card>
          ))}
      </Content>
    </Container>
  );
};

export default ClientSelection;
