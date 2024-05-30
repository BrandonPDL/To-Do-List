import React from 'react';
import Modal from 'react-modal';
import styled, { keyframes } from 'styled-components';

Modal.setAppElement('#root');

const SuccessModal = ({ isOpen, onRequestClose, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      <ModalContent>
        <AnimatedTitle>Excelente</AnimatedTitle>
        <p>{message}</p>
        <button onClick={onRequestClose}>Cerrar</button>
      </ModalContent>
    </Modal>
  );
};

export default SuccessModal;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const bounceIn = keyframes`
  0% {
    transform: translateY(-50px) scale(0.8);
    opacity: 0;
  }
  50% {
    transform: translateY(10px) scale(1.1);
    opacity: 1;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
`;

const AnimatedTitle = styled.h2`
  animation: ${bounceIn} 0.5s ease;
  margin-bottom: 10px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2 {
    margin-bottom: 10px;
  }
  p {
    margin-bottom: 20px;
  }
  button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: #45a049;
    }
  }
`;
