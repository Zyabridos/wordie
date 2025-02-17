install:
	npm ci
	
publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npx playwright test

test-ui:
	npx playwright test --ui

test-modals:
	npx playwright test ./tests/modals.spec.js

test-errors:
	npx playwright test ./tests/errors.spec.js

test-wordle:
	npx playwright test ./tests/wordle.spec.js

dev:
	npm run dev

build:
	rm -rf dist
	npm run build

start:
	npx start-server -s ./dist

p:
	npx prettier --write .