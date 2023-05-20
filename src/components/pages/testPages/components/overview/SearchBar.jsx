import React, { useState } from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import { useNavigate } from 'react-router-dom';
import {BiSearchAlt2} from 'react-icons/bi';

const SearchBarContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const SearchTerm = styled.input`
  width: 100%;
  height: 2.5rem;
  border: 3px solid ${colors.bgWhiteSecondary};
  background-color: ${colors.bgWhiteSecondary};
  padding: 0.5rem;
  outline: none;
  font-size: 1rem;
  color: ${colors.textBlack};
  border-radius: 0 0.5rem 0.5rem 0;
`;

const SearchButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border: 3px solid ${colors.bgWhiteSecondary};
  background-color: ${colors.bgWhiteSecondary};
  outline: none;
  color: ${colors.textBlack};
  cursor: pointer;
  border-radius: 0.5rem 0 0 0.5rem;
`;

const SearchBar = ({place, path}) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  return (
    <SearchBarContainer>
      <SearchButton
        type="submit"
        onClick={() => {
          navigate({ pathname: path, search: `?typing=${query}` });
        }}
        value={query}
      >
        <BiSearchAlt2 size="1.6rem" />
      </SearchButton>
      <SearchTerm
        type="text"
        placeholder={place}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onKeyUp={() => {
          if (window.event.keyCode === 13) {
            navigate({ pathname: path, search: `?typing=${query}` });
          }
        }}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;
