# Blog API

A RESTful blog API built with Node.js, Express, and PostgreSQL.

## Features
- JWT Authentication (signup, login)
- Create, edit, delete blog posts (draft/published)
- Comment on posts and reply to comments
- Role based access — user vs admin
- Ownership checks — users can only edit their own content

## Tech Stack
- Node.js + Express
- PostgreSQL
- JWT + bcrypt

## API Routes

### Auth
POST /auth/signup
POST /auth/login

### Posts
GET    /posts
GET    /posts/:id
POST   /posts
PATCH  /posts/:id
DELETE /posts/:id

### Comments
GET    /posts/:id/comments
POST   /posts/:id/comments
POST   /comments/:id/replies
DELETE /comments/:id

## Setup
1. Clone the repo
2. Run `npm install`
3. Create `.env` file with DB and JWT config
4. Create PostgreSQL database and run the schema
5. Run `node server.js`
