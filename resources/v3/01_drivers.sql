CREATE TABLE drivers 
 (
   id               INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
   first_name        VARCHAR(32) NOT NULL,
   last_name        VARCHAR(32) NOT NULL,
   current_location POINT NOT NULL SRID 4326
 )