import styled from 'styled-components';
import { ModalProps } from '../../types/Solve/solveTypes';
import LinkCopyModalForm from './LinkCopyModalForm';
import ModalPortal from './ModalPortal';
import SaveModalForm from './SaveModalForm';

const Modal = ({ onClose, questionInfo, codeblocks }: ModalProps) => {
  const handleClickBg = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget === e.target && onClose) {
      onClose();
    }
  };

  return (
    <ModalPortal>
      <ModalFormConatiner onClick={handleClickBg}>
        {onClose ? (
          <SaveModalForm
            onClose={onClose}
            questionInfo={questionInfo}
            codeblocks={codeblocks}
          />
        ) : (
          <LinkCopyModalForm />
        )}
      </ModalFormConatiner>
    </ModalPortal>
  );
};

export default Modal;

const ModalFormConatiner = styled.section`
  position: fixed;
  top: 11.6rem;

  width: 100%;
  height: calc(100vh - 11.6rem);

  background-color: rgb(11 12 15 / 66%);
`;