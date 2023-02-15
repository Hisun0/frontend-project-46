import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getAbsolutePath = (filename) => path.resolve(process.cwd(), filename);

console.log(getAbsolutePath('file1.json'))

const getJSONFromFile = (filePath1, filePath2) => {
    const absolutePath1 = getAbsolutePath(filePath1);
    const absolutePath2 = getAbsolutePath(filePath2);
    const data1 = JSON.parse(fs.readFileSync(absolutePath1));
    const data2 = JSON.parse(fs.readFileSync(absolutePath2));

    return [data1, data2];
};

const getUnionKeys = (data1, data2) => {
    const keys1 = Object.keys(data1);
    const keys2 = Object.keys(data2);
    const unionKeys = _.union(keys1, keys2);

    return unionKeys.sort();
};

const genDiff = (filename1, filename2) => {
    const [data1, data2] = getJSONFromFile(filename1, filename2);
    const unionKeys = getUnionKeys(data1, data2);

    const result = unionKeys.reduce((acc, currentValue) => {
        if (!Object.hasOwn(data2, currentValue)) {
            acc += `  - ${currentValue}: "${data1[currentValue]}"\n`;
        } else if (!Object.hasOwn(data1, currentValue)) {
            acc += `  + ${currentValue}: "${data2[currentValue]}"\n`;
        } else if (data1[currentValue] !== data2[currentValue]) {
            acc += `  - ${currentValue}: "${data1[currentValue]}"\n`;
            acc += `  + ${currentValue}: "${data2[currentValue]}"\n`;
        } else {
            acc += `    ${currentValue}: "${data1[currentValue]}"\n`;
        }
        return acc;
    }, '');
    console.log(`{\n${result}}`)
    return `{\n${result}}`;
};

export {  
    genDiff
};
