# Project Name
Recipe Box


## Overview
Recipe Box is a full-stack CRUD app for saving, organizing, and discussing recipes. Signed-in users can create recipes with ingredients, step-by-step instructions, cook time, and a category, then edit or delete the recipes they own. Any signed-in user can leave comments on any recipe, but can only delete comments they wrote themselves. Guests can browse recipes and read comments without an account, but cannot create, edit, or delete anything.

## Screenshots

## Technologies Used
1. Node.js
2. Express
3. MongoDB / Mongoose
4. EJS
5. express-session
6. bcrypt


## Getting Started



## User Stories
1. As a user, I can view a list of all recipes.
2. As a user, I can view a single recipe's full details, including ingredients, steps, and comments.
3. As a user, I can create a new recipe with a title, description, ingredients, steps, cook time, and category.
4. As a user, I can edit a recipe I own.
5. As a user, I can delete a recipe I own.
6. As a user, I cannot edit or delete a recipe that belongs to another user.
7. As a user, I can view recipes filtered by category without signing in.
8. As a user, I can read and leave the comments on a recipe.


## Database Design



## Routes

| Method | Route              | Description      |
|--------|--------------------|------------------|
| GET    | /                  | Home page        |
| GET    | recipes            | List all recipes |
| GET    | /recipes/new       | New recipe form  |
| POST   | /recipes           | Create recipe    |
| GET    | /recipes/:rID      | View recipe      |
| GET    | /recipes/:rID/edit | Edit recipe form |
| PUT    | /recipes/:rID      | Update recipe    |
| DELETE | /recipes/:rID      | Delete recipe    |


## Features
1. Session-based authentication with hashed passwords
2. Full CRUD on recipes, scoped to the signed-in owner
3. Comment system open to all signed-in users, with per-comment authorization on delete
4. Recipes organized by category
5. Embedded ingredient and step lists for a clean, single-document recipe view


## Future Enhancements
1. Search recipes by title or ingredient
2. Image upload for recipes

## Credits