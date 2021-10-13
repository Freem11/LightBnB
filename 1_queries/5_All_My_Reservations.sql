

SELECT properties.id, properties.title, properties.cost_per_night, reservations.start_date, avg(property_reviews.rating) AS average_rating
FROM property_reviews
JOIN properties ON property_reviews.property_id = properties.id
JOIN users ON property_reviews.guest_id = users.id
JOIN reservations ON property_reviews.reservation_id = reservations.id
WHERE reservations.guest_id = 1 and reservations.end_date < now()::date
GROUP BY properties.id, properties.title, properties.cost_per_night,reservations.start_date
ORDER BY reservations.start_date
LIMIT 10;

-- \i 1_queries/5_All_My_Reservations.sql