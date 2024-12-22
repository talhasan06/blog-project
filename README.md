# Blog Project

A robust RESTful API for managing blog posts with user authentication and authorization.

## Live Demo

[Live link: Blog Project](https://blog-project-node-tau.vercel.app/)

## Features

- User authentication (Register, Login)
- JWT based authorization with access and refresh tokens
- CRUD operations for blog posts
- User can only modify their own blog posts
- Error handling with proper error messages
- Input validation
- MongoDB database integration

## Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- Bcrypt for password hashing
- Zod for validation
- ESLint & Prettier for code formatting

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository

```
git clone https://github.com/your-username/blog-project.git
```

```
cd blog-project
```

2. Install dependencies

```
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
env:README.md
NODE_ENV=development
PORT=5000
DATABASE_URL=your_mongodb_connection_string
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=7d
```

4. Start the development server

`npm run start-dev`

## API Endpoints

- `POST` https://blog-project-node-tau.vercel.app/api/auth/register - Register a new user
- `POST` https://blog-project-node-tau.vercel.app/api/auth/login - Login user
- `PATCH` https://blog-project-node-tau.vercel.app/api/blogs/:id - update Blog only - user
- `DELETE` https://blog-project-node-tau.vercel.app/api/blogs/:id - Delete a blog

- `GET` https://blog-project-node-tau.vercel.app/api/blogs - Get all blog posts

- `PATCH` https://blog-project-node-tau.vercel.app/api/admin/users/:userId/block - Block a user
- `DELETE` https://blog-project-node-tau.vercel.app/api/admin/blogs/:id - Admin can delete any blog by blogId

## Admin Login

```
{
    "email": "tamim@gmail.com",
    "password": "password1234"
}
```

# Request & Response Examples

### 1. Register User

#### POST

`https://blog-project-node-tau.vercel.app/api/auth/register`

#### Description:

Registers a new user with the platform. It validates user data and saves it to the database.

#### Request Body:

```
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

### 2. Login User

#### POST

`https://blog-project-node-tau.vercel.app/api/auth/login`

#### Description:

Login with your created username and password

#### Request Body:

```
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

### 3. Update a Blog

#### PATCH

`https://blog-project-node-tau.vercel.app/api/blogs/:id`

#### Description:

To update a blog you must need to login with your normal email admin can't do it.

#### Request Body:

```
{
  "title": "Updated Blog Title",
  "content": "Updated content."
}
```

### 4. Delete a Blog

#### DELETE

`https://blog-project-node-tau.vercel.app/api/blogs/:id`

#### Description:

by using this url user can only delete his/her own blog not others

### 5. Get All Blogs (Public)

#### GET

`https://blog-project-node-tau.vercel.app/api/blogs`

#### Description:

Public for all to fetch all blogs with options for searching, sorting, and filtering.

#### Query Parameters:

- search: Search blogs by title or content (e.g., search=blogtitle).
- sortBy: Sort blogs by specific fields such as createdAt or title (e.g., sortBy=title).
- sortOrder: Defines the sorting order. Accepts values asc (ascending) or desc (descending). (e.g., sortOrder=desc).
- filter: Filter blogs by author ID (e.g., author=authorId).

#### Example Request URL:

```
https://blog-project-node-tau.vercel.app/api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=60b8f42f9c2a3c9b7cbd4f18
```

### 6. Admin actions

#### PATCH

`https://blog-project-node-tau.vercel.app/api/admin/users/:userId/block`

#### Description:

Allows an admin to block a user by updating the isBlocked property to true.

### 7. Delete a blog

#### DELETE

`https://blog-project-node-tau.vercel.app/api/admin/blogs/:id`

#### Description:

Allows an admin to delete any blog by its ID.

```
src/
├── app/
│ ├── config/
│ ├── errors/
│ ├── interface/
│ ├── middlewares/
│ ├── modules/
│ │ ├── admin/
│ │ ├── auth/
│ │ ├── blog/
│ │ └── user/
│ └── routes/
│ └── utils/
├── app.ts
└── server.ts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
