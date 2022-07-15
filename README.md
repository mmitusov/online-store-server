#Backend notes & tips
//'dotenv' is a zero-dependency module that loads environment variables from a .env file into process.env.
//Thx to in we can now use '.env'
require('dotenv').config()

###Choosing Node.js ORM tool for Postgres
I was choosing between Sequelize and Knex. But since Sequelize is more capble I chouse it.
**Modules reminder:** if you want to use new import/export syntax for modules don't forget to set `"type": "module"` in the package.json or to use `.mjx` extention.


#Database notes & tips
###Choosing PostgreSQL GUI
For a PostgreSQL GUI I was choosing between 'pgAdmin' or 'PSequel' client. 'pgAdmin' is great for its feature-richness. However, I found its UI clumsy and complicated. So I've desided to use PSequel instesd. 
P.S. For some reason PSequel do not work with latest version of PostgreSQL. So, I'm going to use pgAdmin4 instead.
Also worth mentioning that unlike in pgAdmin3 - in pgAdmin4 you have to manually connect to a running postgres server, since there is no pre-built server skeleton. So, when you enter a DB server for the first time there's gonna be no DB under "Servers" root folder (it's going to be completely empty).