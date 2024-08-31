# NodeJs Blog
<p align= "center">
    <img width="1440" alt="Screenshot 2024-08-31 at 9 29 03 PM" src="https://github.com/user-attachments/assets/627f33ac-3499-4f96-a565-306ccfa10ea4">
</p>
Welcome to the **NodeJs Blog** repository! This project is a simple yet powerful blogging platform built using Node.js, Express, MongoDB, and EJS. It allows users to create, view, edit, and manage blog posts. The platform also includes an admin dashboard for managing content and offers standard static pages like About and Contact.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [File Structure](#file-structure)
    - [Views](#views)
    - [Public](#public)
    - [Server](#server)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Authentication](#authentication)
7. [Final View](#final-view)
8. [Contributing](#contributing)

## Project Overview

The NodeJs Blog platform is designed for simplicity and ease of use. It's perfect for anyone looking to set up a quick and efficient blog. The backend is built with Node.js and Express, with MongoDB handling data storage. EJS is used as the templating engine to render dynamic content on the frontend.

### Main Features:
- **Post Creation & Viewing:** Users can view blog posts on the homepage, and admins can create new posts.
- **Static Pages:** Includes an About page and a Contact page for additional site information.
- **Admin Dashboard:** Admins can log in to access a dashboard where they can manage all blog posts, including creating, editing, and deleting posts.
- **Secure Authentication:** Admin sessions are managed securely with a token-based authentication system and cookies.

## File Structure

The project is organized into several key directories and files:

```
nodejs-blog/
├── views/
│   ├── admin/
│   │   ├── add-post.ejs
│   │   ├── dashboard.ejs
│   │   ├── edit-post.ejs
│   │   └── index.ejs
│   ├── layouts/
│   │   ├── main.ejs
│   │   └── admin.ejs
│   ├── partials/
│   │   ├── footer.ejs
│   │   ├── header_admin.ejs
│   │   ├── header.ejs
│   │   └── search.ejs
│   ├── about.ejs
│   ├── contact.ejs
│   ├── home.ejs
│   ├── post.ejs
│   └── search.ejs
├── public/
│   ├── css/
│   │   └── style.css
│   ├── images/
│   │   ├── Blog-logo.png
│   │   ├── Hero Images.png
│   │   ├── img-noise-361x370.png
│   │   ├── instagram-logo.png
│   │   ├── Linkedin-logo.png
│   │   ├── search.png
│   │   └── X-logo.png
│   └── js/
│       └── script.js
├── server/
│   ├── config/
│   │   └── MongoDB.js
│   ├── helpers/
│   │   └── routeHelpers.js
│   ├── models/
│   │   ├── Post.js
│   │   └── User.js
│   └── routes/
│       ├── admin.js
│       └── main.js
```

## Installation

To get started with the NodeJs Blog, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/nodejs-blog.git
   cd nodejs-blog
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up your MongoDB connection:**
   - Update the MongoDB connection details in `config/MongoDB.js`.

4. **Start the application:**
   ```bash
   npm run start
   ```

## Usage

- **Homepage:** View all blog posts available on the platform.
- **Admin Access:** Admins can log in to the dashboard to create, edit, or delete blog posts.
- **Static Pages:** Learn more about the blog on the About page or reach out via the Contact page.

## Authentication

The application employs a secure token-based authentication system that utilizes cookies to manage admin sessions. Here’s how it works:

- **Login Process:** When an admin logs in, a token is generated and stored as a cookie in the admin's browser. This token authenticates the admin and grants access to the dashboard and other restricted functionalities.
- **Session Management:** The token in the cookie is checked on each request to ensure that the user is authenticated. If the token is valid, the user is allowed access to admin features; if not, they are redirected to the login page.
- **Security:** The use of tokens and cookies ensures that only authenticated users can manage the blog's content, adding an essential layer of security to the platform.

## Final View
<h4>
    Latest Post Page
</h4>
<p align = "center">
    <img width="1437" alt="Screenshot 2024-08-31 at 9 29 13 PM" src="https://github.com/user-attachments/assets/57a4baab-c17b-4212-91fc-e4cec272685f">
</p>

## Contributing

Contributions are always welcome! If you'd like to contribute to the project, please fork the repository and submit a pull request with your changes.

---
