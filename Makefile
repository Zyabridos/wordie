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
p:
	npx prettier --write .