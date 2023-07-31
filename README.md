# SWAPI Deck - Assignment

This project is built to showcase a sample of my Angular skills for developing real-world applications, featuring NGXS for state management (currently [Elf](https://github.com/ngneat/elf/)), Jest for unit/integration tests, and Cypress for end-to-end tests. Expands as I'm expanding my knowledge within the frontend area.

#### Project idea prototype

![Project idea prototype screenshot](https://github.com/adrianghub/swapi-deck/assets/44274979/58190740-0e0a-4894-bdb0-6cd7081c1e61)

<br/><br/>

#### Current project implementation progress

![Current project progress screenshots presentation](https://github.com/adrianghub/swapi-deck/assets/44274979/905d1935-50cf-43bd-bea0-a53fac862775)

## Frontend development

### Local dev

`nx serve client`

### Unit tests

`nx test client`

### E2E tests

`nx e2e client-e2e`

or with headed mode

`nx e2e client-e2e --watch`

### Build

`nx build client`

## Disclaimer

The app is using ngxs for the state management and it's stateless regarding user's session. It would be obviously better to save players, scores and overall game progress in session storage but I decided to go with ngxs for the purpose of checking this tool.

_Update 2023-07-31_ Currently I've moved state managment to [Elf](https://github.com/ngneat/elf/) implementing local storage strategy for storing players information such as cardSelection, players info and score.

## Plans for developement

- Configuration
  - [x] i18n (en)
  - [x] routing
  - [x] state management
  - [x] UI lib
- Core
  - [x] Add main menu
  - [x] Add game wizard
  - [x] Add game board
  - [x] Fetch cards from API
  - [x] Add unit tests (wip)
  - [x] Add e2e tests (wip)
- Features
  - [x] Select usernames
  - [x] Choose type of cards
  - [x] Add pagination
  - [x] Select card
  - [x] Add game results modal
  - [x] Reset game state
  - [x] Store players info in local storage
  - [ ] Add leaderboard
