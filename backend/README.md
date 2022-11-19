# Core API

This is the backend of Uni. Project

---

## Get started

To get the Core API up and running follow these steps

1.  Clone the repo

1.  Install the node modules

         yarn

1.  Create a `.env` file and copy / update the values from `.env.example`

1.  Run the server using

        yarn start

---

## DB Migrations

The following commands can be used to manage migration scripts.

- Create a blank migration script

        yarn sequelize-cli migration:generate --name test

- Run new migrations

        yarn sequelize-cli db:migrate

- Undo last migrations

        yarn sequelize-cli db:migrate:undo

The following commands can be used to manage seeders.

- Create a blank seed script

        yarn sequelize-cli seed:generate --name test

- Run all seed scripts

        yarn sequelize-cli db:seed:all

- Undo all seed scripts

        yarn sequelize-cli db:seed:undo:all

---
