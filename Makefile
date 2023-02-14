gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .

fix:
	npx eslint --fix .

install:
	npm ci