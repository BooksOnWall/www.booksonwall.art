#!/usr/bin/env bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
nvm use 14
echo "##   update browser list database"
npx browserslist@latest --update-db
npm i -g yarn
echo "##   git pull disabled"
# git pull 
echo "##   install packages ..."
yarn 
echo "##   build start ..."
yarn build
echo "##   build complete ..."
cp _htaccess build/.htaccess
echo "##   set permissions ..."
chown -R booksonwall:booksonwall public
rm -rf node_modules
echo "##   node_modules deleted !"
