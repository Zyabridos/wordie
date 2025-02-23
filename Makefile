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

jest:
	npx jest __tests__

dev:
	npm run dev

build:
	rm -rf dist
	npm run build

p:
	npx prettier --write .