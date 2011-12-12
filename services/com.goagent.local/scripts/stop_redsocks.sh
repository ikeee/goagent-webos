#!/bin/sh
killall redsocks
killall pdnsd
/usr/sbin/iptables -t nat -D OUTPUT -p tcp ! -d 203.208.0.0/16 --dport 80 -j REDIRECT --to 12345
/usr/sbin/iptables -t nat -D OUTPUT -p tcp ! -d 203.208.0.0/16 --dport 443 -j REDIRECT --to 12346
/usr/sbin/iptables -t nat -L -n | egrep -q 'REDIRECT .* udp .* dpt:53 .* ports 53' && /usr/sbin/iptables -t nat -D OUTPUT -p udp --dport 7753 -j REDIRECT --to-ports 53
/usr/sbin/iptables -t nat -D OUTPUT -p tcp -j REDSOCKS
/usr/sbin/iptables -t nat -F REDSOCKS
/usr/sbin/iptables -t nat -X REDSOCKS
/usr/sbin/iptables -t nat -F OUTPUT
