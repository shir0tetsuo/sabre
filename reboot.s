killnum=$(ps awuxx | grep "node sabre_atom4.js" | grep -v "grep" | awk {'print $2'} | head -n 1)
kill -9 $killnum
botrun.s
node sabre_atom4.js & disown
