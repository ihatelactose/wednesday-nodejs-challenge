CREATE TABLE bookings
  (
    id              INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    from_location   POINT NOT NULL SRID 4326,
    to_location     POINT NOT NULL SRID 4326,
    user_id         INT NOT NULL,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, 
    CONSTRAINT bookings_users_fk FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE
  )