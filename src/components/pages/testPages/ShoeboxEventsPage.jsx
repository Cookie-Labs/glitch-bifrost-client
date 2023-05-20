import React from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import SearchBar from './components/overview/SearchBar';
import { BiChevronRight } from 'react-icons/bi';
import event1Image from '@assets/images/event1.png';
import event2Image from '@assets/images/event2.png';
import event3Image from '@assets/images/event3.png';
import event4Image from '@assets/images/event4.png';

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

const EventsTitle = styled.span`
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 1rem;
`;

const EventsSubTitle = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: ${colors.bgWhiteSecondary};
  margin-bottom: 2rem;
`;

const EventsWrapper = styled.div`
  width: 100%;
  min-height: 30rem;
  gap: 2rem;
`;

const EventTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const EventTitle = styled.div`
  font-size: 1rem;
  font-weight: 700;
`;

const SeeMore = styled.div`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${colors.primary80};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EventImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 3rem;
`;

const ShoeboxEventsPage = () => {
  return (
    <Container>
      <SearchBarWrapper>
        <SearchBar place="Search Pages" path="events" />
      </SearchBarWrapper>
      <EventsTitle>Latest Cryto Updates</EventsTitle>
      <EventsSubTitle>
        Community showcases the latest cryptocurrency updates published by
        projects from all parts of the crypto universe
      </EventsSubTitle>
      <EventsWrapper>
        <EventTitleWrapper>
          <EventTitle>Recommended</EventTitle>
          <SeeMore>
            <span>See More</span>
            <BiChevronRight />
          </SeeMore>
        </EventTitleWrapper>
        <EventImage src={event1Image} />
        <EventTitleWrapper>
          <EventTitle>Events</EventTitle>
          <SeeMore>
            <span>See More</span>
            <BiChevronRight />
          </SeeMore>
        </EventTitleWrapper>
        <EventImage src={event2Image} />
        <EventImage src={event3Image} />
        <EventImage src={event4Image} />
      </EventsWrapper>
    </Container>
  );
};

export default ShoeboxEventsPage;
