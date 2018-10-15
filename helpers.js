const chalk = require('chalk');


function tokenizer(line) {
  const DetailsRegex = /("[a-z\'-A-Z\s]*")+/gi;
  const CMDRegex = /^(add|show|play|test|quit|exit) ?(all|played|unplayed)*/gi;

  const details = line.match(DetailsRegex)
  const [input, command, qualifier] = CMDRegex.exec(line) || []

  return { command, qualifier, details }
}

function pause(msg) {
  if (msg) logInfo(msg)
  process.stdin.pause();
}

function resume(msg) {
  if (msg) logInfo(msg)
  process.stdin.resume();
}


function logInfo(msg) {
  console.log(chalk.cyan(msg) + '\n')
}

function logWarn(msg) {
  console.log(chalk.yellow(msg) + '\n')
}

function logError(msg) {
  console.log(chalk.red(msg))
}

function logSystem(msg) {
  console.log(chalk.bold.green(msg) + '\n')
}

function stripQuotes(str) {
  return str.replace(/"/g, '').trim()
}

const helpText = chalk.white(`
  ${chalk.underline.cyan('add')}
  add "$title" "$artist" (ex. add "Respect" "Aretha Franklin")

  ${chalk.underline.cyan('play')}
  "$song" (ex. play "ATLiens")

  ${chalk.underline.cyan('show')}
  all/played/unplayed [, by "$artist]

  examples:
  show unplayed
  show played by "Quincy Jones"
  show all
  show all by "Whitney Houston"
`);

module.exports = {
  pause,
  resume,
  logInfo,
  logError,
  logWarn,
  logSystem,
  stripQuotes,
  tokenizer,
  helpText
}