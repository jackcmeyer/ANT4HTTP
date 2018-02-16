const fs = require('fs');
const ohm = require('ohm-js');
const request = require('node-fetch');
const grammarContents = fs.readFileSync('src/ANT4HTTP.ohm');
const ant4httGrammar = ohm.grammar(grammarContents);

const semantics = ant4httGrammar.createSemantics().addOperation('eval', {
  Exp: async function(e) {
    return e.eval();
  },
  GetExp: async function(operation, identifier, from, url) {
    const response = await request(url.eval());
    const body = await response.json();
    return body[identifier.eval()];
  },
  Identifier: function(leftQuote, identifier, rightQuote) {
    return this.sourceString.replace(/\"/g, "");
  },
  URL: function(leftQuote, url, rightQuote) {
    return this.sourceString.replace(/\"/g, "");
  }
});

class Evaluator {
  constructor () {

  }

  async evaluate(command) {
    const match =  ant4httGrammar.match(command);
    if(match.succeeded()) {
      return semantics(match).eval();
    }
  }
}

module.exports = Evaluator;
