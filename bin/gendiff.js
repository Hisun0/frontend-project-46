#!/usr/bin/env node
import { Command } from 'commander';
import { genDiff } from '../src/index.js';
const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.01')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    genDiff(filepath1, filepath2);
  })

program.parse();