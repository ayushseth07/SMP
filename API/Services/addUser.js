const client = require("../Database/connection.js");
const dbQuery = require('../Database/dbqueries.js');

exports.addUser = function(name, email, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const date = Date.now();
        const values =[name, email, password, date]
        const result = await client.query(dbQuery.insertUserQuery,values); 
  
        if (result.rows && result.rows.length > 0) {
          resolve();
        } else {
          reject('No rows returned');
        }
      } catch (error) {
        if (error.code === '23505') {
          reject(error);
        } else {
          reject(error);
        }
      }
    });
  };
  

