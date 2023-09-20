# Drag and Drop Image  Gallery Application

This web application allows users login, drag and drop images to rearrange them, and search for images by tags.

## Table of Contents

- [Demo](#demo)
- [Installation](#installation)
- [API Integration](#api-integration)
- [Running the app](#app-running)
- [Usage](#usage)
- [Error Handling](#error-handling)
- [Contributing](#contributing)

## Demo

You can access the live demo of the DND Galleria App [here](https://dnd-galleria.netlify.app/).


## Installation

Follow these steps to set up the App locally:

1. Clone the repository to your local machine:

```
git clone https://github.com/elijaharhinful/hng-ftd-pjt3-image-gallery-app.git
```
2. Navigate to parent directory:

```
cd hng-ftd-pjt3-image-gallery-app
```
3. Install the required dependencies:

```
npm install
```

## Firebase Authentication

1. Obtain your firebaseConfig details from your firebase console.

2. Create a .env file in your root directory and update it with these details VITE_apiKey,VITE_authDomain,VITE_projectId,VITE_storageBucket,VITE_messagingSenderId,VITE_appId,VITE_measurementId.

the firebaseConfig object in your firebase.jsx file should look like this
```
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  ...
}
```

## Usage

To run the application locally using npm, follow these steps:
You should have installed the dependencies for the project by this point. if not run 
```
npm install
``` 
to install them.

1. Run:
```
npm run dev
```
to run the app locally

2. Open your web browser and visit [http://localhost:$(port)](http://localhost:$(port)) to access the App.


## Error Handling

The application includes error handling to provide users with meaningful error messages in case of failures or other issues. Error messages are displayed to users.

## Contributing

Contributions to this project are welcome. If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name` or `git checkout -b bugfix/your-bug-fix`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Create a pull request detailing your changes.

