install:
	npm ci

start-production: build start-backend

start-frontend:
	make -C frontend start

start-backend:
	npx nodemon ./bin/server.js

start-debug-backend:
	DEBUG=* npx nodemon ./bin/server.js
	
lint-frontend:
	make -C frontend lint

build:
	npm run build