#!/bin/sh
killall redsocks
killall pdnsd
iptables -t nat -D OUTPUT -p tcp ! -d 203.208.0.0/16 --dport 80 -j REDIRECT --to 12345
iptables -t nat -D OUTPUT -p tcp ! -d 203.208.0.0/16 --dport 443 -j REDIRECT --to 12346
iptables -t nat -L -n | egrep -q 'REDIRECT .* udp .* dpt:53 .* ports 53' && iptables -t nat -D OUTPUT -p udp --dport 7753 -j REDIRECT --to-ports 53
iptables -t nat -D OUTPUT -p tcp -j REDSOCKS
iptables -t nat -F REDSOCKS
iptables -t nat -X REDSOCKS
iptables -t nat -F OUTPUT
