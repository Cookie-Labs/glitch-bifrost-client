import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import { networks } from '@constants/networkInfo';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const CurrentNetworkWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid ${colors.bgQuaternary};
  border-radius: 1rem;
  min-width: 10rem;
  height: 3rem;
  padding: 0.4rem;
  font-size: 1.2rem;
`;

const CurrentNetwork = () => {
  const networkId = localStorage.getItem('_chainId');
  const [networkName, setNetworkName] = useState('');

  useEffect(() => {
    setNetworkName(getChainName(networkId, networks));
  }, [networkId]);

  const getChainName = (chainId, allNetworks) => {
    for (let networkKey in allNetworks) {
      if (allNetworks[networkKey].chainId === chainId) {
        return allNetworks[networkKey].chainName;
      }
    }
    return 'Unknown Chain';
  };

  return (
    <Container>
      <CurrentNetworkWrapper>{networkName}</CurrentNetworkWrapper>
    </Container>
  );
};

export default CurrentNetwork;
