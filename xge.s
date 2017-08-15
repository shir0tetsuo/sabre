#!/bin/bash
killnum=$(ps awuxx | grep "node ge.js" | grep -v "grep" | awk {'print $2'} | head -n 1)
if [[ -z $killnum ]]; then
echo -e "\e[1;31mProcess Not Found\e[m"
else
kill -9 $killnum;
echo -e "\e[1;31mProcess $killnum terminated.\e[m"
fi
node ge.js & disown
