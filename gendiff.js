#!/usr/bin/env node
import { Command } from 'commander';
import parseFile from './parser.js';
import compare from './compare.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format (default: "stylish")')
  .helpOption('-h, --help', 'display help for command')
  .action((filepath1, filepath2) => {
    console.log('Аргументы:', filepath1, filepath2); 

    if (!filepath1 || !filepath2) {
      console.error('Ошибка: не переданы пути к файлам.');
      process.exit(1);
    }

    
    const { data1, data2 } = parseFile(filepath1, filepath2);

    const diff = compare(data1, data2);
    console.log(diff);
  });

program.parse(process.argv);
