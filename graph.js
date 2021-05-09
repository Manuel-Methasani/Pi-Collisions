var elt = document.getElementById('calculator');
var calculator = Desmos.GraphingCalculator(elt);
calculator.setExpression({
  id: 'graph1',
  latex: 'x^2+y^2=4'
})

let xArray = [];
let yArray = [];

function updateGraph() {
  calculator.setExpression({
    id: 'table1',
    type: 'table',
    columns: [{
        latex: 'x',
        values: xArray,
      },
      {
        latex: 'y',
        values: yArray,
        lines: true,
      }
    ],
  });
}