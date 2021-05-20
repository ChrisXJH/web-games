# /bin/bash

DISABLE_ESLINT_PLUGIN=true react-scripts build

cp ./build/index.html ./build/404.html
