import React from 'react';
import { connect } from 'react-redux';
import { fetchHeight } from "../constants";
import styled, { keyframes } from 'styled-components';
import { Absolute } from '@rebass/position';
import { Flex } from 'rebass';
import { fadeIn } from 'react-animations'

const bounceAnimation = keyframes`${fadeIn}`;


// const Info =

const HoverHolder = styled(Absolute)`
  cursor: pointer;
  .onHover {
    margin-left: 20px;
    color: green;
    display: none;
  }
  &:hover{
    .onHover{
      display: inline-block;
    }
  }
`;

const BlockHeight = (props) => {
  const BouncyDiv = styled.div`animation: 1s ${bounceAnimation};`;
  return (<HoverHolder top={10} left={10}>
    <BouncyDiv>
      <Flex onClick={() => props.dispatch(fetchHeight.start())}>
        Latest Block: #{props.blockHeight}
        <div className='onHover'>Click to refresh.</div>
      </Flex>
    </BouncyDiv>
  </HoverHolder>)
}


const mapStateToProps = (state) => {
  return {
    blockHeight: state.blocks.blockHeight
  };
}


export default connect(mapStateToProps)(BlockHeight);
