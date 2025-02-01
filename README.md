# JavaScript-api-authentication-login-register
JavaScript restpul api authentication login-register - single role

Tech Stack :
- Backend : Node.js, Express.js
- Database : Mysql
- Authentication : JWT (Json Web Token)
- Hash password : bcrypt
- Api Documentation : Swagger

how to install and running app :
- clone my repo "https://github.com/insinyurBackend/JavaScript-api-authentication-login-register.git"
- Active your database mysql
- creat new database in phpmyadmin named "authentication"
- export file database at folder JavaScript-api-authentication-login-register/src/config/database/authentication.sql
- create file .env at JavaScript-api-authentication-login-register, input
  APP_PORT=port
  DB_NAME=database name
  DB_USERNAME=database username
  DB_PASSWORD=database password
  ACCESS_TOKEN_SECRET=random string
  REFRESH_TOKEN_SECRET=random string
- open folder JavaScript-api-authentication-login-register with terminal input "npm install"
- run app "npm run dev"
