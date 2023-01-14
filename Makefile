all: install prepare

prepare: db-demo-init 
	cp -n .env.example .env || true

install:
	npm ci

start-production: build start-backend

start-frontend:
	make -C frontend start

start-backend:
	npx nodemon ./bin/server.js

start-debug-backend:
	DEBUG=* npx nodemon ./bin/server.js
	
lint:
	npx eslint .

build:
	npm run build

db-demo-init:
	sudo -u postgres psql < init.sql