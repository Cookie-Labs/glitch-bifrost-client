import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import { useRecoilValue } from 'recoil';
import { userState } from '@states/userState';
import { networks, networksIcons } from '@constants/networkInfo';

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid ${colors.bgQuaternary};
  border-radius: 1rem;
  min-width: 10rem;
  height: 3rem;
  padding: 0.4rem;
  font-size: 1.2rem;
  gap: 0.5rem;
`;

const IconWrapper = styled.img`
  height: 1.5rem;
  border-radius: 50%;
  background-color: ${colors.bgQuaternary};
`

const CurrentNetwork = () => {
  const { networkId } = useRecoilValue(userState);
  const [networkName, setNetworkName] = useState('');
  const [networkIcon, setNetworkIcon] = useState('');

  useEffect(() => {
    getChain(networkId);
    console.log(networkName);
    console.log(networkIcon);
  }, [networkId]);

  function getChain(chainId) {
    for (let networkKey in networks) {
      if (networks[networkKey].chainId === chainId) {
        setNetworkName(networks[networkKey].chainName);
        setNetworkIcon(networksIcons[networkKey].icon);
      }
    }
  };

  return (
    <Container>
      <IconWrapper src={networkIcon} />
      <span>{networkName}</span>
    </Container>
  );
};

export default CurrentNetwork;
