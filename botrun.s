#!/bin/bash
killall node
sleep 2s
./pull.sh
node sabre_atom_dev.js & disown
#node sabre_bot.js
