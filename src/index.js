const figlet = require('figlet');
const chalk = require('chalk');
const repl = require('repl');

const Evaluator = require('./evaluator')

console.log(chalk.blue(figlet.textSync('ANT4HTTP', {
  font: 'banner3',
  horizontalLayout: 'default',
  verticalLayout: 'default'
})));

console.log(chalk.yellow('Type your query, enter a file path, or press help. Press Ctrl + C to exit'));

const replServer = repl.start({
  prompt: chalk.yellow('ANT4HTTP > '),
  eval: evaluator
})

replServer.on('exit', () => {
  console.log(chalk.red('Exiting ANT4HTTP. Goodbye!'));
  process.exit();
});

function evaluator(cmd, context, filename, callback) {
  callback(null, new Evaluator().evaluate(cmd));
}
