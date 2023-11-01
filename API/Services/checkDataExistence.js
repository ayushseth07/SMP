const client = require("../Database/connection.js");
const dbQuery = require('../Database/dbqueries.js');

exports.checkDataExistence = async function (email) {
     
    try {
      // SQL query to check if data with the provided email exists in userdata
      const query = 'SELECT COUNT(*) FROM userdata WHERE email = $1';
  
      // Parameter for the query
      const values = [email];
  
      const result = await client.query(query, values);
  
      // Check the count of rows with the provided email
      const count = parseInt(result.rows[0].count);
  
      return count > 0; // If count is greater than 0, data exists; otherwise, it does not.
    } catch (error) {
      console.error('Error checking data existence:', error);
      throw error;
    } 
  };