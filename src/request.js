const fetch = require('node-fetch');

const get = async function(url) {
  const response = await fetch(url);
  return response.json();
};

module.exports = get;

