import React from 'react';
import { connect } from 'react-redux';
import { fetchBlock } from "../constants";

class Blocks extends React.Component {

  // componentDidMount() {
  //   this.props.dispatch(fetchBlock.start('8393262'));
  // }

  render() {
    const { props } = this;
    return (<div>
      <h3>{props.blocks.blockHeight}</h3>
      {JSON.stringify(Object.keys(props.blocks.blocks))}
    </div>)
  }
}


const mapStateToProps = (state) => {
  return {
    blocks: state.blocks || {}
  };
}


export default connect(mapStateToProps)(Blocks);
