class AuthManager {
  constructor() {
    this.token = null;
    this.registerForm = document.getElementById("register-form");
    this.loginForm = document.getElementById("login-form");

    this.init();
  }

  init() {

    this.registerForm.addEventListener("submit", (e) => this.handleRegister(e));

    this.loginForm.addEventListener("submit", (e) => this.handleLogin(e));
  }

  async handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById("reg-username").value;
    const password = document.getElementById("reg-password").value;

    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      if (!response.ok) {
        alert("Registration failed: " + (result.error || "Unknown error"));
        return;
      }

      alert("User registered successfully. You can now login.");
      this.registerForm.reset();
    } catch (error) {
      console.error("Error registering:", error);
    }
  }

  async handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert("Login failed: " + (data.error || "Unknown error"));
        return;
      }


      this.token = data.token;
      alert("Login successful!");


      document.getElementById("auth-section").classList.add("hidden");
      document.getElementById("recipe-manager").classList.remove("hidden");


      const loginEvent = new CustomEvent("userLoggedIn", {
        detail: { token: this.token },
      });
      document.dispatchEvent(loginEvent);

      this.loginForm.reset();
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }
}

class RecipeManager {
  constructor() {
    this.apiUrl = "/recipes";
    this.container = document.getElementById("recipes-container");
    this.form = document.getElementById("recipe-form");
    this.token = null;

    this.init();
  }

  init() {

    this.form.addEventListener("submit", (e) => this.addRecipe(e));


    document.addEventListener("userLoggedIn", (e) => {
      this.token = e.detail.token;
      this.fetchRecipes();
    });
  }

  async fetchRecipes() {
    try {

      const response = await fetch(this.apiUrl);
      const recipes = await response.json();
      this.renderRecipes(recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }

  renderRecipes(recipes) {
    this.container.innerHTML = "";
    recipes.forEach((recipe) => {
      this.renderSingleRecipe(recipe);
    });
  }

  renderSingleRecipe(recipe) {
    const card = document.createElement("div");
    card.classList.add("recipe-card");


    let imageHtml = recipe.image
      ? `<img src="${recipe.image}" alt="Recipe Image" />`
      : "";

    card.innerHTML = `
      ${imageHtml}
      <h3>${recipe.name}</h3>
      <p>${recipe.steps}</p>
      ${
        this.token
          ? `<button data-id="${recipe._id}">Delete</button>`
          : ""
      }
    `;

    const deleteBtn = card.querySelector("button");
    if (deleteBtn) {
      deleteBtn.addEventListener("click", () => this.deleteRecipe(recipe._id));
    }

    this.container.appendChild(card);
  }

  async addRecipe(e) {
    e.preventDefault();
    if (!this.token) {
      alert("You must be logged in to add recipes.");
      return;
    }

    const name = document.getElementById("recipe-name").value;
    const steps = document.getElementById("recipe-steps").value;
    const imageFile = document.getElementById("recipe-image").files[0];

    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result; 
        await this.sendRecipeData(name, steps, base64Image);
      };
      reader.readAsDataURL(imageFile);
    } else {
      await this.sendRecipeData(name, steps, "");
    }
  }

  async sendRecipeData(name, steps, image) {
    try {
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({ name, steps, image }),
      });

      if (!response.ok) {
        alert("Error adding recipe");
        return;
      }

      const newRecipe = await response.json();
      alert(`Recipe '${newRecipe.name}' added successfully!`);
      this.form.reset();


      this.renderSingleRecipe(newRecipe);

    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  }

  async deleteRecipe(id) {
    if (!this.token) {
      alert("You must be logged in to delete recipes.");
      return;
    }

    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      if (!response.ok) {
        alert("Error deleting recipe");
        return;
      }

      alert("Recipe deleted");

      this.fetchRecipes();
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new AuthManager();
  new RecipeManager();
});