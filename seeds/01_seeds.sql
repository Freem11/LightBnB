
-- table restart method 

--1 delte all records in table

--delete from users;
--delete from properties;
--delete from reservations;
--delete from property_reviews;

--2 restart autoincrement at 1

--ALTER SEQUENCE users_id_seq RESTART WITH 1;
--ALTER SEQUENCE properties_id_seq RESTART WITH 1;
--ALTER SEQUENCE reservations_id_seq RESTART WITH 1;
--ALTER SEQUENCE property_reviews_id_seq RESTART WITH 1;

INSERT INTO users(name, email, password)
VALUES ('Fred Flintstone', 'fred@flintstone.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Barney Rubble', 'barney@rubble.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Dino', 'dino@bambam.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');


INSERT INTO properties(owner_id, title, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Rock House', 'pic1', 'bigpic', 10, 2,1,2,'pangea', 'boulder ave', 'bedrock', 'ontario', 'k4m 1b3', TRUE),
(2, 'Block House', 'pica', 'snap2', 15, 1,2,3,'pangea', 'pebble lane', 'bedrock', 'ontario', 'v6h 1n5', FALSE),
(2, 'Cragy Condo', 'picb', 'snap7', 11, 0,1,1,'pangea', 'quary cres', 'bedrock', 'ontario', 'b5g 1q8', TRUE);


INSERT INTO reservations(start_date, end_date, property_id, guest_id)
VALUES ('2020-01-01', '2020-01-09',1, 3),
('2020-02-02', '2020-02-10',2, 2),
('2020-03-05', '2020-03-15',3, 1);


INSERT INTO property_reviews(guest_id, property_id, reservation_id, rating, message)
VALUES (1, 2, 2, 3, 'yippie'),
       (2, 1, 1, 4, 'yep'),
       (3, 3, 3, 2, 'nope');


