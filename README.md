# Welcome to the project Typewave Mania👋

## Let's start run the project

Before we begin, you will need to have Node.js installed on your machine, have an Apache server running and a SQL database manager

1. Install dependencies

```bash
npm install
```

2. Install dependencies on the backend folder and start the database
   
```bash
cd backend
npm install
npx sequelize-cli db:create
npx sequelize-cli db:migrate

```

3. Got to the config.js on the path "backend/config" and put your local ip on the "urlRootRoute"

```bash
cd backend/config
```

4. Start the backend 

```bash
npm start
```

5. Start the app

```bash
npx expo start
```
