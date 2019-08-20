import React from 'react';
import { connect } from 'react-redux';


class Blocks extends React.Component {

  render() {
    const { props } = this;
    return (<div>
      {JSON.stringify(props.blocks)}
    </div>)
  }
}


const mapStateToProps = (state) => {
  return {
    blocks: state.blocks || {}
  };
}


export default connect(mapStateToProps)(Blocks);
