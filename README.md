# 📝 Simple PHP Material To Do List 📝

[![Build Status](https://travis-ci.org/luvuong-le/material-php-todolist.svg?branch=master)](https://travis-ci.org/luvuong-le/material-php-todolist)

![Material To Do List Demo](/src/images/mtodo.gif)

## Project Information

Simple PHP Material To Do List that uses AJAX, PHP Object Oriented

Contains a login system for each user to have different To Do Items

Database Relationship: A User can have many to do items but a todo item can only have one user

Mini project was done in order to explore another approach and put practice in TDD as well as try out new technologies such as Slim Framework

### Development Practices

Makes use of TDD (Test Driven Development) and Travis CI for practicing continuous integration

### Technologies Used

| Technology   | Description                                                                                          | Link ↘️                     |
| ------------ | ---------------------------------------------------------------------------------------------------- | --------------------------- |
| HTML5        | Hyper Text Markup Language                                                                           | ----                        |
| CSS3         | Cascading Style Sheets                                                                               | ----                        |
| JavaScript   | High Level, Dynamic, Interpreted Language                                                            | ----                        |
| PHP          | General Purpose Scripting Language                                                                   | http://php.net/             |
| Twig         | PHP Templating Engine                                                                                | https://twig.symfony.com/   |
| SASS         | Syntactically Awesome Style Sheets                                                                   | https://sass-lang.com/      |
| Babel        | Javascript Compiler/Transpiler                                                                       | https://babeljs.io/         |
| Webpack      | Javascript Module Bundler                                                                            | https://webpack.js.org/     |
| Browser Sync | Synchronised Browser Testing                                                                         | https://www.browsersync.io/ |
| Travis CI    | distributed continuous integration service used to build and test software projects hosted at GitHub | https://travis-ci.org/      |

### Prerequisites

```
Node and npm must be installed

PHP and Composer must be installed

Set your document root to the public directory

Must be run a server that has URL rewriting enabled
```

### Development Setup

```
Run "composer install"

Rename .env.example to .evn and enter database details

Run 'npm install'

Run 'npm run webpack:watch'
```

### Production Setup

```
Run "composer install"

Run "npm run webpack:build"

Rename .env.example to .evn and enter database details
```
