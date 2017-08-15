#!/bin/bash
killnum=$(ps awuxx | grep "node ge.js" | awk {'print $2'})
if [ -z killnum ]; then kill $killnum; fi
echo -e "\e[1;31mProcess \e[m"
node ge.js & disown
