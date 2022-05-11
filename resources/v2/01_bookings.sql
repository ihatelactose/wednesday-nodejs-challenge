CREATE TABLE bookings
  (
    id              INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    from_location   POINT NOT NULL SRID 4326,
    to_location     POINT NOT NULL SRID 4326,
    by_user         INT NOT NULL,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, 
    CONSTRAINT bookings_users_fk FOREIGN KEY (by_user) REFERENCES users (id) ON UPDATE CASCADE
  )