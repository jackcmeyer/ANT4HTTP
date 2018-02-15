const fs = require('fs');
const ohm = require('ohm-js');
const grammarContents = fs.readFileSync('src/ANT4HTTP.ohm');
const ant4httGrammar = ohm.grammar(grammarContents);

class Evaluator {
  constructor () {

  }

  evaluate(command) {
    return ant4httGrammar.match(command).succeeded();
  }
}

module.exports = Evaluator;
