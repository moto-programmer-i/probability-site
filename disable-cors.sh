#!/bin/bash -x

cd "$(dirname "$0")"
/usr/bin/google-chrome-stable ./gacha.html --disable-web-security --user-data-dir="/run/media/user/linux-data/temp"
