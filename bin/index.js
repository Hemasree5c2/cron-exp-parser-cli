#!/usr/bin/env node

const { program } = require("commander");
const parser = require("../lib/expressionParser");

program.version("1.0.0");
program.description("cron expression parser").action(() => {
  parser.parseAndConstructTable(program.args);
});

program.parse(process.argv);
