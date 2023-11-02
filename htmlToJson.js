// var hObj = require('html-to-json');

import pkg from 'htm-to-json';

const { convert_html_to_json } = pkg;

import { readFile, writeFileSync, mkdirSync, existsSync } from 'fs';

readFile('data/index.html', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    } else {
        // console.log(data);
        convert_html_to_json(data, function (err, dataFinal) {
            if (err) throw err;
            else {
                console.log(Object.keys(dataFinal));
                if (!existsSync('artifact')) {
                    mkdirSync('artifact');
                }
                writeFileSync('artifact/parsed_data.json', JSON.stringify(dataFinal, null, 2), function (err) {
                    if (err) throw err;
                    console.log('successfully saved file')
                });
            }
        });
    }


});



