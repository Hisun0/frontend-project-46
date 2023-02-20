gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run

test:
	npm test
lint:
	npx eslint .

fix:
	npx eslint --fix .

install:
	npm ci

test-coverage:
	npm test -- --coverage --coverageProvider=v8