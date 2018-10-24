import React, { Component, Fragment } from 'react';
import './App.css';
import { VennDiagram } from 'venn.js';
import { select } from 'd3-selection';


class App extends Component {
  render() {
    const A = 'gene:nod2';
    const B = 'annotation:(type:"alternative products")'

    // Actual numnbers taken from queries
    const sets = [
      {sets: [A], size: 191}, 
      {sets: [B], size: 25230},
      {sets: [A,B], size: 19}
    ];

    const setsLog = sets.map((x) => {
      return {
        ...x,
        size: Math.log(x.size),
      }
    });

    console.log(JSON.stringify(sets, null, 2));
    console.log(JSON.stringify(setsLog, null, 2));

    const chart = VennDiagram();

    return (
      <Fragment>
        <div>
          With standard scaling
          <svg width={600} height={400}>
            <g
              ref={node => select(node).datum(sets).call(chart)}
            />
          </svg>
        </div>
        <div>
          With log-scaling
          <svg width={600} height={400}>
            <g
              ref={node => select(node).datum(setsLog).call(chart)}
            />
          </svg>
        </div>
      </Fragment>
    );
  }
}

export default App;
