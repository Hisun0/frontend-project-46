# General Difference

This is a program that make a diff between two files.

### Hexlet tests and linter status:
[![Actions Status](https://github.com/Hisun0/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/Hisun0/frontend-project-46/actions)
[![Node.js CI](https://github.com/Hisun0/frontend-project-46/actions/workflows/node.js.yml/badge.svg)](https://github.com/Hisun0/frontend-project-46/actions/workflows/node.js.yml)
<a href="https://codeclimate.com/github/Hisun0/frontend-project-46/maintainability"><img src="https://api.codeclimate.com/v1/badges/7df1fb909338a2975b7e/maintainability" /></a>
<a href="https://codeclimate.com/github/Hisun0/frontend-project-46/test_coverage"><img src="https://api.codeclimate.com/v1/badges/7df1fb909338a2975b7e/test_coverage" /></a>

## How to install
### System requirements
Node.js v18 or higher

### Installation

    git clone https://github.com/Hisun0/frontend-project-46.git
    cd ./frontend-project-46
    make install
    
## Posibilities

* Making difference in plain text, stylish and json
Example for stylish format:
    gendiff filepath1.json filepath2.json

    {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
* Support two format: yaml and json
