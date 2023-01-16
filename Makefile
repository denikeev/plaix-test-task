all: install prepare

prepare: db-demo-init 
	cp -n .env.example .env || true

install:
	npm ci

start-production: build 
	NODE_ENV=production npx nodemon ./bin/server.js

start-frontend:
	make -C frontend start

start-backend:
	NODE_ENV=development npx nodemon ./bin/server.js

start-debug-backend:
	DEBUG=* npx nodemon ./bin/server.js

lint:
	npx eslint --ext .jsx,.js .

test:
	NODE_OPTIONS=--experimental-vm-modules DEBUG=feedback npx jest

build:
	npm run build

db-demo-init:
	sudo -u postgres psql < init.sql
	sudo -u postgres psql -d plaix < schema.sql