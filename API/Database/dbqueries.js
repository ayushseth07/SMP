const updateLikesQuery = 'UPDATE blog_posts SET likes = likes + 1 WHERE post_id = $1 RETURNING *';

const updateUnLikeQuery = 'UPDATE blog_posts SET likes = likes - 1 WHERE post_id = $1 RETURNING *';

const verifyUser = `UPDATE user3 SET verified = true  WHERE email = $1`;

const getStoredOTP = 'SELECT otp FROM otps WHERE email = $1 AND expiration_timestamp > NOW() ORDER BY expiration_timestamp DESC LIMIT 1'

const selectAllBlogPosts = `SELECT
p.post_id,
p.description,
p.likes,
p.title,
p.userid,
p.image_url,
p.date_created,
COALESCE(json_agg(e."sender"), '[]') AS liked_by,
COALESCE(u.name, '') AS user_name
FROM blog_posts p
LEFT JOIN notifications e ON p.post_id = e.postid
LEFT JOIN user3 u ON u.email = p.userid
GROUP BY
p.post_id, p.description, p.title, p.userid, p.image_url, u.name;`;

const updatePasswordQuery = 'UPDATE user3 SET password = $1 WHERE email = $2';

const addPostQuery = `INSERT INTO blog_posts (userid, title, comments, likes, category, image_url, description)
VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING post_id`;

const insertUserQuery = 'INSERT INTO user3 (name, email, password, date) VALUES ($1, $2, $3, $4) RETURNING *';

const checkIfLikedquery = ' SELECT 1   FROM notifications   WHERE postid = $1 AND sender = $2 ';

const selectRecordsByEmail = 'SELECT * FROM user3 WHERE email = $1';

const deletePostById = 'DELETE FROM blog_posts WHERE post_id = $1';

const insertIntoOtp = 'INSERT INTO otps(email, otp, expiration_timestamp) VALUES($1, $2, $3)';

const selectPostById = `SELECT
p.post_id,
p.description,
p.likes,
p.title,
p.userid,
p.image_url,
p.date_created,
COALESCE(json_agg(e."sender"), '[]') AS liked_by,
COALESCE(u.name, '') AS user_name
FROM blog_posts p
LEFT JOIN notifications e ON p.post_id = e.postid
LEFT JOIN user3 u ON u.email = p.userid
WHERE email = $1
GROUP BY
p.post_id, p.description, p.title, p.userid, p.image_url, u.name;`


const selectEmail = 'SELECT email FROM user3 where email = $1';

const updateBlogPost = 'UPDATE blog_posts SET title = $1, comments = $2, likes = $3, category = $4, image_url = $5, description = $6 WHERE post_id = $7 AND userid = $ RETURNING *'

const getUserData = `SELECT
userdata.*,
user3.name,
user3.image,
(
    SELECT SUM(likes)
    FROM blog_posts
    WHERE userid = user3.email
) AS total_likes
FROM userdata
INNER JOIN user3 ON userdata.email = user3.email
WHERE userdata.email = $1;`;

const retrievedComment = `SELECT
c.value AS comment_value,
u.name AS sender_name,
c.sender As email
FROM commentTable c
INNER JOIN user3 u ON c.sender = u.email
WHERE c.postid = $1 AND c.receiver = $2;
`;
const getUserNameQuery = `SELECT name,email
FROM user3
WHERE name LIKE $1 or name LIKE $2 or name LIKE $3`;


module.exports = {
  updateLikesQuery, selectAllBlogPosts,
  updatePasswordQuery, addPostQuery, insertUserQuery,
  checkIfLikedquery, selectRecordsByEmail, deletePostById,
  insertIntoOtp, selectPostById, selectEmail, updateBlogPost, updateUnLikeQuery, retrievedComment, getUserNameQuery, verifyUser, 
  getStoredOTP,getUserData
};