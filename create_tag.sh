#!/bin/bash

prefix="test"
suffix=""

if `git status | grep "master" &>/dev/null`
then
prefix="release"
suffix=""
fi

 mitag() {
        git push
        git pull --tags
        local new_tag=$(echo ${prefix}-$(date +'%Y%m%d')${suffix}-$(git tag -l "${prefix}-$(date +'%Y%m%d')${suffix}-*" | wc -l | xargs printf '%02d'))
        echo ${new_tag}
        git tag ${new_tag}
        git push origin $new_tag
}

mitag;
