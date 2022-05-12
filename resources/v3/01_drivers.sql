CREATE TABLE drivers 
 (
   id               INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
   first_name        VARCHAR(32) NOT NULL,
   last_name        VARCHAR(32) NOT NULL,
   current_location GEOMETRY NOT NULL,
   driver_status    ENUM('open', 'transit', 'not_accepting') DEFAULT 'open'
 )