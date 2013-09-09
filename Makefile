REPORTER=spec

test: node_modules
	@node_modules/mocha/bin/_mocha \
		--bail \
		--reporter $(REPORTER)

node_modules: package.json
	@npm install
	@npm dedupe
	@touch node_modules

.PHONY: test