# Blog Management System

This project is a Blog Management System built using Next.js with TypeScript. It integrates with the JSONPlaceholder API to handle blog-related data and uses `next-auth` for Google authentication.

## Features

- **List Posts:** Fetch and display a list of posts from JSONPlaceholder.
- **View Post Details:** Display details of a post, including comments and author information.
- **Add a Post:** Create a form to submit a new post (simulation only).
- **Google Authentication:** Users can sign in with their Google account.
- **Responsive Design:** Ensures the application works on various devices.
- **Server-Side Rendering:** Utilizes Next.js's SSR for better SEO and performance.
- **Type-Safe:** TypeScript is used across the project for type safety.
- **Testing:** Unit and integration tests using Jest and React Testing Library.

## Technologies Used

- **Next.js** - A React framework for production
- **TypeScript** - Type-safe JavaScript
- **fetch API** - For data fetching
- **Tailwind CSS** - A utility-first CSS framework for styling
- **next-auth** - Authentication library for Next.js
- **Jest** - Testing framework
- **React Testing Library** - Testing utilities for React components

## Getting Started

### Prerequisites

- Node.js (v20.x or higher)
- npm or yarn
- Google Cloud project for OAuth 2.0 credentials

### Installation

1. Clone the repository

   ```bash
   $ git clone https://github.com/BenSmile/blog.git
   cd blog-management
   ```

2. Move to the directory

   ```
   $ cd blog
   ```

3. Install dependancies

   ```
   $ npm install
   ```

4. Create `.env` file as below

   ```
   GOOGLE_ID=XXXXXXX-XXXXXXXXXX.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=XXXXX-XXXXXXXXXXX
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_URL_INTERNAL=http://localhost:3000
   NEXTAUTH_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

5. Run the app

   ```
   npm run dev
   ```

6. Testing

   ```
   npm test
   ```
