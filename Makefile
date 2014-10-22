run-unit-tests:
	NODE_ENV=test ./node_modules/.bin/mocha --timeout 10000 --reporter dot $(shell find tests/unit -name "*.tests.js")

install-packages:
	npm i
	npm prune
	npm shrinkwrap

test:
	npm prune
	npm outdated --depth=0
	@make run-unit-tests

make travis:
	@make install-packages
	@make test