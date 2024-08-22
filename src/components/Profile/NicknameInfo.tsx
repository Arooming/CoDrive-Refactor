import styled from 'styled-components';
import { NickNameInfoProps } from '../../types/Profile/ProfileType';
import CommonInput from './../../common/CommonInput';

const NicknameInfo = ({
  nickname,

  handleChangeInputs,
  handleNicknameCheck,
}: NickNameInfoProps) => {
  return (
    <NicknameInfoContainer>
      <NicknameTitle>닉네임</NicknameTitle>
      <InputWrapper>
        <CommonInput
          category="nickname"
          value={nickname}
          handleChangeInputs={handleChangeInputs}
        />
        <Button type="button" onClick={handleNicknameCheck}>
          검색
        </Button>
      </InputWrapper>
    </NicknameInfoContainer>
  );
};

const NicknameInfoContainer = styled.section`
  display: flex;
  align-items: center;

  padding-bottom: 1.4rem;
  margin-bottom: 3.2rem;

  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray600};
`;

const NicknameTitle = styled.h2`
  margin-right: 8rem;

  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.title_bold_16};
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  padding: 1.5rem 1.8rem 1.4rem;
  margin-left: 1rem;

  border: none;
  border-radius: 0.6rem;
  background-color: ${({ theme }) => theme.colors.codrive_green};
  color: ${({ theme }) => theme.colors.gray900};
  ${({ theme }) => theme.fonts.title_bold_16};
`;

export default NicknameInfo;
