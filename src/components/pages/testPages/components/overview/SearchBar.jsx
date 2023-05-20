import React, { useState } from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBarContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const SearchTerm = styled.input`
  width: 100%;
  height: 3rem;
  border: 3px solid ${colors.bgWhiteSecondary};
  background-color: ${colors.bgWhiteSecondary};
  padding: 0.5rem;
  border-radius: 0 1rem 1rem 0;
  outline: none;
  font-size: 1.2rem;
  color: ${colors.textBlack};
`;

const SearchButton = styled.button`
  width: 3rem;
  height: 3rem;
  border: 3px solid ${colors.bgWhiteSecondary};
  background-color: ${colors.bgWhiteSecondary};
  border-radius: 1rem 0 0 1rem;
  outline: none;
  color: ${colors.textBlack};
  cursor: pointer;
`;

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  return (
    <SearchBarContainer>
      <SearchButton
        type="submit"
        onClick={() => {
          navigate({ pathname: '/', search: `?typing=${query}` });
        }}
        value={query}
      >
        <AiOutlineSearch size="2rem" />
      </SearchButton>
      <SearchTerm
        type="text"
        placeholder="Search X2E Coins"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onKeyUp={() => {
          if (window.event.keyCode === 13) {
            navigate({ pathname: '/', search: `?typing=${query}` });
          }
        }}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;
