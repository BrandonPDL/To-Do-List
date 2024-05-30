import React from 'react'
import ListT from '../organisms/ListT'
import styled from 'styled-components';

const Home = () => {
  return (
      
    <Div>
      <ListT />
    </Div>
  )
}

export default Home;

const Div = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
  flex-direction:column;
  align-items: center;
`;
