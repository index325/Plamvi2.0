import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  padding: 24px;
  background-color: #f7f7f7;
`;

export const Content = styled.ScrollView`
  padding: 16px;
  background-color: #fff;
  border-radius: 16px;
  margin-bottom: 48px;
`;

export const Header = styled.View``;

export const GoBackButton = styled.TouchableOpacity``;

export const TitleContainer = styled.View`
  margin-top: 32px;
  margin-bottom: 64px;
`;

export const Title = styled.Text`
  font-size: 32px;
  font-family: 'Roboto-Bold';

  color: #ff3647;

  margin-bottom: 16px;
`;

export const Description = styled.Text`
  font-size: 14px;
  color: #5e5e5e;
`;

export const BuyButton = styled(RectButton)`
  background-color: #ff3647;
  height: 64px;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 8px;
  margin-top: 8px;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const BuyButtonText = styled.Text`
  padding: 8px;
  color: #ff3647;

  font-size: 18px;

  font-family: 'Roboto-Bold';
`;

export const QuantityContainer = styled.View`
  width: 104px;
  flex-direction: row;
  border: 1px solid black;
  border-radius: 16px;
  justify-content: center;
`;

export const QuantityButton = styled(RectButton)``;

export const QuantityText = styled.Text`
  padding: 8px;
  font-size: 18px;
`;

export const AddButton = styled(RectButton)`
  background-color: #ff3647;
  height: 48px;
  width: 60%;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const AddButtonText = styled.Text`
  padding: 8px;
  color: #fff;

  font-size: 16px;
  margin: auto;

  font-family: 'Roboto-Bold';
`;

export const BuyContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ProductImageContainer = styled.View`
  background-color: yellow;
`;

export const ProductImage = styled.Image`
  width: 70%;
  height: 70%;
  border-radius: 16px;
`;

export const ProductInformationContainer = styled.View``;

export const ProductInformation = styled.View``;

export const CardImage = styled.Image`
  width: 50%;
  height: 200px;
`;

export const CardImageContainer = styled.View``;

export const CardTitle = styled.Text`
  font-size: 16px;
  font-family: 'Roboto-Bold';
  align-items: center;
  color: #ff3647;
`;

export const CardInformation = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 16px;
  margin-bottom: 16px;
  padding-top: 8px;
`;

export const CardTextContainer = styled.View`
  width: 45%;
`;

export const CardText = styled.Text`
  padding: 8px 0px;
`;

export const RelatedProducts = styled.ScrollView`
  margin-bottom: 48px;
`;

export const RelatedProduct = styled.TouchableOpacity`
  background-color: #fff;
  border-width: 2;
  border-color: #eee;
  min-height: 220;
  width: 220;
  border-radius: 8;
  padding-top: 20;
  padding-bottom: 16;
  margin-right: 8;
  align-items: center;
  justify-content: space-between;
  text-align: center;
`;

export const RelatedProductText = styled.Text`
  font-size: 16px;
  font-family: 'Roboto-Bold';
  align-items: center;
  color: #ff3647;
  padding: 0px 8px;
`;

export const RelatedProductImage = styled.Image`
  width: 110px;
  height: 110px;
`;

export const RelatedProductSection = styled.View`
  margin-bottom: 16px;
`;

export const RelatedProductSectionText = styled.Text`
  font-size: 24px;
  font-family: 'Roboto-Bold';
  align-items: flex-start;
  color: #ff3647;
`;

export const RelatedProductPrice = styled.Text`
  font-size: 16px;
  font-family: 'Roboto-Bold';
  align-items: flex-start;
  color: #ff3647;
`;
