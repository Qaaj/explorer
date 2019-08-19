import React from 'react';
import { connect } from 'react-redux';
import { fetchBlock } from '../constants';


class Blocks extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchBlock.start('8381593'));
  }

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
