install:
	npm ci

start-server: build start-backend

start-frontend:
	make -C frontend start

start-backend:
	npx nodemon ./bin/server.js
	# DEBUG=*
	
lint-frontend:
	make -C frontend lint

build:
	npm run build