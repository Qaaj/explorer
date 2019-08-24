import React from 'react';
import { connect } from 'react-redux';
import BlockHeight from './BlockHeight';
import { Flex, Box } from 'rebass';
import { addCytoscape } from "../constants";

class Blocks extends React.Component {

  // componentDidMount() {
  //   this.props.dispatch(fetchBlock.start('8393262'));
  // }

  render() {
    const { props } = this;
    console.log(props.selection);
    return (<div>
      <Flex flexWrap="wrap">
        {Object.keys(props.blocks.blocks).map((item) => <Box
            style={{cursor: 'pointer'}}
            key={item} m={2}
            onClick={()=> props.dispatch(addCytoscape.start({type: 'block', id: item}))}
            p={1}
            color='white'
            bg='primary'>
          {item}
        </Box>)}
      </Flex>
      <hr />
      <div>
        {props.selection.map((item) => {
          let data;
          if(item.type === 'block') data = props.blocks[item.id] || {};
          if(item.type === 'tx') data = props.blocks.transactions[item.id] || {};
          return <div key={item.id}>
            {Object.entries(data).map(([a,b],i) => <div key={i}><b>{a}:</b> {b}</div>) }
          </div>
        })}
      </div>
      <BlockHeight />
    </div>)
  }
}


const mapStateToProps = (state) => {
  return {
    blocks: state.blocks || {},
    selection: state.blocks.selection || []
  };
}


export default connect(mapStateToProps)(Blocks);
