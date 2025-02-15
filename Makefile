install:
	npm ci
	
publish:
	npm publish --dry-run

lint:
	npx eslint .

play:
	node src/index.js

test:
	npx playwright test

test-ui:
	npx playwright test --ui

dev:
	npm run dev

build:
		rm -rf dist
		npm run build

p:
	npx prettier --write .