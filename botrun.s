#!/bin/bash
killall node
sleep 2s
./pull.sh
su -c "node sabre_atom_dev.js" -s /bin/sh octagon & disown
#node ge.js & disown
echo -e "\e[1;31mBoot Complete.\e[m"
#node sabre_bot.js
