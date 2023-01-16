all: install prepare

prepare: db-demo-init 
	cp -n .env.example .env || true

db-demo-init:
	sudo -u postgres psql < init.sql
	
install:
	npm ci
	make -C frontend install

start-backend: build
	NODE_ENV=development npx nodemon ./bin/server.js

start-production: build 
	NODE_ENV=production npx nodemon ./bin/server.js

start-frontend:
	make -C frontend start

test:
	NODE_OPTIONS=--experimental-vm-modules DEBUG=feedback npx jest

lint:
	npx eslint --ext .jsx,.js .

debug:
	DEBUG=* npx nodemon ./bin/server.js

build:
	npm run build
