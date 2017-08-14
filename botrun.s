#!/bin/bash
killall node
sleep 2s
./pull.sh
node sabre_atom_dev.js & disown
#node ge.js & disown
echo -e "\e[1;31mBoot Complete.\e[m"
#node sabre_bot.js
