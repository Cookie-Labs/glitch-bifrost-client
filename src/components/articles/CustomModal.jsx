import styled from 'styled-components';
import * as colors from '@styles/colors';
import { BiX } from 'react-icons/bi';

const ModalContainer = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow: auto;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 30vw;
  min-height: 10vh;
  font-size: 1.5rem;
  font-weight: 500;
  background-color: ${colors.bgWhiteSecondary};
  border-radius: 0.8rem;
  padding: 1rem;
  border: none;
  outline: none;
  overflow: none;
  position: absolute;
  left: 50%;
  top: 50%;
  gap: 1rem;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  box-shadow: 5px 6px 6px rgba(0, 0, 0, 0.15);
`;

const ModalTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${colors.bgWhiteSecondary};
  width: 100%;
  height: auto;
  padding-bottom: 1rem;
`

const ModalTitle = styled.span`
  font-style: italic;
  font-size: 1.8rem;
  font-weight: 700;
`

const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${colors.bgWhiteSecondary};
  border: 1px solid ${colors.bgWhiteTertiary};

  &:hover {
    background-color: ${colors.bgWhiteTertiary};
  }
`;

const CustomModal = ({
  show,
  toggleModal,
  containerStyles,
  contentStyles,
  title,
  children,
}) => {
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return (
    <ModalContainer
      show={show}
      onMouseDown={handleClickOutside}
      style={{ ...containerStyles }}
    >
      <ModalContent style={{ ...contentStyles }}>
        <ModalTitleWrapper>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={toggleModal}>
            <BiX size="2rem" />
          </CloseButton>
        </ModalTitleWrapper>
        {children}
      </ModalContent>
    </ModalContainer>
  );
};

export default CustomModal;
