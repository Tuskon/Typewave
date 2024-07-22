# Welcome to the project Typewave Mania👋

## Let's start run the project

Before we begin, you will need to have Node.js and Android SKD installed on your machine, have an Apache server running, have a Expo application installed at your smartphone or on your virtual device and a SQL database manager

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

After all these steps and you start running the app, go to the app's settings page and add at least ten words. That's it, enjoy the game now
