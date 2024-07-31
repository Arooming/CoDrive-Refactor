import styled from 'styled-components';
import { IcCancelSmallWhite, IcSuccess } from '../../../assets';
import { ModalProps } from '../../../types/Solve/solveTypes';

const SaveModalForm = ({ onClose }: ModalProps) => {
  return (
    <ModalFormConatiner>
      <ContentsContainer>
        <IcCancelContainer onClick={onClose}>
          <IcCancelSmallWhite />
        </IcCancelContainer>

        <IcSuccess />
        <Notice>임시저장이 완료되었습니다</Notice>
        <BtnContainer>
          <ContinueBtn type="button" onClick={onClose}>
            마저 작성하기
          </ContinueBtn>
          <ExitBtn type="button">나가기</ExitBtn>
        </BtnContainer>
      </ContentsContainer>
    </ModalFormConatiner>
  );
};

export default SaveModalForm;

const ModalFormConatiner = styled.section`
  position: fixed;
  top: 11.6rem;

  width: 100%;
  height: calc(100vh - 11.6rem);

  background-color: rgb(11 12 15 / 66%);
`;

const ContentsContainer = styled.article`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;

  min-width: 26.9rem;

  padding-top: 2.6rem;
  margin: 21.6rem 58.5rem 0;

  border-radius: 1.2rem;
  background-color: ${({ theme }) => theme.colors.gray800};
`;

const IcCancelContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const Notice = styled.p`
  margin: 1.6rem 0 2.9rem;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.title_bold_16};
`;

const BtnContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  width: 100%;
`;

const commonBtnStyle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.title_bold_14};
`;

const ContinueBtn = styled(commonBtnStyle)`
  border-bottom-left-radius: 1.2rem;

  padding: 1.3rem 2.8rem 1.6rem 3rem;

  background-color: ${({ theme }) => theme.colors.gray600};
`;

const ExitBtn = styled(commonBtnStyle)`
  border-bottom-right-radius: 1.2rem;

  padding: 1.3rem 4.8rem 1.6rem 5rem;

  background-color: ${({ theme }) => theme.colors.gray700};
`;
