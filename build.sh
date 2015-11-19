#!/usr/bin/env bash

git checkout gh-pages
git merge master -m "Merge branch 'master' into gh-pages"
npm run build:prod
git add -A
git commit -m 'publish rx-training-games'
git push
