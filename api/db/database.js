import mysql from "mysql";

// Create a pool of connections
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "Dvala.2021",
  database: "electronic-component-logistics-schema",
});

// Export the pool object
export default pool;
