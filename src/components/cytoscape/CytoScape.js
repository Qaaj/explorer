// import { subscribe } from 'utils/cytoscape';

import _ from 'lodash';
import { SET_SELECTION, setSelection, ADD_CYTOSCAPE } from "../../constants";
import { subscribe } from "../../utils/cytoscape";

const handleStoreAction = ({ cytox, action, state, dispatch }) => {
  const { cyto } = window;
  const { payload } = action;
  switch (action.type) {
    case ADD_CYTOSCAPE.START:
      if (payload.type === 'block') cyto.add({
        group: 'nodes',
        id: payload.id.toString(),
        data: { id: payload.id, type: 'block' }
      });

      cyto.$('nodes[type="block"]').layout({ animate: false, fit: true, name: 'grid' }).run();
      cyto.fit(cyto.$('nodes'), 220 / cyto.$('node').length)

      break;
    case SET_SELECTION.START:
      console.log(action);
      payload.forEach((item) => {
        if (item.type === 'block') {
          const nodePosition = cyto.$(`node[id="${item.id}"]`).position();
          const blockTransactions = Object.values(state.blocks.transactions).filter((tx) => tx.blockNumber == item.id);
          const numTx = blockTransactions.length;
          console.log(blockTransactions.length);
          _.orderBy(blockTransactions, ['value'],['asc']).forEach((tx, i) => {
            let txSize = 20 + (tx.value/100000000000000000);
            txSize = txSize > 50 ? 50 : txSize;
            console.log(tx.value);

            const x = (50 + (3*txSize)) * Math.cos(2* Math.PI * (i / numTx));
            const y = (50 + (3*txSize)) * Math.sin(2* Math.PI * (i / numTx));
            // var eles = cy.add([
            //   { group: 'nodes', data: { id: 'n0' }, position: { x: 100, y: 100 } },
            //   { group: 'nodes', data: { id: 'n1' }, position: { x: 200, y: 200 } },
            //   { group: 'edges', data: { id: 'e0', source: 'n0', target: 'n1' } }
            // ]);
            const hash = tx.hash.toString();
            const block = tx.blockNumber.toString();
            console.log(numTx);

            cyto.add({
              group: 'nodes',
              width: txSize,
              height: txSize,
              position: {
                x: nodePosition.x + x,
                y: nodePosition.y + y,
              },
              data: { id: hash, type: 'tx', txSize,  width: txSize,
                height: txSize },
            }, {
              group: 'edges',
              data: {
                id: `${hash}-${block}`,
                source: hash,
                target: block,
              },
            });
          })
          blockTransactions.forEach((tx, i) => {
            const hash = tx.hash.toString();
            const block = tx.blockNumber.toString();
            cyto.add({
              group: 'edges',
              data: {
                id: `${hash}-${block}`,
                source: hash,
                target: block,
              },
            });
          })
        }
      })
      cytoStyles(cyto);
      break;
    default:
      break;
  }
};

export const cytoStyles = (cy) => {
  //
  // Object.keys(nodeColors).forEach((type) => {
  //   const color = nodeColors[type];
  //   cy.style()
  //       .selector(`[type="${type}"]`)
  //       .css({
  //         'background-color': color,
  //       });
  // });
};

// Add the listeners to the cytoscape instance
export const setupListeners = (cy) => {
  const dispatch = subscribe(cy, (data) => handleStoreAction(data));
  cy.minZoom(0.01);
  cy.maxZoom(50);
  cy.on('select', 'node', function (evt,node) {
    console.log(evt.target.data())
    const selection = (cy.$(':selected').map(item => item.data()));
    dispatch(setSelection.start(selection));
  });

};
