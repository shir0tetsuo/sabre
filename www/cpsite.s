#!/bin/bash
locationOne="/var/www/html-micro/sabre/"
locationTwo="/var/www/html-ssl/sabre/"
cp ./index.html $locationOne
cp ./index.html $locationTwo
cp ./miniShrimp.js $locationOne
cp ./miniShrimp.js $locationTwo
cp ./sabre.css $locationOne
cp ./sabre.css $locationTwo
cp toggles.js $locationOne
cp toggles.js $locationTwo
echo Done
