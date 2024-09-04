import { useState } from 'react';
import styled from 'styled-components';
import CommonButton from '../../common/CommonButton';
import usePatchUser from '../../libs/hooks/MyProfile/usePatchUser';
import usePostCheckExitNickname from '../../libs/hooks/MyProfile/usePostCheckExitNickname';
import { ProfileEdiltProps } from '../../types/MyProfile/MyProfileType';
import { handleInput } from '../../utils/handleInput';
import GithubInfo from '../Profile/GIthubInfo';
import IntroInfo from '../Profile/IntroInfo';
import LanguageInfo from '../Profile/LanguageInfo';
import NameInfo from '../Profile/NameInfo';
import NicknameInfo from '../Profile/NicknameInfo';

const ProfileEdilt = ({ handleCloseModal, initialData }: ProfileEdiltProps) => {
  const [inputs, setInputs] = useState(initialData);
  const [selectedLanguage, setSelectedLanguage] = useState(
    initialData.language
  );
  const [changeNickname, setChangeNickname] = useState({
    isExitNickname: false,
    isClickedCheckBtn: false,
  });
  const { patchMutation } = usePatchUser();
  const { mutation } = usePostCheckExitNickname((isExit: boolean) =>
    setChangeNickname({ isExitNickname: isExit, isClickedCheckBtn: true })
  );
  const { comment, githubUrl, language, nickname } = inputs;

  // 입력 값의 유효성을 검사하는 변수
  const isActive =
    nickname.length > 0 &&
    nickname.length <= 10 &&
    githubUrl.length > 0 &&
    selectedLanguage.length > 0;

  // 입력 값 변경 처리 함수
  const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
    setChangeNickname({ ...changeNickname, isClickedCheckBtn: false });
  };

  // 언어 태그 변경 처리 함수
  const handleChangeTag = (value: string) => {
    setSelectedLanguage(value);
  };

  // 소개글 변경 처리 함수
  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    handleInput(e, 'comment');
    setInputs((prev) => ({ ...prev, comment: value }));
  };

  // 가입 버튼 클릭 처리 함수
  const handleSaveBtnClick = () => {
    if (!isActive) return;
    patchMutation({comment, githubUrl, language, nickname})
    handleCloseModal(); // 모달 닫기
  };

  // 취소 버튼 클릭 처리 함수
  const handleCancelBtnClick = () => {
    // 입력 값들을 초기 상태로 되돌림
    setInputs(initialData);
    setSelectedLanguage(language);
    handleCloseModal(); // 모달 닫기
  };

  // 닉네임 중복 체크 함수
  const handleNicknameCheck = () => {
    mutation(nickname);
  };

  return (
    <ModalBackground>
      <ProfileContainer onSubmit={handleSaveBtnClick}>
        <BasicInfoContainer>
          <BasicTitle>기본정보</BasicTitle>
          <NameInfo user={nickname} />
          <GithubInfo
            github={githubUrl}
            handleChangeInputs={handleChangeInputs}
          />
        </BasicInfoContainer>
        <CodriveContainer>
          <CodriveTitle>코드라이브 정보</CodriveTitle>
          <IntroInfo
            value={comment ? comment : ''}
            onChange={handleChangeComment}
          />
          <NicknameInfo
            changeNickname={changeNickname}
            nickname={nickname}
            handleChangeInputs={handleChangeInputs}
            handleNicknameCheck={handleNicknameCheck}
          />
          <LanguageInfo
            selectedTag={selectedLanguage}
            handleChangeTag={handleChangeTag}
          />
        </CodriveContainer>
        <ProfileButton>
          <CancelButton type="button" onClick={handleCancelBtnClick}>
            취소하기
          </CancelButton>
          <CommonButton
            isActive={isActive}
            category="Profile_save"
            onClick={handleSaveBtnClick}
          />
        </ProfileButton>
      </ProfileContainer>
    </ModalBackground>
  );
};

const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`;

const ProfileContainer = styled.form`
  display: flex;
  flex-direction: column;

  height: 55.4rem;
  padding: 6.4rem 9.6rem;

  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.gray900};
  overflow-y: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const BasicInfoContainer = styled.div`
  margin-bottom: 8rem;
`;

const CodriveContainer = styled.div`
  margin-bottom: 5.6rem;
`;

const BasicTitle = styled.h1`
  margin-bottom: 5.2rem;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.title_bold_20};
`;

const CodriveTitle = styled.h1`
  margin-bottom: 4rem;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.title_bold_20};
`;

const ProfileButton = styled.div`
  display: flex;
  gap: 1.6rem;
  justify-content: center;
`;

const CancelButton = styled.button`
  padding: 1rem 2rem;

  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.colors.gray700};
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.title_bold_16};
`;

export default ProfileEdilt;
