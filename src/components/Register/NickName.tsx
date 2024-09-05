import styled from 'styled-components';

import { NickNameProps } from '../../types/Register/RegisterType';
import CommonInput from './../../common/CommonInput';

const NickName = ({
  nickname,
  isExitedNickname, // 닉네임 중복 상태 추가
  handleChangeInputs,
  handleNicknameCheck,
}: NickNameProps) => {
  return (
    <NickNameContainer>
      <TitleContainer>
        <Title>닉네임</Title>
        <Essential>*</Essential>
      </TitleContainer>
      <Info>최대 10자 이내로 입력해주세요</Info>
      <InputWrapper>
        <CommonInput
          category="nickname"
          value={nickname}
          isExitedNickname={isExitedNickname} // 상태 전달
          handleChangeInputs={handleChangeInputs}
        />
        <Button type="button" onClick={handleNicknameCheck}>
          검색
        </Button>
      </InputWrapper>
    </NickNameContainer>
  );
};

const NickNameContainer = styled.div`
  margin-bottom: 5rem;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 0.6rem;
  margin-left: 0.2rem;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.title_bold_20};
`;

const Essential = styled.span`
  margin-left: 0.6rem;

  ${({ theme }) => theme.fonts.title_medium_20};
  color: ${({ theme }) => theme.colors.codrive_purple};
`;

const Info = styled.span`
  display: block;

  margin-bottom: 1.6rem;
  margin-left: 0.2rem;

  color: ${({ theme }) => theme.colors.gray300};
  ${({ theme }) => theme.fonts.detail_regular_12};
`;

const InputWrapper = styled.div`
  display: flex;
`;

const Button = styled.button`
  width: 6.4rem;
  height: 5.3rem;
  margin-left: 1rem;

  border: none;
  border-radius: 0.6rem;
  background-color: ${({ theme }) => theme.colors.codrive_green};
  color: ${({ theme }) => theme.colors.gray900};
  ${({ theme }) => theme.fonts.title_bold_16};
`;

export default NickName;