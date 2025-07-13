install:
	npm ci

test:
	npm test

lint:
	npx eslint --config eslint.config.js .

lint-fix:
	npx eslint . --fix --ignore-pattern coverage
