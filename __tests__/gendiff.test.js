import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/diff.js';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

const getFixturePath = (filename) => path.join(dirName, '..', '__fixtures__', 'test_files', filename);
const getExpectedPath = (filename) => path.join(dirName, '..', '__fixtures__', 'expected', filename);
const readFile = (filename) => fs.readFileSync(getExpectedPath(filename), 'utf-8');

test('diff between two flat json', () => {
  const filepath1 = getFixturePath('flat_file1.json');
  const filepath2 = getFixturePath('flat_file2.json');
  const expectedFile = readFile('expected_flat_jsonFile.txt');

  expect(genDiff(filepath1, filepath2)).toEqual(expectedFile);
});

test('diff between two nested json', () => {
  const filepath1 = getFixturePath('nested_file1.json');
  const filepath2 = getFixturePath('nested_file2.json');
  const expectedFile = readFile('expected_nested_jsonFile.txt');

  expect(genDiff(filepath1, filepath2)).toEqual(expectedFile);
});

test('diff between two flat yml', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');
  const expectedFile = readFile('expected_ymlFile.txt');

  expect(genDiff(filepath1, filepath2)).toEqual(expectedFile);
});

test('diff between two nested yml', () => {
  const filepath1 = getFixturePath('nested_file1.yml');
  const filepath2 = getFixturePath('nested_file2.yml');

  const expectedFile1 = readFile('expected_nested_ymlFile.txt');

  expect(genDiff(filepath1, filepath2)).toEqual(expectedFile1);
});

test('plain diff between two files', () => {
  const filepath1 = getFixturePath('nested_file1.json');
  const filepath2 = getFixturePath('nested_file2.json');
  const filepath3 = getFixturePath('nested_file3.yml');
  const filepath4 = getFixturePath('nested_file4.yml');

  const expectedFile1 = readFile('expected_plain_file.txt');
  const expectedFile2 = readFile('expected_plain_yml.txt');

  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expectedFile1);
  expect(genDiff(filepath3, filepath4, 'plain')).toEqual(expectedFile2);
});

test('json diff between two files', () => {
  const filepath1 = getFixturePath('nested_file1.json');
  const filepath2 = getFixturePath('nested_file2.json');
  const expectedFile = readFile('expected_json_file.txt');

  expect(genDiff(filepath1, filepath2, 'json')).toEqual(expectedFile);
});

test('check for format', () => {
  const filepath1 = getFixturePath('nested_file1.json');
  const filepath2 = getFixturePath('nested_file2.json');

  expect(() => genDiff(filepath1, filepath2, 'txt')).toThrow('Unknown format!');
});
