Recipe Manager

A web application that allows users to register, log in, and manage cooking recipes (with optional images). Built with Node.js + Express for the backend, MongoDB + Mongoose for persistent storage, and a Vanilla JavaScript (ES6 class) frontend.


Overview

Recipe Manager is designed to demonstrate a complete web development workflow:
    •    Front-End: Uses semantic HTML, CSS, and ES6 JavaScript classes (AuthManager, RecipeManager).
    •    Back-End: Node.js + Express-based RESTful API with proper HTTP methods (GET, POST, DELETE).
    •    Database: MongoDB (via Mongoose) for persistent data storage (avoiding file system writes).

Users can create and delete recipes, each optionally containing a Base64-encoded image, while the system enforces authentication using JWT (JSON Web Tokens).





Flow Chart

Below is a simplified flow chart illustrating how the system works:
[User] 
   |                                      
   | (1) Access the website                                    
   v                                      
[Frontend - index.html] ---> [script.js]
   | (2) Register / Login       (3) Add Recipe
   v                                            
[REST API - routes/auth.js, routes/recipes.js]
   |                                        
   v                                        
[MongoDB] <---- Storing and retrieving data (User, Recipe)

The user opens the main page.
If not logged in, they can register or log in.
Once logged in, they can manage recipes (add or delete).
All requests (GET, POST, DELETE) are sent to the server (Node + Express), which communicates with MongoDB for data storage.





Features
    •    User Authentication: Register new users or log in with existing accounts.
    •    Secure Endpoints: JWT-based authentication for protected routes (e.g., adding/deleting recipes).
    •    Add and View Recipes: Each recipe includes a name, steps, and an optional image.
    •    Delete Recipes: Remove unwanted recipes from your list.
    •    Semantic HTML/CSS: Clear structure adhering to modern standards.
    •    ES6 Class Architecture: Clean, object-oriented code with minimal global variables.



Technologies Used
    •    Node.js + Express – RESTful backend and server management
    •    MongoDB + Mongoose – Data persistence for users and recipes
    •    JWT (jsonwebtoken) – Token-based authentication
    •    HTML5 / CSS3 – Semantic and responsive design (Bootstrap optional)
    •    Vanilla JavaScript (ES6) – Frontend logic (AuthManager & RecipeManager)
    •    bcrypt – Password hashing for secure credential storage
    



Usage
    1.    Register a new user or log in with an existing account.
    2.    Add Recipes:
    •    Provide a recipe name and steps.
    •    (Optional) Choose an image to upload (converted to Base64).
    3.    View or Delete Recipes:
    •    All recipes are displayed in the “Your Recipes” section.
    •    Click “Delete” to remove a recipe.
    4.    JWT Security:
    •    Only authenticated users (with valid tokens) can add or delete recipes.
