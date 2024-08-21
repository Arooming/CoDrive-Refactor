/* stylelint-disable selector-class-pattern */
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import styled from 'styled-components';
import { IcArrowBottomWhite } from '../../assets';
import CustomCalendar from './CustomCalendar';

type ValuePiece = Date | null;

type SelectedDate = ValuePiece | [ValuePiece, ValuePiece];

const CommonCalendar = ({}) => {
  const today = new Date();
  const year = today.getFullYear();
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(today);
  const [clickedYear, setClickedYear] = useState(year);
  const [clickedMonth, setClickedMonth] = useState(today.getMonth() + 1);

  const [isDropdown, setIsDropdown] = useState(false);

  const customWeekdays = ['S', 'S', 'M', 'T', 'W', 'T', 'F'];

  const handleClickDropdown = () => {
    setIsDropdown((prev) => !prev);
  };

  const handleClickPrevBtn = () => {
    setClickedYear((prevYear) => prevYear - 1);
  };

  const handleClickNextBtn = () => {
    setClickedYear((prevYear) => prevYear + 1);
  };

  const handleClickMonth = (month: number) => {
    const newDate = new Date(clickedYear, month - 1, today.getDate());
    setClickedMonth(month);
    setSelectedDate(newDate);
  };

  useEffect(() => {
    console.log(selectedDate);
  });

  return (
    <CalendarContainer>
      {isDropdown ? (
        <CustomCalendar
          date={{ clickedYear, clickedMonth }}
          unsolvedMonths={[]} // 이 배열에 비활성화하고 싶은 월을 추가합니다.
          handleClickPrevBtn={handleClickPrevBtn}
          handleClickMonth={handleClickMonth}
          handleClickNextBtn={handleClickNextBtn}
        />
      ) : (
        <IcArrowBottomWhite onClick={handleClickDropdown} />
      )}
      <StyledCalendar
        onChange={setSelectedDate}
        locale="ko-KR"
        value={selectedDate}
        nextLabel={<IcArrowBottomWhite />}
        next2Label={null}
        prev2Label={null}
        view="month"
        showNeighboringMonth={true}
        formatShortWeekday={(_, date) => customWeekdays[date.getDay()]}
        showNavigation={false}
      />
    </CalendarContainer>
  );
};

export default CommonCalendar;

const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;

  width: 100%;

  .react-calendar {
    border: none;
    background-color: ${({ theme }) => theme.colors.gray800};
  }
`;

const NavContainer = styled.div`
  display: flex;
  position: absolute;
`;

const StyledCalendar = styled(Calendar)`
  /* stylelint-disable-next-line selector-class-pattern */
  .react-calendar__navigation {
    width: 17.9rem;
    padding: 1.3rem 1.4rem;
    margin-bottom: 3.4rem;
    margin-left: auto;

    border-radius: 1.2rem;
    background-color: ${({ theme }) => theme.colors.gray700};
  }
  /* stylelint-disable-next-line selector-class-pattern */
  .react-calendar__navigation button {
    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fonts.body_medium_16};
  }
  /* stylelint-disable-next-line selector-class-pattern */
  .react-calendar__navigation__label > span {
    color: red;
  }

  /* stylelint-disable-next-line selector-class-pattern */
  .react-calendar__tile {
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.gray500};
    color: ${({ theme }) => theme.colors.gray500};
    ${({ theme }) => theme.fonts.body_medium_16};
  }

  /* stylelint-disable-next-line selector-class-pattern */
  .react-calendar__month-view__weekdays__weekday {
    color: ${({ theme }) => theme.colors.white};

    text-decoration: none;

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
  .react-calendar__tile:enabled:hover {
    background-color: ${({ theme }) => theme.colors.gray500};
  }
  /* stylelint-disable-next-line selector-class-pattern */
  .react-calendar__tile:enabled:focus {
    background-color: ${({ theme }) => theme.colors.gray500};
  }
`;
