## Rock, Paper, Scissors!

[![Built with open-wc recommendations](https://img.shields.io/badge/built%20with-open--wc-blue.svg)](https://github.com/open-wc)

#### Rock, Paper, Scissors! is a progressive mobile web app about the world-known "rock, paper, scissors", expanded with the lizard and Spock. The app doesn't require a server to work, nor it requires an internet conexion to work once it has started.

### Tech Stack

It's made entirely with Lit and deployed using [Netlify](https://rock-paper-scissors-lit.netlify.app/)

## Quickstart

To get started:

```bash
npm install
npm run start
# requires node 10 & npm 6 or higher
```

## Scripts

- `start` runs your app for development, reloading on file changes
- `start:build` runs your app after it has been built using the build command
- `build` builds your app and outputs it in your `dist` directory
- `test` runs your test suite with Web Test Runner

## Details

The game has 3 different views: `home`, `game` & `ranking`.
- `home`: It contains the register and the login form.
- `game`: The game itself, it also contains information about the profile.
- `ranking`: It shows a table with the existing players along with their scores.

All the information is stored in the `localStorage` of the browser.
