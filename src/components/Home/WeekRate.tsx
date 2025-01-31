import { useEffect, useState } from 'react';
import { Cell, Label, Pie, PieChart } from 'recharts';
import styled from 'styled-components';
import { BtnInformation } from '../../assets';
import TooltipInfo from '../../common/DetailTooltip';
import useGetUserAchieve from '../../libs/hooks/Home/useGetUserAchieve';
import WeekRateCustomLabel from './WeekRateCustomLabel';
const WeekRate = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(true); // 추가된 상태
  const [stats, setStats] = useState({
    successRate: 0,
    weeklyCountDifference: 0,
    weeklyCount: 0,
  });

  const percentage = stats.successRate || 0;
  const isSolvedExist = stats.weeklyCountDifference === 0;
  const negativeNum = stats.weeklyCountDifference < 0;
  const isSolvedZero = stats.weeklyCount === 0;

  const data = useGetUserAchieve();

  useEffect(() => {
    if (data) {
      const { successRate, weeklyCountDifference, weeklyCount } = data.data;

      setStats({
        successRate: successRate,
        weeklyCountDifference: weeklyCountDifference,
        weeklyCount: weeklyCount,
      });
    }
  }, [data]);

  const chartData = [
    {
      name: 'Solved',
      value: percentage === 0 ? 6 : percentage,
    },
  ];
  const endAngle = 180 - (chartData[0].value / 100) * 180;

  // 툴팁 닫기 함수
  const handleTooltipClose = () => setIsTooltipVisible(false);

  return (
    <Container>
      <Header>
        <TitleContainer>
          <HeaderTitle>{'주간 성과율'}</HeaderTitle>
          <TooltipInfo
            isVisible={isTooltipVisible}
            onClick={handleTooltipClose}
            text="주간 성과율은 월요일마다 초기화 돼요"
          />
        </TitleContainer>

        <Notic>
          <BtnInformation />
          <Tooltip>
            <LineText>주간 성과율은 문제 개수와 상관없이</LineText>
            <LineText>성실도를 측정한 지표에요</LineText>
          </Tooltip>
        </Notic>
      </Header>
      <ChartContainer>
        <PieChart width={300} height={140}>
          <defs>
            <linearGradient id="linear" x1="0" y1="0" x2="1" y2="1">
              <stop offset="100%" stopColor="#CA73FF" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>
          </defs>
          <Pie
            data={chartData}
            dataKey="value"
            startAngle={180}
            endAngle={0}
            innerRadius={95}
            outerRadius={113}
            stroke="none"
            cornerRadius={10}
            paddingAngle={0}
            cy={126}
            cx="50%"
            fill="#34363C"
          >
            <Label
              position="center"
              content={
                <WeekRateCustomLabel
                  value={percentage ? `${percentage.toFixed(0)}%` : `${0}%`}
                  viewBox={{ cx: 0, cy: 100 }}
                />
              }
            />
          </Pie>
          <Pie
            data={chartData}
            dataKey="value"
            startAngle={180}
            endAngle={endAngle}
            innerRadius={95}
            outerRadius={113}
            stroke="none"
            cornerRadius={10}
            paddingAngle={0}
            cy={126}
            cx="50%"
          >
            <Cell key="cell-1" fill={'url(#linear)'} />
          </Pie>
        </PieChart>
      </ChartContainer>
      <MessageContainer>
        {isSolvedZero ? (
          <>
            <NoGoalMessage>이번 주에 푼 문제가 없어요</NoGoalMessage>
            <NoGoalMessage>
              문제 풀이 인증하고 그래프를 채워보세요
            </NoGoalMessage>
          </>
        ) : isSolvedExist ? (
          <>
            <NoGoalMessage>지난 주와 푼 문제 개수가 동일해요</NoGoalMessage>
            <NoGoalMessage>문제를 더 풀어볼까요?</NoGoalMessage>
          </>
        ) : negativeNum ? (
          <>
            <Message>
              지난 주보다 {Math.abs(stats.weeklyCountDifference)}문제 모자라요.
            </Message>
            <Message>문제를 더 풀어볼까요?</Message>
          </>
        ) : (
          <>
            <Message>축하해요!</Message>
            <Message>
              지난 주보다 {stats.weeklyCountDifference}문제 더 풀었어요!
            </Message>
          </>
        )}
      </MessageContainer>
    </Container>
  );
};

export default WeekRate;

const Container = styled.div`
  width: 45.4rem;
  height: 28.5rem;
  padding: 3.5rem 3.4rem;

  border-radius: 1.2rem;
  background-color: ${({ theme }) => theme.colors.gray800};
  max-width: 45.4rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const HeaderTitle = styled.div`
  margin-right: 0.7rem;

  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.title_bold_20};
`;

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  & :focus {
    outline: none;
  }
`;

const Message = styled.p`
  display: flex;
  justify-content: center;
  ${({ theme }) => theme.fonts.title_semiBold_18};

  color: ${({ theme }) => theme.colors.white};
`;

const NoGoalMessage = styled.p`
  display: flex;
  justify-content: center;

  ${({ theme }) => theme.fonts.title_regular_14};
  color: ${({ theme }) => theme.colors.gray400};
`;

const MessageContainer = styled.div`
  margin-top: 0.3rem;
`;

const LineText = styled.p`
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.body_ligth_12};
`;

const Notic = styled.div`
  align-items: center;
  position: relative;

  &:hover > div {
    visibility: visible;
    opacity: 1;
  }
`;

const Tooltip = styled.div`
  display: grid;
  row-gap: 0.4rem;

  position: absolute;
  top: 2.7rem;
  visibility: hidden;
  z-index: 10;

  height: auto;
  padding: 1.2rem 1.1rem;

  border-radius: 0.8rem;
  background: ${({ theme }) => theme.colors.gray600};

  white-space: nowrap;

  opacity: 0;
  transform: translate(-2.5%);
  transition: opacity 0.3s ease-in-out;

  &::after {
    position: absolute;
    bottom: 100%;
    left: 5%;

    margin-left: -0.1rem;

    border-color: transparent transparent ${({ theme }) => theme.colors.gray600};
    border-width: 5px;
    border-style: solid;
    content: '';
  }
`;
