#!/bin/bash
sleep 1.5s
./pull.sh
cat settings.json | head -n 2 | tail -n 1
echo "-------------------^^^^^^^^"
read -p "CURRENT VER: " newversion
if [[ -z $newversion ]]; then
        echo -e "\e[1;32mNothing Changed!\e[m"
else
        oldhead=$(cat settings.json | head -n 1)
        oldlinesnum=$(cat settings.json | wc -l)
        newlinesnum=$(( $oldlinesnum - 2))
        oldtail=$(cat settings.json | tail -n $newlinesnum)
        echo "$oldhead" > settings.json
        echo -e "       \"version\": \"$newversion\"," >> settings.json
        echo "$oldtail" >> settings.json
fi
#su -c "node sabre_atom4.js" -s /bin/sh octagon & disown
##############################
#
#
# Where the Program Runs
#
#
##############################
#node sabre_atom4.js & disown
killnum=$(ps awuxx | grep "node sabre_atom4.js" | grep -v "grep" | awk {'print $2'} | head -n 1)
if [[ -z $killnum ]]; then
echo -e "\e[1;31mProcess Not Found\e[m"
else
kill -9 $killnum
echo -e "\e[1;31mProcess $killnum Terminated.\e[m"
fi
node sabre_atom4.js & disown
#node ge.js & disown
echo -e "\e[1;31mBoot Complete.\e[m"
#node sabre_bot.js
