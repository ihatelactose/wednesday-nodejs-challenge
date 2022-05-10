CREATE TABLE bookings
  (
    id            INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fromLocation  VARCHAR(32) NOT NULL,
    toLocation    VARCHAR(32) NOT NULL,
    byUser        INT NOT NULL,
    CONSTRAINT bookings_users_fk FOREIGN KEY (byUser) REFERENCES users (id) ON UPDATE CASCADE
  )