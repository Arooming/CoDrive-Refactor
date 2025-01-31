import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import ErrorModal from '../../../common/Modal/ErrorModal/ErrorModal';
import SaveModal from '../../../common/Modal/Modal';
import usePatchRecords from '../../../libs/hooks/Solve/usePatchRecords';
import usePostRecords from '../../../libs/hooks/Solve/usePostRecords';
import { PageHeaderProps } from '../../../types/Solve/solveTypes';

const BTN_CONTENTS = ['임시저장', '등록하기'];

const PageHeader = ({
  id,
  isTemp,
  codeblocks,
  questionInfo,
  handleCommitSuccess,
  handleOpenOptions,
}: PageHeaderProps) => {
  const { title, level, tags, platform, problemUrl } = questionInfo;
  const isEmptyCode = codeblocks.map((v) => v.code.length === 0).includes(true);
  const { patchMutation, patchErr } = usePatchRecords({
    id,
    handleCommitSuccess,
  });
  const { postMutation, postErr, isPostLoading } = usePostRecords({
    handleCommitSuccess,
  });

  const [postTempErr, setPostTempErr] = useState('');
  const isError = patchErr.length > 0 || postErr.length > 0;

  const [modalOpen, setModalOpen] = useState(false);
  const [errModalOpen, setErrModalOpen] = useState(isError);

  const errMsg = patchErr || postErr || postTempErr;

  const handlePostTempErr = (message: string) => {
    setPostTempErr(message);
  };

  const handleClickBtn = (isSaveBtn: boolean) => {
    if (isSaveBtn) {
      handleOpenOptions(false);
      setModalOpen(true);
    } else {
      const correctUrlPattern = /^(http|https):\/\/[^\s/$.?#].\S*$/;
      if (correctUrlPattern.test(problemUrl)) {
        id && !isTemp
          ? patchMutation({
              id: id,
              questionInfo: questionInfo,
              codeblocks: codeblocks,
            })
          : postMutation({
              id: id,
              questionInfo: questionInfo,
              codeblocks: codeblocks,
            });
      } else {
        setErrModalOpen(true);
      }
    }
  };

  const handleModalClose = () => {
    handleOpenOptions(true);
    setModalOpen(false);
  };

  useEffect(() => {
    setErrModalOpen(isError);
  }, [isError]);

  return (
    <PageHeaderContainer>
      <Text>오늘 푼 문제 등록하기</Text>

      <BtnContainer>
        {BTN_CONTENTS.map((content) => {
          const saveBtn = content === '임시저장';
          const disabledSave = !title || !level;
          const disabledSubmit =
            !title ||
            !level ||
            !tags.length ||
            !platform ||
            !problemUrl ||
            isEmptyCode;
          return (
            <Button
              key={content}
              type="submit"
              $disabled={saveBtn ? disabledSave : disabledSubmit}
              $submitBtn={!saveBtn}
              onClick={() =>
                (saveBtn ? !disabledSave : !disabledSubmit) &&
                !isPostLoading &&
                handleClickBtn(saveBtn)
              }
            >
              {content}
            </Button>
          );
        })}
      </BtnContainer>
      {modalOpen && (
        <SaveModal
          id={id}
          onClose={handleModalClose}
          handlePostTempErr={handlePostTempErr}
          questionInfo={questionInfo}
          codeblocks={codeblocks}
        />
      )}

      {errModalOpen && (
        <ErrorModal
          onClose={() => setErrModalOpen(false)}
          errMsg={
            errMsg ||
            '유효하지 않은 주소입니다\n[ https / http ]로 시작하는 주소를 입력해주세요.'
          }
        />
      )}
    </PageHeaderContainer>
  );
};

export default PageHeader;

const PageHeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: end;

  width: 100%;
`;

const Text = styled.p`
  margin-bottom: 0.8rem;

  ${({ theme }) => theme.fonts.title_bold_26};
  color: ${({ theme }) => theme.colors.white};
`;

const BtnContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button<{ $disabled: boolean; $submitBtn: boolean }>`
  padding: 1rem 2rem;

  border-radius: 0.8rem;

  ${({ theme, $disabled, $submitBtn }) =>
    $disabled
      ? css`
          background-color: ${theme.colors.gray700};
          color: ${theme.colors.gray300};
        `
      : $submitBtn
        ? css`
            background-color: ${theme.colors.codrive_green};
            color: ${theme.colors.gray900};
          `
        : css`
            background-color: ${theme.colors.gray500};
            color: ${theme.colors.gray100};
          `};
  ${({ theme, $disabled }) =>
    $disabled ? theme.fonts.body_ligth_16 : theme.fonts.title_bold_16};
`;
