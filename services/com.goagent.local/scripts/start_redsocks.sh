#!/bin/sh

DIR=/media/cryptofs/apps/usr/palm/services/com.goagent.local.service/scripts

PATH=$DIR:$PATH

$DIR/redsocks -c $DIR/redsocks.conf -p /dev/null
/usr/sbin/iptables -t nat -A OUTPUT -p tcp ! -d 203.208.0.0/16 --dport 80 -j REDIRECT --to 12345
/usr/sbin/iptables -t nat -A OUTPUT -p tcp ! -d 203.208.0.0/16 --dport 443 -j REDIRECT --to 12346
/usr/sbin/iptables -t nat -N REDSOCKS
/usr/sbin/iptables -t nat -A REDSOCKS -d 127.0.0.0/8 -j RETURN
/usr/sbin/iptables -t nat -A REDSOCKS -d 203.208.0.0/16 -j RETURN
/usr/sbin/iptables -t nat -A REDSOCKS -d 8.8.8.8/8 -j RETURN
/usr/sbin/iptables -t nat -A REDSOCKS -p tcp -j REDIRECT --to-ports 12345
/usr/sbin/iptables -t nat -A OUTPUT -p tcp -j REDSOCKS
/usr/sbin/iptables -t nat -A OUTPUT -p udp --dport 53 -j REDIRECT --to-ports 7753
#chmod go-w $DIR/pdnsd.conf
$DIR/pdnsd -c $DIR/pdnsd.conf -mto &
