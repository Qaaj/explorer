import React from 'react';
import { connect } from 'react-redux';
import BlockHeight from './BlockHeight';
import { fetchBlock } from "../constants";

class Blocks extends React.Component {

  // componentDidMount() {
  //   this.props.dispatch(fetchBlock.start('8393262'));
  // }

  render() {
    const { props } = this;
    return (<div style={{ height: '100vh' }}>
      <ul>
        {Object.keys(props.blocks.blocks).map((item) => <li key={item}>{item}</li>)}
      </ul>
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
