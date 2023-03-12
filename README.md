# General Difference

This is a program that make a diff between two files.

### Utils that was used

1. `commander.js` library
2. `jest` framework

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

`gendiff -h` command will show you in terminal next:
   
    Usage: gendiff [options] <filepath1> <filepath2>

    Compares two configuration files and shows a difference.

    Arguments:
      filepath1            required file path to get diff
      filepath2            required file path to get diff

    Options:
      -V, --version        output the version number
      -f, --format <type>  output format (default: "stylish")
      -h, --help           display help for command

***Making*** difference in plain text, stylish and json

<details><summary><b>Show example</b></summary>

For stylish format:

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
    
For plain format:

    gendiff --format plain path/to/file.yml another/path/file.json

    Property 'common.follow' was added with value: false
    Property 'group1.baz' was updated. From 'bas' to 'bars'
    Property 'group2' was removed
    

</details>
    
***Support*** two formats: yaml and json

## How it looks in terminal

For stylish format:
> This is example of nested json file, but, obviosly, that will work with flat json too :)
<a href="https://asciinema.org/a/gPu2Hzqy6VhcrJ1Tn1OvMYThO" target="_blank"><img src="https://asciinema.org/a/gPu2Hzqy6VhcrJ1Tn1OvMYThO.svg" /></a>

For plain format:
> Flat files is our power! Stop, this is not a flat file...
<a href="https://asciinema.org/a/oS8dT77326eWOCiV0XmxjkEv9" target="_blank"><img src="https://asciinema.org/a/oS8dT77326eWOCiV0XmxjkEv9.svg" /></a>

For json format:
> Oh no, again nested file...
<a href="https://asciinema.org/a/PG81vHcugX0stpNrJsg02SbkK" target="_blank"><img src="https://asciinema.org/a/PG81vHcugX0stpNrJsg02SbkK.svg" /></a>

## Thank you for your attention!
