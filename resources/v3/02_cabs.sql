CREATE TABLE cabs 
 (
   id               INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
   driver_id_fk     INT UNSIGNED UNIQUE,
   cab_type         ENUM('bike', 'auto', 'sedan', 'premier'),
   cab_number       VARCHAR(32) NOT NULL,
   FOREIGN KEY(driver_id_fk) REFERENCES drivers(id)
 )