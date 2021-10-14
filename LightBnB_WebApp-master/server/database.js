const properties = require("./json/properties.json");
const users = require("./json/users.json");

/// Users
const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb",
});

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

//--------------------------------------------------------------------------------------

const getUserWithEmail = function (email) {
  return pool
    .query(`SELECT * FROM users WHERE email = $1;`, [email])
    .then((result) => {
      console.log(result);
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];
    })
    .catch((err) => {
      return err.message;
    });

  // let user;
  // for (const userId in users) {
  //   user = users[userId];
  //   if (user.email.toLowerCase() === email.toLowerCase()) {
  //     break;
  //   } else {
  //     user = null;
  //   }
  // }

  //  return Promise.resolve(user);
};
exports.getUserWithEmail = getUserWithEmail;

//--------------------------------------------------------------------------------------

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool
    .query(`SELECT * FROM users WHERE id = $1;`, [id])
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
      return err.message;
    });

  // return Promise.resolve(users[id]);
};

exports.getUserWithId = getUserWithId;

//--------------------------------------------------------------------------------------

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  return pool
    .query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;`,
      [user.name, user.email, user.password]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return "No record found";
      }
      return result;
    })
    .catch((err) => {
      return err.message;
    });

  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // return Promise.resolve(user);
};
exports.addUser = addUser;

//--------------------------------------------------------------------------------------

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return pool
    .query(`SELECT * from reservations WHERE guest_id = $2 LIMIT $1;`, [
      limit,
      guest_id,
    ])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      return err.message;
    });

  // return getAllProperties(null, 2);
};
exports.getAllReservations = getAllReservations;

//--------------------------------------------------------------------------------------

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  const queryParams = [];

  console.log(options);
  let queryString = `SELECT properties.*, avg(property_reviews.rating) AS average_rating
  FROM properties JOIN property_reviews ON property_reviews.property_id= properties.id `;

  let count = 0;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
    count += 1;
  }

  if (options.owner_id) {
    if (count > 0) {
      queryParams.push(`%${options.owner_id}%`);
      queryString += `AND owner_id = $${queryParams.length} `;
    } else {
      queryParams.push(`%${options.owner_id}%`);
      queryString += `WHERE owner_id = $${queryParams.length} `;
      count += 1;
    }
  }

  if (options.minimum_price_per_night) {
    if (count > 0) {
      queryParams.push(`${options.minimum_price_per_night}`);
      queryString += `AND cost_per_night >= $${queryParams.length} `;
    } else {
      queryParams.push(`${options.minimum_price_per_night}`);
      queryString += `WHERE cost_per_night >= $${queryParams.length} `;
      count += 1;
    }
  }

  if (options.maximum_price_per_night) {
    if (count > 0) {
      queryParams.push(`${options.maximum_price_per_night}`);
      queryString += `AND cost_per_night <= $${queryParams.length} `;
    } else {
      queryParams.push(`${options.maximum_price_per_night}`);
      queryString += `WHERE cost_per_night <= $${queryParams.length} `;
      count += 1;
    }
  }

  queryString += `GROUP BY properties.id `;

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
  }

  queryParams.push(limit);

  queryString += `ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  console.log(queryString, queryParams);

  return pool.query(queryString, queryParams).then((res) => res.rows);

  // const limitedProperties = {};
  // for (let i = 1; i <= limit; i++) {
  //   limitedProperties[i] = properties[i];
  // }
  // return Promise.resolve(limitedProperties);
};
exports.getAllProperties = getAllProperties;

//--------------------------------------------------------------------------------------

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};
exports.addProperty = addProperty;
