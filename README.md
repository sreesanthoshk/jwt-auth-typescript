# JWT Authentication System

## Overview

A JWT Authentication System built using:

* TypeScript
* Node.js
* Express.js
* MySQL
* JWT (JSON Web Token)
* bcryptjs

## Features

* User Registration
* User Login
* Password Hashing
* JWT Generation
* JWT Verification
* Protected Routes
* MySQL Database Integration

## Project Structure

src/

* config
* controllers
* middleware
* models
* services
* utils

frontend/

* login.html
* dashboard.html
* app.js
* style.css

## Run Project

Install dependencies:

npm install

Start server:

npx ts-node src/server.ts

## API Endpoints

POST /api/auth/register

POST /api/auth/login

GET /api/profile

## Authentication Flow

User Login → JWT Generated → Token Stored → Protected Route Access → JWT Verification
