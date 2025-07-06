# My Recipe App (React Native Frontend + Node.js Backend)

This is a full-stack mobile recipe application built with React Native for the frontend and Node.js (Express) with MongoDB for the backend. It allows users to view, add, edit, and delete recipes.

## Features

* **Recipe Listing:** Browse a list of all available recipes.
* **Recipe Details:** View detailed information for each recipe (ingredients, instructions, cooking time, servings).
* **Add New Recipe:** Create and save new recipes.
* **Edit Existing Recipe:** Update details of any recipe.
* **Delete Recipe:** Remove recipes from the database.
* **Search Functionality:** Filter recipes by title.
* **Image Support:** Display recipe images from external URLs.

## Technologies Used

### Frontend (React Native)
* **Framework:** React Native with Expo
* **Navigation:** React Navigation
* **Icons:** `@expo/vector-icons` (MaterialIcons)
* **Styling:** StyleSheet API
* **API Calls:** `fetch` or `axios` (implicitly using `fetch` in `recipeService.js`)

### Backend (Node.js API)
* **Runtime:** Node.js
* **Web Framework:** Express.js
* **Database:** MongoDB (via Mongoose ODM)
* **Environment Variables:** `dotenv`
* **CORS:** `cors` middleware

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:
* Node.js (LTS version recommended)
* npm (comes with Node.js) or Yarn
* Expo CLI (`npm install -g expo-cli`)
* MongoDB (local instance or MongoDB Atlas account)
* Git

### 1. Clone the Repositories

First, clone both the frontend and backend repositories to your local machine.
### Clone Frontend

```bash
git clone [https://github.com/YourUsername/my-recipe-app-frontend.git](https://github.com/YourUsername/my-recipe-app-frontend.git)
cd my-recipe-app-frontend
```

### Clone Backend
```bash
git clone [https://github.com/YourUsername/my-recipe-app-backend.git](https://github.com/YourUsername/my-recipe-app-backend.git)
cd my-recipe-app-backend
```
### 2. Backend Setup
1. **Navigate to the backend directory:**

```Bash
cd ../my-recipe-app-backend
```
2. **Install dependencies:**

```Bash
npm install
```
3. **Create a `.env file`:** In the root of the `my-recipe-app-backend` directory, create a file named `.env` and add your MongoDB connection string:
```
DB_URI=your_mongodb_connection_string_here
```
(Replace `your_mongodb_connection_string_here` with your MongoDB Atlas connection URI, e.g., `mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/recipes?retryWrites=true&w=majority`)

4. **Start the backend server:**

Bash
```bash
npm start
Or: node server.js
```
The backend API should now be running on `http://localhost:5001`.

### 3. Frontend Setup
1. **Navigate to the frontend directory:**

```Bash
cd ../my-recipe-app-frontend
```
2. **Install dependencies:**

```Bash
npm install
```
3. **Update API Base URL:** Open `services/recipeService.js` and ensure API_BASE_URL points to your backend:

- For local development: `const API_BASE_URL = 'http://localhost:5001/api'`;

- **For deployed backend:** If you have deployed your backend (e.g., on Render.com), update this to your deployed backend's URL:

```Bash
const API_BASE_URL = '[https://your-deployed-backend-url.onrender.com/api](https://your-deployed-backend-url.onrender.com/api)'; 
```

(Replace `https://your-deployed-backend-url.onrender.com` with the actual URL from Render.com)

4. **Start the Expo development server:**
```Bash
npx expo start
```
5. **Run the app:**

- Scan the QR code with the Expo Go app on your physical device.

- Press a to run on an Android emulator.

- Press i to run on an iOS simulator.

- Press w to run on a web browser (requires react-native-web to be configured, which Expo usually does).

### Deployment
- This application is designed for full-stack deployment.

- **Backend Deployment:** The Node.js API can be deployed on a platform like Render.com. Ensure you configure environment variables (like DB_URI) on the hosting platform.

- **Frontend Deployment (Mobile):** For mobile demonstration, the Expo Go app can be used, or a standalone APK/IPA can be built using eas build.

- **Frontend Deployment (Web):** The React Native frontend can be built for web (npx expo export:web) and then deployed to platforms like Vercel or Netlify.

### License
This project is open source and available under the MIT License. (You can add a https://www.google.com/search?q=LICENSE file if you want to specify licensing details)

**Feel free to contribute, report issues, or suggest new features!**

