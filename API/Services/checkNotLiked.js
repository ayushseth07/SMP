const client = require("../Database/connection.js");
const dbQuery = require('../Database/dbqueries.js');

exports.checkNotLiked = async function(post_id, email) {
  const postIdToCheck = post_id;

  return new Promise((resolve, reject) => {

    const values= [postIdToCheck, email];

    client.query(dbQuery.checkIfLikedquery,values, (err, result) => {
      if (err) {
        reject(err);
        return;
      } else if (result.rowCount === 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};