import React, {useState} from 'react'
import styled from 'styled-components';
import * as colors from '@styles/colors';
import SearchBar from './components/overview/SearchBar';
import calendarImage from '@assets/images/calendar.png';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 2.5rem 4rem;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 3rem;
`;

const MyCalendarTitle = styled.span`
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 1rem;
`;

const TabButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1rem;
`;

const TabButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  border: 1px solid ${colors.bgWhiteSecondary};
  padding: 0.5rem 1rem;
  cursor: pointer;
  background-color: ${({ isActive }) => (isActive ? colors.primary80 : null)};
  color: ${({ isActive }) => (isActive ? colors.textPrimary : null)};

  &:hover {
    background-color: ${colors.primary40};
    transition: 0.3s;
  }
`;

const CalendarWrapper = styled.div`
  width: 100%;
  min-height: 30rem;
  border-radius: 1rem;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;

const CalendarImage = styled.img`
  max-width: 100%;
  height: auto;
`

const ShoeboxMyCalendarPage = () => {
  const [tab, setTab] = useState('All');

  return (
    <Container>
      <SearchBarWrapper>
        <SearchBar place="Search Pages" path="/myCalendar" />
      </SearchBarWrapper>
      <MyCalendarTitle>Acquistion details</MyCalendarTitle>
      <TabButtonsWrapper>
        <TabButton
          isActive={tab === 'All'}
          value="All"
          onClick={(newTab) => {
            setTab(newTab.target.value);
          }}
        >
          All
        </TabButton>
        <TabButton
          isActive={tab === 'Stepn'}
          value="Stepn"
          onClick={(newTab) => {
            setTab(newTab.target.value);
          }}
        >
          Stepn
        </TabButton>
        <TabButton
          isActive={tab === 'Snkrz'}
          value="Snkrz"
          onClick={(newTab) => {
            setTab(newTab.target.value);
          }}
        >
          Snkrz
        </TabButton>
        <TabButton
          isActive={tab === 'SweatCoin'}
          value="SweatCoin"
          onClick={(newTab) => {
            setTab(newTab.target.value);
          }}
        >
          SweatCoin
        </TabButton>
        <TabButton
          isActive={tab === 'SuperWalk'}
          value="SuperWalk"
          onClick={(newTab) => {
            setTab(newTab.target.value);
          }}
        >
          SuperWalk
        </TabButton>
      </TabButtonsWrapper>
      <CalendarWrapper>
        <CalendarImage src={calendarImage} />
      </CalendarWrapper>
    </Container>
  );
}

export default ShoeboxMyCalendarPage