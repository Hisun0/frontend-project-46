import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { genDiff } from "../src/index.js";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename));

test('diff between two json', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    
    expect(genDiff(filepath1, filepath2)).toEqual('{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}');
});