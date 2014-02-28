#!/bin/sh

USER_HOME=$(eval echo ~${USER})

src=$USER_HOME/"apps/liturgy.2.beta/public"
dst=$USER_HOME/"www/test"
cur=$(pwd)

manifest=( "css" "favicon.ico" "fonts" ".htaccess" "img" "robots.txt" "js/libs" "js/app/config/config.js" "js/app/init/DesktopInit.min.js" "js/app/init/MobileInit.min.js" )
cd $src
for resource in "${manifest[@]}"
do
	echo "copying over ($resource) ..."
	cp -rf --parent $resource $dst
done

# only for the first time
#cp $src/index.php $dst

cd $cur
