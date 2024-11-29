# Project Overview

A test project using Next.js, React, and Prisma to create a product listing page with add-to-cart functionality and checkout.

## Technologies Used

- **TypeScript**
- **Next.js**
- **Tailwind CSS**
- **Prisma**
- **MariaDB**
- **DDEV**
- **Docker**

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

1. **Download and Install Docker Desktop**: [Docker Desktop](https://www.docker.com/products/docker-desktop)
2. **Download and Install DDEV**: [DDEV](https://ddev.readthedocs.io/en/stable/#installation)

### Steps to Run the Project

1. **Clone the Repository**:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Edit the `.env.local` and `.env` Files**:
    - Copy the `.env.example` file to `.env.local` and `.env`
    - Update the database connection string and other environment variables as needed

3. **Use Node Version Manager (NVM)**:
    ```sh
    nvm use
    ```

4. **Install Dependencies**:
    ```sh
    npm install
    ```

5. **Start DDEV**:
    ```sh
    ddev start
    ```

6. **Run Prisma Migrations**:
    ```sh
    npx prisma migrate dev --name init
    ```

7. **Generate Prisma Client**:
    ```sh
    npx prisma generate
    ```

8. **Run the Development Server**:
    ```sh
    npm run dev
    ```

Your project should now be running locally. Open your browser and navigate to `http://localhost:3000` to see the application in action.