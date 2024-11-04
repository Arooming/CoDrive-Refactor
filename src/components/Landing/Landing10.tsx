import styled from 'styled-components';

const Landing10 = () => {
  return (
    <Landing10Container>
      <LandingTop>
        <Info>COMING SOON</Info>
        <TitleContainer>
          <Title>네카라쿠배당토 등 빅테크 기업 합격자</Title>
          <Title>코딩테스트 준비 족보 공개</Title>
        </TitleContainer>
        <Text>해당 서비스는 프리미엄 서비스로 제공돼요.</Text>
      </LandingTop>
    </Landing10Container>
  );
};

const Landing10Container = styled.article`
  width: 100vw;
  height: 100vh;
  padding: 5.4rem;

  background-position: center;
  background-size: contain;

  background-image: url('/src/assets/img/img_landing10_bg.png');
  background-repeat: no-repeat;
`;

const LandingTop = styled.div`
  text-align: center;
`;

const Info = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 15.7rem;
  height: 4.7rem;
  margin: 0 auto;

  border-radius: 2.5rem;
  background-color: ${({ theme }) => theme.colors.gray500};
  ${({ theme }) => theme.fonts.title_bold_16};
  color: ${({ theme }) => theme.colors.white};
`;

const TitleContainer = styled.div`
  margin: 2.8rem 0 3.6rem;
`;

const Title = styled.h2`
  ${({ theme }) => theme.fonts.landing_bold_34};
  color: ${({ theme }) => theme.colors.white};
`;

const Text = styled.p`
  margin-bottom: 8.2rem;

  ${({ theme }) => theme.fonts.landing_regular_20};
  color: ${({ theme }) => theme.colors.white};
`;

export default Landing10;
