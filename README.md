# Football Data API Wrapper

This project is a GraphQL API that fetches data from the Football-Data.org API v4 and stores it locally in a PostgreSQL database. It provides mutations to import league data and queries to fetch player and team data.

## Requirements

- Node.js (14.x or later)
- PostgreSQL (Make sure you have it up and running with the correct port, username, and password)
- An understanding of environment variables

## Getting Started

1. Download the project ZIP file and extract it.
2. Navigate into the project directory:
   `cd YOUR_PROJECT_NAME`

3. Install the dependencies:
   `npm install`

4. Create a .env file in the root of the project and set the required environment variables (follow the .env.example file):
-   `DB_HOST=localhost`
-   `DB_PORT=5432`
-   `DB_USERNAME=your_db_username`
-   `DB_PASSWORD=your_db_password`
-   `DB_DATABASE=your_database_name`

5. Run the application:
   This will create the PostgreSQL database and start the server. You can now access the GraphQL API at http://localhost:3000/graphql.

## Features

- **importLeague mutation:** Imports league data from the Football-Data.org API and stores it locally. The data imported includes the competition, teams, and players or coach.
- **players query:** Returns the players that belong to all teams participating in a given league.
- **team query:** Returns the corresponding team for a given team name and optionally the players or coach for that team.

## Example Queries

You can use a tool like Postman or GraphQL Playground to run queries against the API. Here are some example queries you can try:

1. Import league data (e.g., Champions League):

-   `{"query": "mutation { importLeague(leagueCode: \"CL\") }"}`

2. Fetch all teams:
-   `{"query": "query { allTeams { name } }"}`

4. Fetch a specific team (e.g., Chelsea FC):
-   `{"query": "query { team(name: \"Chelsea FC\") { id name players { id name } } }"}`

5. Fetch a specific team with its players (e.g., Arsenal FC):
-   `{"query": "query { team(name: \"Arsenal FC\", include: { players: true }) { id name players { id name } } }"}`

## Environment Variables

The application uses environment variables to configure the connection to your PostgreSQL database. Before running the application, make sure to set up the following variables in the .env file:
-   `DB_HOST=localhost`
-   `DB_PORT=5432`
-   `DB_USERNAME=your_db_username`
-   `DB_PASSWORD=your_db_password`
-   `DB_DATABASE=your_database_name`

## Technologies Used

- **Nest.js:** The back-end framework for our application, providing a modular and efficient structure.
- **TypeORM:** An Object-Relational Mapping (ORM) library for TypeScript and JavaScript that simplifies database access with PostgreSQL.
- **GraphQL:** A data query and manipulation language that allows clients to define the structure of the data required.
- **Axios:** A promise-based HTTP client that is used to make requests to the Football-Data.org API.

## Design Decisions

**PostgreSQL Database:** The data from the Football-Data.org API is naturally represented as JSON, and PostgreSQL is a reliable and feature-rich SQL database that can handle structured data efficiently.

**TypeORM with Nest.js:** We chose TypeORM for its integration with Nest.js, providing a seamless way to interact with the database using TypeScript.

**GraphQL:** GraphQL was chosen to serve as our API as it allows clients to request only the data they need, reducing unnecessary data transfers and providing a clear schema for our API.

**Axios:** Axios is a reliable and widely-used HTTP client, making it an excellent choice for making requests to the Football-Data.org API.

## Common Errors

**Database Connection Error**
If you encounter an error saying "Unable to connect to the database," make sure that your PostgreSQL server is running and that you have provided the correct credentials (username and password) in the .env file.

**Permissions Issue with create_db.sh**
If you encounter a "Permission denied" error when running the create_db.sh script, you might need to give execute permissions to the script. You can do this by running:

`chmod +x create_db.sh`

This will add execute permissions to the script, allowing it to be run.

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit/).
