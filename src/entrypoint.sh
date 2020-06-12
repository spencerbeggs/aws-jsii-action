#!/bin/bash -eu

_main() {
    _package
    _ls
}

_ls() {
    ls
}

_cd_to_action_dir() {
    pwd
    cd /.aws-jsii-action
    pwd
}

_npm_build() {
    npm install --no-package-lock
    npm run-script build
    npm run-script package
    _cd_to_action_dir
    _ls
    npm run-script artifacts
}

_yarn_build() {
    yarn install --production=false
    yarn build
    yarn package
    _cd_to_action_dir
    _ls
    yarn artifacts
}

_package() {
    if [ -x "$(command -v yarn)" ] && [ -f "yarn.lock" ]; then
        _yarn_build
    else
        _npm_build
    fi
}

_main
