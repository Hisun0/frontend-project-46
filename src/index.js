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
    const keys1 = Object.entries(data1);
    const keys2 = Object.entries(data2);

    const result = keys1.reduce((acc, currentValue) => {
        if (!keys2[0][0].includes(currentValue[0])) {
            acc += currentValue[0];
            if (!keys2[0][0].includes(currentValue[1])) {
                acc += currentValue[1];
            }
        }
        return ['{', acc];
    }, '');

    console.log(keys1[0][0]);
    console.log(result);
}

export {  
    genDiff,
    getAbsolutePath,
};

genDiff('file1.json', 'file2.json');