# Data Structures and Algorithms
[![codecov](https://codecov.io/gh/mesirendon/datastructures-and-algorithms-js/branch/main/graph/badge.svg?token=G7ACV97AFD)](https://codecov.io/gh/mesirendon/datastructures-and-algorithms-js)

This repository written in JavaScript is a compilation of the most-known data structures and algorithms.

## Disclaimer ⚠️
This repository is meant to be used as an educational and research tool. Therefore, you should think twice before copying and pasting the code seen here in your production developments. Also, remember this code is licensed under [MIT License](LICENSE), thus limiting any warranty or liability for its use.

## Acknowledgement
[Trekhleb](https://github.com/trekhleb)'s [JavaScript Algorithms](https://github.com/trekhleb/javascript-algorithms) repository heavily inspires this repository.

## Why JavaScript?
It's usual to see data structures and algorithms taught in Java. However, getting a Java development environment might be troublesome, whereas JavaScript can be run with no more than a few steps.

JavaScript is also a flexible language that allows performing actions that could save time and helps explain a concept. If you want to transpile this knowledge to any other language, it might be easier for you after understanding what's presented here.

## Data Structures
Data is a broad term that could mean any type of information. Structuring such information is related to organizing and storing it for future access or manipulation in an efficient manner.

**Note on exercises**: I'm not using the actual implementation here because
1. These notebooks do not allow me to import classes like a structured project.
2. The idea of each exercise notebook is to show the real solution. Thus importing would have the reader opening a new window, and I want to keep them on the site to focus on the problem under analysis.

### Topics

* [Singly Linked List](src/singly-linked-lists/Linked%20Lists.ipynb) | [List of Exercises](src/singly-linked-lists/exercises/README.md)
* [Doubly Linked List](src/doubly-linked-lists/Doubly%20Linked%20Lists.ipynb) | List of Exercises (**TODO**)

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

#### All
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