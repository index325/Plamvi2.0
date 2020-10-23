import React from 'react';
import { SadFaceContainer, SadFaceText, SadFaceImg } from './styles';

interface IProps {
  text: string;
}

const SadFace: React.FC<IProps> = ({ text }) => {
  return (
    <SadFaceContainer>
      <SadFaceImg source={require('../../assets/sad-face.png')} />

      <SadFaceText>{text}</SadFaceText>
    </SadFaceContainer>
  );
};

export default SadFace;
