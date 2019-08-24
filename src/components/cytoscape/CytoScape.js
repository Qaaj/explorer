// import { subscribe } from 'utils/cytoscape';

import { FETCH_BLOCK, ADD_SELECTION } from "../../constants";
import { subscribe } from "../../utils/cytoscape";

export const nodeColors = {
  /* Legacy Start */
  target: '#1E88E5',
};


const handleStoreAction = ({ cytox, action, state, dispatch }) => {
  const { cyto } = window;
  const { payload } = action;
  switch (action.type) {
    case ADD_SELECTION.START:
      if (payload.type === 'block') cyto.add({
        group: 'nodes',
        id: payload.id,
        data: { id: payload.id }
      });
      // console.log('Adding: ', payload.number);
      // console.log('Nodes: ',cyto.$('node').map((node) => node.id()));
      // console.log('Previous ID:',(cyto.$(`node[id="${payload.number - 1}]"`).map((node) => node.id())));
      // console.log((payload.number-1).toString())
      // const hasPrevious = (cyto.$(`node[id="${payload.number - 1}]"`).map((node) => node.id())).indexOf((payload.number-1).toString()) !== -1;
      // console.log(hasPrevious);
      // if (hasPrevious) {
      //   console.log(cyto.$(`node[id="${payload.number - 1}]"`).length)
      //   cyto.add({
      //     group: 'edges',
      //     data: {
      //       source: payload.number - 1,
      //       target: payload.number,
      //       interactions: 'no',
      //       isSelected: null,
      //     },
      //   });
      // }
      console.log(cyto.$('node').length);
      cyto.layout({ animate: false, fit: true, name: 'grid' }).run();
      cyto.fit(cyto.$('node'), 280 / cyto.$('node').length)

      break;
    default:
      break;
  }
};

export const cytoStyles = (cy) => {
  const dispatch = subscribe(cy, (data) => handleStoreAction(data));
  Object.keys(nodeColors).forEach((type) => {
    const color = nodeColors[type];
    cy.style()
        .selector(`[type="${type}"]`)
        .css({
          'background-color': color,
        });
  });
  cy.$('node').css({
    'label': 'data(id)',
  });
};

// Add the listeners to the cytoscape instance
export const setupListeners = (cy) => {

  cy.minZoom(0.01);
  cy.maxZoom(50);

};
