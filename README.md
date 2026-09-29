# Recipe Box


## Overview
Recipe Box is a full-stack CRUD app for saving, organizing, and discussing recipes. Signed-in users can create recipes with ingredients, step-by-step instructions, cook time, and a category, then edit or delete the recipes they own. Any signed-in user can leave comments on any recipe, but can only delete comments they wrote themselves. Guests can browse recipes and read comments without an account, but cannot create, edit, or delete anything.

## Screenshots
<img src="assets/Screenshot 1.png">
<img src="assets/Screenshot 2.png">
<img src="assets/Screenshot 3.png">

## Technologies Used
1. Node.js
2. Express
3. MongoDB / Mongoose
4. EJS (server-side templates)
5. express-session + connect-mongo (sessions stored in MongoDB)
6. bcrypt (password hashing)
7. Multer + Cloudinary (image uploads)
8. method-override (PUT/DELETE from HTML forms)
9. Notyf (toast notifications)
10. Morgan (request logging)


## User Stories
1. As a user, I can view a list of all recipes.
2. As a user, I can view a single recipe's full details, including ingredients, steps, and comments.
3. As a user, I can create a new recipe with a title, description, ingredients, steps, cook time, and category.
4. As a user, I can edit a recipe I own.
5. As a user, I can delete a recipe I own.
6. As a user, I can filter recipes by category without signing in.
7. As a user, I can read comments on a recipe, and as a signed-in user I can leave, edit, and delete comments.
8. As a user, I can view recipes filtered by category without signing in.
9. As a guest, I can sign up and sign in to unlock creating and commenting.
10. As an admin, I can view all users, grant or revoke admin rights, and delete users.


## Database Design
<img src="assets/Untitled Diagram-Page-3.drawio.png">


## Routes

| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| GET | `/` | Home page | Public |

### Auth (`/auth`)
| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| GET | `/auth/sign-up` | Sign-up form | Public |
| POST | `/auth/sign-up` | Create account | Public |
| GET | `/auth/sign-in` | Sign-in form | Public |
| POST | `/auth/sign-in` | Sign in | Public |
| GET | `/auth/sign-out` | Sign out | Public |

### Recipes (`/recipe`)
| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| GET | `/recipe` | List all recipes (optional `?category=<id>` filter) | Public |
| GET | `/recipe/new` | New recipe form | Signed in |
| POST | `/recipe` | Create recipe (with image upload) | Signed in |
| GET | `/recipe/:rID` | View recipe and comments | Public |
| GET | `/recipe/:rID/update` | Edit recipe form | Signed in |
| PUT | `/recipe/:rID` | Update recipe (with image upload) | Signed in |
| DELETE | `/recipe/:rID` | Delete recipe | Signed in |

### Comments (`/comment`)
| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| POST | `/comment/:rID` | Add a comment to recipe `rID` | Signed in |
| PUT | `/comment/:cID` | Edit comment | Signed in |
| DELETE | `/comment/:cID` | Delete comment | Signed in |

### Admin (`/admin`)
| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| GET | `/admin` | List all users | Admin |
| PUT | `/admin/toggle-admin/:uID` | Grant or revoke admin | Admin |
| PUT | `/admin/delete/:uID` | Delete a user | Admin |



## Features
1. Session-based authentication with hashed passwords
2. Full CRUD on recipes, scoped to the signed-in owner
3. Comment system open to all signed-in users, with per-comment authorization on delete
4. Recipes organized by category
5. Embedded ingredient and step lists for a clean, single-document recipe view


## Future Enhancements
1. Search recipes by title or ingredient
2. Ratings and favorites
