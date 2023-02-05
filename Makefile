.PHONY: dist test
default: help
dev:
	npm run dev

dist:
	npm run build

help:
	@echo "    make dev [npm run dev] 开发模式"
	@echo "    make dist [npm run build] 编译模式"
