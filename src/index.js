import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getAbsolutePath = (filename) => path.resolve(filename);

const getCurrentWorkingDir = () => process.cwd();

const genDiff = (filename1, filename2) => {
    const filePath1 = getAbsolutePath(filename1);
    const filePath2 = getAbsolutePath(filename2);
    const data1 = JSON.parse(fs.readFileSync(filePath1));
    const data2 = JSON.parse(fs.readFileSync(filePath2));
    const keys1 = Object.keys(data1);
    const keys2 = Object.keys(data2);
    const unionKeys = _.union(keys1, keys2);

    const result = unionKeys.reduce((acc, currentValue) => {
        if (!Object.hasOwn(data2, currentValue)) {
            acc += `- ${currentValue}: "${data1[currentValue]}"\n`;
        } else if (!Object.hasOwn(data1, currentValue)) {
            acc += `+ ${currentValue}: "${data2[currentValue]}"\n`;
        } else if (data1[currentValue] !== data2[currentValue]) {
            acc += `- ${currentValue}: "${data1[currentValue]}"\n`;
            acc += `+ ${currentValue}: "${data2[currentValue]}"\n`;
        } else {
            acc += `  ${currentValue}: "${data1[currentValue]}"\n`;
        }
        return acc;
    }, '');
    console.log(`{\n${result}}`);
};

export {  
    genDiff,
    getAbsolutePath,
};

genDiff('file1.json', 'file2.json');