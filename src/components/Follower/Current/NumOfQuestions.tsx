import styled from 'styled-components';
import { IcInformation } from '../../../assets';
import InformationTooltip from '../../../common/InformationTooltip';
import useGetFollowerWeeklyCount from '../../../libs/hooks/Follower/useGetFollowerWeeklyCount';
import EmptyFollower from './EmptyFollower';
import FollowerCurrentGraph from './FollowerCurrentGraph';

const NumOfQuestions = () => {
  const { data, isLoading } = useGetFollowerWeeklyCount();
  const { followings } = !isLoading && data.data;

  return (
    <>
      {!isLoading && (
        <NumOfQuestionsContainer>
          <Header>
            <Title>문제 개수 그래프</Title>
            <InformationContainer>
              <IcInformation />
              <InformationTooltip
                topContents="한 주간 팔로워들이"
                bottomContents="푼 문제 개수를 보여주는 그래프입니다"
              />
            </InformationContainer>
          </Header>

          <GraphContainer>
            {followings.length ? (
              <FollowerCurrentGraph users={followings} />
            ) : (
              <EmptyFollower />
            )}
          </GraphContainer>
        </NumOfQuestionsContainer>
      )}
    </>
  );
};

export default NumOfQuestions;

const NumOfQuestionsContainer = styled.article`
  display: flex;
  gap: 3.2rem;
  justify-content: center;
  flex-direction: column;

  width: 61.1rem;
  margin-left: 0.2rem;
`;

const Header = styled.header`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  position: relative;

  margin-left: 0.4rem;
`;

const Title = styled.p`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.title_bold_20};
`;

const InformationContainer = styled.div`
  &:hover > div {
    visibility: visible;
    z-index: 1;

    opacity: 1;
  }

  cursor: pointer;
`;

const GraphContainer = styled.article`
  display: flex;
  justify-content: center;
  align-items: end;
  position: relative;

  width: 100%;
  height: 23rem;
  padding: 0 2.1rem 1.4rem 2rem;

  border-radius: 1.2rem;
  background-color: ${({ theme }) => theme.colors.gray800};
  min-width: 61.1rem;
`;
