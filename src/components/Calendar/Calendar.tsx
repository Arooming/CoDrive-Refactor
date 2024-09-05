/* stylelint-disable selector-class-pattern */

import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import styled from 'styled-components';
import { IcArrowBottomWhite, IcArrowTopWhite, IcCalendar } from '../../assets';
import { BoardProps, CommonCalendarProps } from '../../types/Home/calendarType';
import CustomCalendar from './CustomCalendar';

type ValuePiece = Date | null;

type SelectedDate = ValuePiece | [ValuePiece, ValuePiece];

const CommonCalendar = ({
  clickedYear,
  clickedMonth,
  data,
  setClickedYear,
  setClickedMonth,
}: CommonCalendarProps) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(today);
  const [board, setBoard] = useState<BoardProps[]>([]);

  const [isCalendarClicked, setIsCalendarClicked] = useState(false);

  const customWeekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const handleClickCalendar = () => {
    setIsCalendarClicked((prev) => !prev);
  };

  const handleClickPrevBtn = () => {
    setClickedYear((prevYear) => prevYear - 1);
  };

  const handleClickNextBtn = () => {
    setClickedYear((prevYear) => prevYear + 1);
  };

  const handleClickMonth = (month: number) => {
    const newDate = new Date(clickedYear, month - 1);
    setClickedMonth(month);
    setSelectedDate(newDate);
    setIsCalendarClicked(false);
  };

  const upDatedCalendar = () => {
    if (data) {
      const { board } = data.data;
      setBoard(board);
    }
  };

  useEffect(() => {
    upDatedCalendar();
  }, [data]);

  console.log(selectedDate);

  return (
    <CalendarContainer>
      <NavContainer>
        <IcCalendar onClick={handleClickCalendar} />
        <DateContainer>
          <Year>{clickedYear}년</Year>
          <Month>{clickedMonth}월</Month>
        </DateContainer>
        {isCalendarClicked ? (
          <CustomCalendarContainer>
            <IcArrowTopWhite onClick={handleClickCalendar} />
            <CustomCalendar
              date={{ clickedYear, clickedMonth }}
              unsolvedMonths={[]}
              handleClickPrevBtn={handleClickPrevBtn}
              handleClickMonth={handleClickMonth}
              handleClickNextBtn={handleClickNextBtn}
            />
          </CustomCalendarContainer>
        ) : (
          <IcArrowBottomWhite onClick={handleClickCalendar} />
        )}
      </NavContainer>
      <StyledCalendar
        onChange={setSelectedDate}
        locale="ko"
        value={selectedDate}
        calendarType="gregory"
        showNeighboringMonth={true}
        formatShortWeekday={(_, date) => customWeekdays[date.getDay()]}
        showNavigation={false}
        tileClassName={({ date, view }) => {
          if (view === 'month') {
            const day = date.getDate().toString();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            // 현재 달의 날짜인지 확인
            if (month === clickedMonth && year === clickedYear) {
              const solvedDay = board.find((d) => d.date === day && d.isSolved);
              return solvedDay ? 'solved' : null;
            }
          }
        }}
      />
    </CalendarContainer>
  );
};

export default CommonCalendar;

const CalendarContainer = styled.div`
  .react-calendar {
    display: flex;
    gap: 2rem;

    width: 28.6rem;

    border: none;
    background-color: ${({ theme }) => theme.colors.gray800};
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  width: 17.9rem;
  padding: 1.3rem 1.4rem;
  margin-bottom: 2rem;
  margin-left: 10.7rem;

  border-radius: 1.2rem;
  background-color: ${({ theme }) => theme.colors.gray700};

  max-width: 17.9rem;

  outline: 0.1rem solid ${({ theme }) => theme.colors.gray500};
`;

const DateContainer = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;

  padding-right: 0.2rem;
  padding-left: 1.1rem;
`;

const Year = styled.p`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.body_medium_16};
`;

const Month = styled.p`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.body_medium_16};
`;

const CustomCalendarContainer = styled.div`
  left: 0;
`;

const StyledCalendar = styled(Calendar)`
  /* stylelint-disable-next-line selector-class-pattern */
  .react-calendar__tile {
    width: 4rem;
    height: 4rem;
    margin-top: 0.25rem;

    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.gray500};
    color: ${({ theme }) => theme.colors.gray500};

    ${({ theme }) => theme.fonts.body_medium_16};
    &.solved {
      background-color: ${({ theme }) => theme.colors.codrive_green};
    }

    abbr {
      position: absolute;
      overflow: hidden;

      width: 0.1rem;
      height: 0.1rem;

      border: 0;
      clip: rect(1px, 1px, 1px, 1px);
    }
  }

  /* stylelint-disable-next-line selector-class-pattern */
  .react-calendar__month-view__weekdays__weekday {
    margin-bottom: -0.8rem;

    color: ${({ theme }) => theme.colors.white};

    ${({ theme }) => theme.fonts.body_eng_medium_16}
  }

  /* stylelint-disable-next-line selector-class-pattern */
  .react-calendar__month-view__weekdays__weekday abbr[title] {
    text-decoration: none;
  }

  /* stylelint-disable-next-line selector-class-pattern */
  .react-calendar__month-view__days__day--neighboringMonth {
    background-color: ${({ theme }) => theme.colors.gray700};
    color: ${({ theme }) => theme.colors.gray700};
    pointer-events: none;
  }

  /* stylelint-disable-next-line selector-class-pattern */
  .react-calendar__tile:enabled:focus {
    background-color: ${({ theme }) => theme.colors.gray500};

    &.solved {
      background-color: ${({ theme }) => theme.colors.codrive_green};
    }
  }

  /* stylelint-disable-next-line selector-class-pattern */
  .react-calendar__tile:enabled:hover {
    &:enabled:hover {
      background-color: ${({ theme }) => theme.colors.gray500};
    }

    &.solved:enabled:hover {
      background-color: ${({ theme }) => theme.colors.codrive_green};
    }

    background-color: ${({ theme }) => theme.colors.gray500};
  }
`;