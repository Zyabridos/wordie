install:
	npm ci
	
publish:
	npm publish --dry-run

lint:
	npx eslint .

play:
	node src/index.js

test:
	npx mocha __tests__/wordie.test.js

dev:
	cd frontend; npm run dev

p:
	npx prettier --write .