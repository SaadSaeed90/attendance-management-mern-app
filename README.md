## Getting Started

To get started with the MERN app locally, follow these steps:

1. Clone the repository:

```bash
   git clone https://github.com/SaadSaeed90/attendance-management-mern-app
   cd attendance-management-mern-app
```

Install the required dependencies:

```
cd backend
npm install
cd ..
cd frontend
npm install
```

To run the code:

```
In backend folder:
npm start
In frontend folder:
npm run dev
```

# Create `config.env` in the `./backend` Directory and Add These Variables:

```env
DATABASE="MongoDb Database URL"
DATABASE_PASSWORD="Database Password"
PORT=8000
NODE_ENV="development"
JWT_SECRET="Your Secret"
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
```

# Note:

Create a admin account before hand by using postman by running the post request on /api/v1/user and pass this as body:
{
"name": "Admin",
"email": "root@example.com",
"password": "rootadmin123",
"passwordConfirm": "rootadmin123",
"role": "admin"
}

Also create a grading entry in database so the grading page in admin portal can be used. Just run the post request on /api/v1/grading
with passing anything in the body. Copy the id of that grading entry and paste it into the ID variable in ./frontend/src/features/Admin/GradingSystem.

Lastly, run either login or student portal at one browser or use incognito to run the other portal.

# Links

Student portal: localhost:8000/
Admin portal: localhost:8000/admin
