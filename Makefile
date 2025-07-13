install:
	npm ci

test:
	npm test

lint:
	rm -rf code/coverage coverage
	npx eslint --config eslint.config.js .

lint-fix:
	npx eslint --config eslint.config.js . --fix
