import React from 'react';
import { connect } from 'react-redux';
import BlockHeight from './BlockHeight';
import { Flex, Box } from 'rebass';
import { addSelection } from "../constants";

class Blocks extends React.Component {

  // componentDidMount() {
  //   this.props.dispatch(fetchBlock.start('8393262'));
  // }

  render() {
    const { props } = this;
    return (<div style={{ height: '100vh' }}>
      <Flex flexWrap="wrap">
        {Object.keys(props.blocks.blocks).map((item) => <Box
            style={{cursor: 'pointer'}}
            key={item} m={2}
            onClick={()=> props.dispatch(addSelection.start({type: 'block', id: item}))}
            p={1}
            color='white'
            bg='primary'>
          {item}
        </Box>)}
      </Flex>
      <BlockHeight />
    </div>)
  }
}


const mapStateToProps = (state) => {
  return {
    blocks: state.blocks || {}
  };
}


export default connect(mapStateToProps)(Blocks);
