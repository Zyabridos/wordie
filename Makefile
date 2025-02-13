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
	cd frontend; npm run dev

p:
	npx prettier --write .