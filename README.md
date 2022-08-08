# Backend notes & tips

Since DB is going to be complex, before setting up backend APIs, first I need to do is design and implenment DB structure, as well as conect it to our backend. And than build servrside based on its logic. In that case I'll have better understanding of how better to implement APIs later on. Good tool for building visual scemas of future DB is - https://app.diagrams.net.

To avoid manual implementation of SQL database, I'm going to use Sequelize to connect backend to the DB, create  table bluepint\their relations on the server side using JS and then parse their logic to the DB to create real one's (tables).

Also, while setting up connection to our DB I mooved connection points to the separate file: db.js. Addinionaly file '.env' was implemented. It allows us to set envarimentle variables to our liking in a sepparate file, so we can use them later on in different parts of our code. However, this is not an obligatory part and we could have built our app without '.env'. To be able to use '.env' file we need to install 'dotenv' dependancy and import it into index.js file (require('dotenv').config()). 'dotenv' is a zero-dependency module that loads environment variables from a '.env' file into process.env.

app.use(express.json()); - Latest version of exressJS now comes with Body-Parser, so we don't need this!

### Choosing Node.js ORM tool for Postgres
I was choosing between Sequelize and Knex. But since Sequelize is more capble one, it became my choice.
**Modules reminder:** if you want to use new import/export syntax for modules don't forget to set `"type": "module"` in the package.json or to use `.mjx` extention.


# Database notes & tips
### Choosing PostgreSQL GUI
For a PostgreSQL GUI I was choosing between 'pgAdmin' or 'PSequel' client. 'pgAdmin' is great for its feature-richness. However, I found its UI clumsy and complicated. So I've desided to use PSequel instesd. 
P.S. For some reason PSequel do not work with latest version of PostgreSQL. So, I'm going to use pgAdmin4 instead.

Also worth mentioning that unlike in pgAdmin3 - in pgAdmin4 you have to manually connect to a running postgres server, since there is no pre-built server skeleton. So, when you enter a DB server for the first time there's gonna be no DB under "Servers" root folder (it's going to be completely empty). Solution on StackOverflow: [Databases in psql Don't Show up in PgAdmin4](https://stackoverflow.com/questions/61576670/databases-in-psql-dont-show-up-in-pgadmin4). 