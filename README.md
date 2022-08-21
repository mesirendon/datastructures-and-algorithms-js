# Data Structures and Algorithms
This repository written in JavaScript is a compilation of the most-known data structures and algorithms.

## Disclaimer ⚠️
This repository is meant to be used as an educational and research tool. You should think twice before copying and pasting the code here in your production developments. Remember this code is licensed under [MIT License](LICENSE) thus limiting any kind of warranty or any liablity for its use.

## Acknowledgement
This repository is heavily inspired on [trekhleb](https://github.com/trekhleb)'s [JavaScript Algorithms](https://github.com/trekhleb/javascript-algorithms) repository.

## Why JavaScript?
It's usual to see data structures and algorithms taught in Java. However, getting a Java development environment might be troublesome, whereas JavaScript can be ran with no more than a few steps.

JavaScript is also a flexible language that allows performing actions that could save time and is helpful for explaining a concept. If you want to transpile this knowledge to any other language, it might be easier for you after understanding what's explained here.

## Data Structures
Data is a broad term that could mean any kind of information. Structuring such information is related to how organize it and store it for future access or manipulation in an efficient manner.

* [Singly Linked List](src/singly-linked-lists/Linked%20Lists.ipynb)
* [Doubly Linked List](src/doubly-linked-lists/Doubly%20Linked%20Lists.ipynb)

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