

SELECT properties.city, count(reservations.*) AS total_reservations
FROM reservations
JOIN properties ON property_id = properties.id
GROUP BY properties.city
ORDER BY total_reservations desc


-- \i 1_queries/4_Most_Visited_Cities.sql
