CREATE TABLE cabs 
 (
   id               INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
   driver_id        INT UNSIGNED UNIQUE,
   cab_type         ENUM('bike', 'auto', 'sedan', 'premier'),
   cab_number       VARCHAR(32) NOT NULL,
   CONSTRAINT cabs_driver_fk FOREIGN KEY(driver_id) REFERENCES drivers(id)
 )