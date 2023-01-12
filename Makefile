install:
	npm ci

start-frontend:
	make -C frontend start
	
lint-frontend:
	make -C frontend lint