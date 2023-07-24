# SWAPI Deck

Project idea prototype


![Project idea prototype screenshot](https://github.com/adrianghub/swapi-deck/assets/44274979/58de4cb1-28f3-4f0f-a0e0-471483c54d30)




Current project implementation progress


![Current project progress screenshots presentation](https://github.com/adrianghub/swapi-deck/assets/44274979/3030eea6-eeec-4620-aba5-bd5482f80e0b)



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
  - [ ] Add leaderboard
