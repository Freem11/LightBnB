


SELECT properties.id, properties.title, properties.cost_per_night, avg(property_reviews.rating) AS average_rating
FROM properties JOIN property_reviews ON property_reviews.property_id= properties.id
WHERE properties.city LIKE '%ancouv%' 
GROUP BY properties.id, properties.title, properties.cost_per_night
HAVING avg(property_reviews.rating) >= 4
ORDER BY cost_per_night
LIMIT 10


-- \i 1_queries/3_Property_Listings_By_City.sql
