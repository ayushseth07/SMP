const client = require("../Database/connection.js");
const dbQuery = require('../Database/dbqueries.js');

exports.addPost = function(data) {
    return new Promise(async (resolve, reject) => {
      if(data.email != null&&data.title!= null&&  data.description!= null && data.uploadedImageURL !=null){
      try {
        if(data.likes == null){
          data.likes = 0;
        }                      
            const values = [data.email, data.title, data.comments, data.likes, data.category, data.uploadedImageURL, data.description];        
            const result = await client.query(dbQuery.addPostQuery, values);
            resolve(result)            
          } catch (error) {
            reject(error);           
          }}else{
            reject(new Error("Incomplete Data"));
          }
    });
  };
  
