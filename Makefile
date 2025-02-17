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

dev:
	npm run dev

build:
	rm -rf dist
	npm run build

start:
	npx start-server -s ./dist

p:
	npx prettier --write .