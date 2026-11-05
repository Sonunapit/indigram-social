# 🇮🇳 IndiGram --- Open-Source Hybrid Social Network

IndiGram is a full-stack social networking application designed around
visual sharing and community interaction. It combines an image-based
feed with a foundation for AI-assisted caption generation using Google
GenAI and Groq.

The project is built with **React, Node.js, Express, and MongoDB**, with
ImageKit for cloud media storage.

> **Project status:** The supplied implementation includes
> authentication, protected post APIs, image-upload handling, and an AI
> service layer. Features such as likes, comments, follows, and the
> final AI-caption API should only be marked complete after their
> implementation and routes have been verified.

------------------------------------------------------------------------

## Contents

-   [Highlights](#highlights)
-   [Technology stack](#technology-stack)
-   [Architecture](#architecture)
-   [Project structure](#project-structure)
-   [Getting started](#getting-started)
-   [Environment variables](#environment-variables)
-   [Running locally](#running-locally)
-   [API documentation](#api-documentation)
-   [Image upload flow](#image-upload-flow)
-   [AI integration](#ai-integration)
-   [Security notes](#security-notes)
-   [Troubleshooting](#troubleshooting)
-   [Roadmap](#roadmap)
-   [Contributing](#contributing)
-   [License](#license)

------------------------------------------------------------------------

## Highlights

### Implemented in the supplied code

-   **User registration and login** with password hashing using
    `bcryptjs`.
-   **JWT authentication** and protected API routes.
-   **Current-user endpoint** to retrieve the authenticated user's
    profile.
-   **Image upload endpoint** using Multer memory storage, with a 5 MB
    limit and image MIME-type filtering.
-   **Post creation and feed retrieval** through protected post routes.
-   **Cloud media and AI service foundations** using ImageKit, Google
    GenAI, and Groq SDK packages.
-   **React frontend structure** with authentication context, login,
    registration, feed, and reusable components.

### Planned / verify before claiming as complete

-   Likes, comments, follow/unfollow, and user profile pages.
-   Feed pagination, search, and sorting.
-   AI caption and hashtag generation exposed through a documented API
    route.
-   Notifications and real-time interactions.
-   Automated tests and deployment.

------------------------------------------------------------------------

## Technology stack

  Layer             Technologies
  ----------------- --------------------------------
  Frontend          React 19, Vite
  Routing           React Router DOM
  HTTP requests     Axios
  Styling           Tailwind CSS
  Animation         Framer Motion, GSAP
  Icons             Lucide React
  Backend           Node.js, Express 5
  Database          MongoDB, Mongoose
  Authentication    JSON Web Token (JWT), bcryptjs
  Upload handling   Multer
  Media storage     ImageKit
  AI SDKs           Google GenAI, Groq SDK

------------------------------------------------------------------------

## Architecture

``` text
Browser
  |
  v
React + Vite frontend
  |
  | Axios / HTTP requests
  v
Express REST API
  |
  +---- Authentication middleware
  |        |
  |        +---- JWT verification
  |
  +---- Controllers
  |        |
  |        +---- Auth controller
  |        +---- Post controller
  |
  +---- Services
  |        |
  |        +---- AI service layer
  |
  +---- Mongoose models
  |        |
  |        +---- MongoDB
  |
  +---- Multer upload handling
           |
           +---- ImageKit cloud storage
```

------------------------------------------------------------------------

## Project structure

``` text
indigram-social/
│
├── Backend/
│   ├── src/
│   │   ├── controller/
│   │   │   ├── auth.controller.js
│   │   │   └── post.controller.js
│   │   │
│   │   ├── db/
│   │   │   └── db.js
│   │   │
│   │   ├── middlewares/
│   │   │   └── auth.middleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── post.model.js
│   │   │   └── user.model.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── post.routes.js
│   │   │
│   │   ├── services/
│   │   │   └── ai.services.js
│   │   │
│   │   └── app.js
│   │
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthLayout.jsx
│   │   │   ├── PostCard.jsx
│   │   │   └── UploadModal.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Feed.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
└── README.md
```

> Keep directory and file names consistent with the actual repository.
> For example, use `auth.controller.js` only if that is the real
> filename.

------------------------------------------------------------------------

## Getting started

### Prerequisites

Install the following before running the project:

-   Node.js 18 or later (use a currently supported LTS release).
-   npm.
-   MongoDB local instance or MongoDB Atlas database.
-   ImageKit account and API credentials for cloud image uploads.
-   Google GenAI and/or Groq API credentials if the AI service is
    enabled.

### 1. Clone the repository

``` bash
git clone https://github.com/YOUR_USERNAME/indigram-social.git
cd indigram-social
```

Replace `YOUR_USERNAME` with your GitHub username and update the
repository URL if your repository has a different name.

### 2. Install backend dependencies

``` bash
cd Backend
npm install
```

### 3. Configure backend environment variables

Create a `.env` file inside the `Backend` directory. Add the variables
listed in the [Environment variables](#environment-variables) section.

### 4. Start the backend

The supplied backend package configuration does not show a start script.
From the `Backend` directory, run:

``` bash
node server.js
```

The API is configured to use port `3000` in the supplied environment
example.

### 5. Install frontend dependencies

Open a second terminal:

``` bash
cd frontend
npm install
```

### 6. Start the frontend

``` bash
npm run dev
```

Vite will print the local frontend URL in the terminal, commonly:

``` text
http://localhost:5173
```

Keep the backend and frontend terminals running while testing the
application.

------------------------------------------------------------------------

## Environment variables

Create `Backend/.env`:

``` env
PORT=3000

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_long_random_secret

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

GEMINI_API_KEY=your_google_genai_api_key
GROQ_API_KEY=your_groq_api_key
```

  Variable                  Purpose
  ------------------------- -------------------------------------
  `PORT`                    Backend server port
  `MONGO_URI`               MongoDB connection string
  `JWT_SECRET`              Secret used to sign and verify JWTs
  `IMAGEKIT_PUBLIC_KEY`     ImageKit public key
  `IMAGEKIT_PRIVATE_KEY`    ImageKit private key
  `IMAGEKIT_URL_ENDPOINT`   ImageKit media URL endpoint
  `GEMINI_API_KEY`          Google GenAI API key
  `GROQ_API_KEY`            Groq API key

**Important:** Never commit real credentials. Add `.env` to `.gitignore`
and commit a safe `.env.example` containing placeholder values instead.

------------------------------------------------------------------------

## API documentation

Base URL for local development:

``` text
http://localhost:3000
```

The following endpoints are visible in the supplied route code and
API-testing screenshots.

### Authentication

  ------------------------------------------------------------------------
  Method            Endpoint           Authentication    Purpose
  ----------------- ------------------ ----------------- -----------------
  POST              `/auth/register`   No                Register a user

  POST              `/auth/login`      No                Log in a user

  GET               `/auth/me`         Yes               Get the current
                                                         user

  POST              `/auth/logout`     No explicit       Clear the token
                                       middleware shown  cookie
  ------------------------------------------------------------------------

#### Register

**Request**

``` http
POST /auth/register
Content-Type: application/json
```

``` json
{
  "username": "test_username",
  "password": "use_a_strong_password"
}
```

The exact success response depends on the controller implementation.

#### Login

**Request**

``` http
POST /auth/login
Content-Type: application/json
```

``` json
{
  "username": "test_username",
  "password": "use_the_registered_password"
}
```

The supplied API test shows a successful response containing a message
and user details. The login controller should also set the
authentication cookie if the frontend relies on cookie-based
authentication.

#### Get current user

**Request**

``` http
GET /auth/me
```

Requires a valid authentication cookie/token accepted by
`auth.middleware.js`.

The route removes the password field before returning the user object.

#### Logout

**Request**

``` http
POST /auth/logout
```

The supplied route clears the `token` cookie and returns a logout
message.

### Posts

  Method   Endpoint       Authentication   Purpose
  -------- -------------- ---------------- -----------------------------
  GET      `/api/posts`   Yes              Retrieve posts
  POST     `/api/posts`   Yes              Create a post with an image

#### Create a post

**Request**

``` http
POST /api/posts
Content-Type: multipart/form-data
```

Form-data:

  Key       Type   Value
  --------- ------ ----------------------
  `image`   File   Select an image file

The upload middleware:

-   Uses Multer memory storage.
-   Accepts image MIME types.
-   Limits file size to 5 MB.
-   Expects the multipart field name `image`.

The controller is responsible for processing the uploaded file and
creating the post.

#### Get posts

**Request**

``` http
GET /api/posts
```

Requires authentication according to the supplied route definition.

> The exact response schema, pagination parameters, post fields, and
> error codes should be documented after checking `post.controller.js`
> and the Mongoose models.

------------------------------------------------------------------------

## Image upload flow

``` text
User selects an image
        |
        v
Frontend sends multipart/form-data
        |
        v
Express post route
        |
        v
JWT authentication middleware
        |
        v
Multer validates image and file size
        |
        v
Post controller
        |
        v
ImageKit cloud upload
        |
        v
Post metadata saved in MongoDB
        |
        v
Feed displays the post
```

This describes the intended integration flow. Verify the controller
implementation to confirm each step is currently connected.

------------------------------------------------------------------------

## AI integration

The backend includes an AI service file:

``` text
Backend/src/services/ai.services.js
```

The dependencies include:

-   `@google/genai` --- Google GenAI SDK.
-   `groq-sdk` --- Groq SDK.

The intended feature is to help users generate relevant captions and
hashtags for their posts.

A recommended user flow:

1.  User selects or uploads an image.
2.  User requests an AI caption.
3.  Backend calls the configured AI provider.
4.  The generated caption and hashtags are returned to the frontend.
5.  User reviews and edits the suggestion before publishing.

**Note:** The supplied material does not show the AI route, controller,
request format, or response format. Add those details here after
verifying the implementation. Keep API keys on the backend; never expose
them in frontend code.

------------------------------------------------------------------------

## Security notes

-   Hash passwords with `bcryptjs`; never store plain-text passwords.
-   Keep JWT secrets and third-party API keys in environment variables.
-   Protect private endpoints with authentication middleware.
-   Use HttpOnly cookies for authentication where appropriate.
-   Configure CORS with the exact frontend origin and credentials
    support when using cookies.
-   Configure cookie `SameSite`, `Secure`, and expiration settings
    appropriately for local development and production.
-   Validate usernames, passwords, post data, and uploaded files on the
    server.
-   Do not trust file extensions alone; validate actual file content
    where practical.
-   Add rate limiting to authentication and AI endpoints.
-   Return safe error messages; do not expose secrets or internal stack
    traces.
-   Add `.env`, `node_modules`, and build output directories to
    `.gitignore`.

------------------------------------------------------------------------

## Troubleshooting

  -----------------------------------------------------------------------
  Problem                             What to check
  ----------------------------------- -----------------------------------
  Backend does not start              Check Node.js version,
                                      dependencies, `.env`, and MongoDB
                                      connection

  MongoDB connection fails            Verify `MONGO_URI`, database
                                      access, and network permissions

  Login works but protected routes    Check JWT creation, cookie name,
  fail                                middleware verification, and
                                      browser cookie settings

  Frontend cannot access backend      Check API base URL, CORS origin,
                                      and credentials configuration

  Image upload fails                  Check multipart field name `image`,
                                      file type, 5 MB limit, and ImageKit
                                      credentials

  AI caption request fails            Check provider API key, SDK setup,
                                      service error handling, and
                                      provider limits
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## Roadmap

The following are suggested improvements, not claims that these features
are already implemented.

-   [ ] Complete AI caption and hashtag API integration.
-   [ ] Add likes and comments.
-   [ ] Add follow/unfollow functionality.
-   [ ] Build individual user profile pages.
-   [ ] Add feed pagination and infinite scrolling.
-   [ ] Add search for users and posts.
-   [ ] Add notifications.
-   [ ] Add image optimization and upload progress.
-   [ ] Add server-side validation and centralized error handling.
-   [ ] Add unit and integration tests.
-   [ ] Add Docker support and CI/CD.
-   [ ] Deploy the frontend, backend, and database.

------------------------------------------------------------------------

## Contributing

Contributions, bug reports, and feature suggestions are welcome.

1.  Fork the repository.
2.  Create a feature branch.
3.  Make your changes.
4.  Test the affected functionality.
5.  Open a pull request with a clear description.

------------------------------------------------------------------------

## License

This project is intended to be released under the **MIT License**. Add a
`LICENSE` file containing the full MIT license text before publishing
the repository with an MIT license badge.

------------------------------------------------------------------------

## Author

**Sonu Kumar Napit**

Full-Stack Developer \| Building IndiGram

------------------------------------------------------------------------

```{=html}
<p align="center">
```
Built with React, Node.js, Express, MongoDB, and AI.
```{=html}
</p>
```
