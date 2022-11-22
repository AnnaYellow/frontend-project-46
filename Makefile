install:
	npm ci

publish:
	npm publish --dry-run

test: 
	NODE_OPTIONS=--experimental-vm-modules npx jest

gendiff:
	node src/genDiff.js

lint:
	npx eslint .

test-coverage


	



