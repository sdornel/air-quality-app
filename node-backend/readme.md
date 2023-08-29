To run the server type "node server.js"

You will need to set up a database for this. Here is one way of setting up a database (assuming you have tablePlus installed). Note I am using psql version 15.4

1) open a terminal and type "psql -U postgres". this ensures you open psql terminal with postgres user
2) 



useful commands for sequelize https://sequelize.org/docs/v6/other-topics/migrations/
```bash
1) To create migration and data model
npx sequelize-cli model:generate --name CustomerData --attributes placeHolder:string

2) Run migrations
npx sequelize-cli db:migrate

3) Revert the most recent migration
npx sequelize-cli db:migrate:undo

4) Revert back to the initial state by undoing all migrations
db:migrate:undo:all

5) You can revert back to a specific migration by passing its name with the --to option.
npx sequelize-cli db:migrate:undo:all --to sample-migration-file.js
```
