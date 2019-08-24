import React from 'react';
import { connect } from 'react-redux';
import cytoscape from 'cytoscape';
import styled from 'styled-components';
import {
  setupListeners,
  cytoStyles,
} from './CytoScape';


const CytoHolder = styled.div`
  width: 100%;
  height: 500px;
`;

export const nodeColors = {
  /* Legacy Start */
  block: '#1E88E5',
  tx: '#26b822',
};

class Cytoscape extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // New instance every time component mounts
    const cy = window.cyto = cytoscape({
      container: document.getElementById('cy'),
      userZoomingEnabled: true,
      style: [
        {
          selector: 'node[type="block"]',
          style: {
            'shape': 'diamond',
            'background-color':  nodeColors.block,
            'label': 'data(id)'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': '1'
          }
        },
        {
          selector: 'node[type="tx"]',
          style: {
            'label': '',
            'shape': 'circle',
            'background-color': nodeColors.tx,
            width: 'data(txSize)',
            height: 'data(txSize)'
          }
        },
        {
          selector: 'node[type="tx"]:selected',
          style: {
            'background-color': 'red',
            border: '1px solid blue',
          }
        },
      ],
    });
    cytoStyles(cy);
    setupListeners(cy);
  }

  componentWillUnmount() {
    const cy = window.cyto.destroy();
    cy.style({});
    cy.nodes().remove();
    unsubscribe(cy);
  }

  render() {
    const { props } = this;
    return (<CytoHolder id="cy"></CytoHolder>)
  }
}


const mapStateToProps = (state) => {
  return {
    blocks: state.blocks || {}
  };
}


export default connect(mapStateToProps)(Cytoscape);
