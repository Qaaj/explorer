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
  height: 600px;
`;

class Cytoscape extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // New instance every time component mounts
    const cy = window.cyto = cytoscape({
      container: document.getElementById('cy'),
      userZoomingEnabled: false,
      style: [
        {
          selector: 'node',
          style: {
            'label': 'data(id)'
          }
        },

        {
          selector: '.mid',
          style: {
            'width': 8,
            'height': 8,
            'label': ''
          }
        }
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
