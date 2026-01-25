# Staff Management System


## Features

### Implemented
- /

### Planned
- Authorization, Authentication and Role-based access (ADMIN, USER)
- ADMINS can create, read, update and delete employee data from the database
- ADMINS can create departments and assign employees to them
- ADMINS can create shifts and assign employees to them
- ADMINS can create Tasks and assign employees to them
- USERS can clock in / out
- USERS can call in sick
- USERS can submit holiday requests
- ADMINS can approve or deny holiday requests
- Overtime calculation
- ADMINS can manage where and when employees work in each department
- Dashboard to see all important informations

### Future
- Clocking in / out via. physical RFID chip

## How to start

Clone this repository and navigate to the root directory.

### Local
- Type `docker-compose up -d postgres` to start the database
- Add application-local.yml to `backend/src/main/resources/` 
- Fill in the values 'url', 'username' and 'password' for datasource
- Type `./mvnw spring-boot:run -Dspring-boot.run.profiles=local` to start the backend

### Docker
- Type `docker-compose up -d --build` to start the backend and the database
