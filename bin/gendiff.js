#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/diff.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.01')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>', 'required file path to get json diff')
  .argument('<filepath2>', 'required file path to get json diff')
  .action((filepath1, filepath2) => {
    genDiff(filepath1, filepath2);
  });
program.parse();
