import React, { useCallback, useState, memo } from 'react';
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch } from 'react-redux';
import { ModalContainer, OpenModalButton, ModalButtonText } from './styles';
import ModalContent from './Content';
import { cartUpdateItemQuantity } from '../../redux/modules/cart/actions';
import { ICartItem } from '../../interfaces';

interface IProps {
  token: string;
  item: ICartItem;
}

const ModalTester: React.FC<IProps> = ({ token, item }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);
  const dispatch = useDispatch();

  const toggleModal = useCallback(() => {
    setModalVisible(!isModalVisible);
  }, [isModalVisible]);

  const addQuantity = useCallback(() => {
    setQuantity(quantity + 1);
  }, [quantity]);

  const subtractQuantity = useCallback(() => {
    if (quantity === 1) {
      return;
    }
    setQuantity(quantity - 1);
  }, [quantity]);

  const handleSubmitUpdateQuantity = useCallback(() => {
    dispatch(
      cartUpdateItemQuantity({
        cart_item_id: item.id,
        quantity,
        token,
      }),
    );
    toggleModal();
  }, [dispatch, quantity, token, toggleModal, item.id]);

  return (
    <>
      <OpenModalButton onPress={toggleModal}>
        <ModalButtonText>Alterar quantidade</ModalButtonText>
      </OpenModalButton>
      <ModalContainer>
        <Modal
          isVisible={isModalVisible}
          useNativeDriver
          onSwipeComplete={() => setModalVisible(false)}
          swipeDirection={['up', 'left', 'right', 'down']}
          onBackdropPress={() => setModalVisible(false)}
          swipeThreshold={50}
          style={styles.view}
        >
          <ModalContent
            setModalVisible={setModalVisible}
            addQuantity={addQuantity}
            subtractQuantity={subtractQuantity}
            quantity={quantity}
            item={item}
            handleSubmitUpdateQuantity={handleSubmitUpdateQuantity}
          />
        </Modal>
      </ModalContainer>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default memo(ModalTester);
