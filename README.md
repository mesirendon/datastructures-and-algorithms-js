# Data Structures and Algorithms
[![codecov](https://codecov.io/gh/mesirendon/datastructures-and-algorithms-js/branch/main/graph/badge.svg?token=G7ACV97AFD)](https://codecov.io/gh/mesirendon/datastructures-and-algorithms-js)
[![CI](https://github.com/mesirendon/datastructures-and-algorithms-js/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/mesirendon/datastructures-and-algorithms-js/actions/workflows/ci.yml)

This repository written in JavaScript is a compilation of the most-known data structures and algorithms.

## Why JavaScript?
It's usual to see data structures and algorithms taught in Java. However, getting a Java development environment might be troublesome, whereas JavaScript can be run with no more than a few steps.

JavaScript is also a flexible language that allows performing actions that could save time and helps explain a concept. If you want to transpile this knowledge to any other language, it might be easier for you after understanding what's presented here.

## The Book
Read all the content of [**Data Structures and Algorithms** here](content.md)

## Using this repository

### Prerequisites
You will need to have node installed. I recommend using the [nvm installer script](https://github.com/nvm-sh/nvm#install--update-script), and following their [instructions](https://github.com/nvm-sh/nvm#usage). I recommend using an LTS version.

### Clone
```bash
git clone git@github.com:mesirendon/datastructures-and-algorithms-js.git
```

### Install dependencies
```bash
npm ci
```

### Run tests

#### All Tests
Running all tests will show a coverage report.
```bash
npm test
```

#### Specific
```bash
npm run test:case src/singly-linked-lists/__test__/linked-lists.spec.js
```

### Start the app
You can use the provided index.js as a playground by running in a console the following command.

```bash
npm start
```

When you modify the [index.js](index.js) file and save it, the service will be reloaded.

## Disclaimer ⚠️
This repository is meant to be used as an educational and research tool. Therefore, you should think twice before copying and pasting the code seen here in your production developments. Also, remember this code is licensed under [MIT License](LICENSE), thus limiting any warranty or liability for its use.

## Acknowledgement
[Trekhleb](https://github.com/trekhleb)'s [JavaScript Algorithms](https://github.com/trekhleb/javascript-algorithms) repository heavily inspires this repository.