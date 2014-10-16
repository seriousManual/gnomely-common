run-unit-tests:
	NODE_ENV=test mocha --timeout 10000 --reporter dot $(shell find tests/unit -name "*.tests.js")

install-packages:
	npm i

test:
	npm prune
	npm outdated --depth=0
	@make run-unit-tests

make travis:
	@make install-packages
	@make test
	@make cover

make deployment:
	make install-packages
	make test