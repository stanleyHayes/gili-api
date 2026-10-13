# gili-api

gili api is an application containing JavaScript. The checked-in dependency manifests use Express, MongoDB via Mongoose. Source modules cover `clubs`, `invitations`, `members`, `club`, `invitation`, `member`, `user`, `api`.

## Repository layout

- `src/` — 24 tracked file(s); source examples: `src/app.js`, `src/config/keys.js`.

## Local setup

Run each package setup block from the repository root. For workspace repositories, install dependencies at the root before running application-specific scripts.

Clone this repository and enter its directory:

```sh
git clone https://github.com/stanleyHayes/gili-api.git
cd gili-api
```

### Node package: `package.json`

Use Node.js and npm.

```sh
npm install
```

- `npm run dev` — runs the declared `dev` script (`nodemon src/index.js`).
- The package test script is a placeholder and exits with an error; it does not run an automated test suite.

## Configuration

The application declares `dotenv`. Review environment-variable references in the source and supply your own local values before starting it. Keep credentials out of Git; do not reuse committed credentials.

## Source entry points

- [src/app.js](src/app.js)
- [src/config/keys.js](src/config/keys.js)
- [src/controllers/user/v1/clubs/clubs.js](src/controllers/user/v1/clubs/clubs.js)
- [src/controllers/user/v1/index.js](src/controllers/user/v1/index.js)
- [src/controllers/user/v1/invitations/invitations.js](src/controllers/user/v1/invitations/invitations.js)
- [src/controllers/user/v1/members/members.js](src/controllers/user/v1/members/members.js)
- [src/index.js](src/index.js)
- [src/models/v1/club.js](src/models/v1/club.js)

## Development notes

Commands above come from the tracked manifests and source layout. External services and runtime configuration may be required. Documentation updates do not establish that the application is deployed or that its tests pass.
