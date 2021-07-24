# Drag Test Server

Drag Test Server

## Minimal Requirements

- [Node.js](https://nodejs.org/)
- [yarn](https://yarnpkg.com/)

## Setup

Install all the required Javascript packages.

    yarn set version berry
    yarn install

Build the source:

    yarn run build

## Execution

    # copy the configuration file from the template and edit accordingly
    cp test-config.json.template test-config.json

    export DRAG_TEST_CONFIG=test-config.json
    yarn run main

## git hooks

Set up the git pre-commit hook as follows:

    ln -s ../../scripts/pre-commit-lint.sh .git/hooks/pre-commit
