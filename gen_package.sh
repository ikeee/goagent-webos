#!/bin/sh
if [ -e com.goagent.local_1.1.0_all.ipk ]
then
	echo "delete old ipk"
	rm -rf com.goagent.local_1.1.0_all.ipk
fi
palm-package packages/com.goagent.local/ applications/com.goagent.local/ services/com.goagent.local/
palm-install com.goagent.local_1.1.0_all.ipk
