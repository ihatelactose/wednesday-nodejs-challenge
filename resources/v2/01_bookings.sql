CREATE TABLE bookings
  (
    id              INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    from_location   GEOMETRY NOT NULL,
    to_location     GEOMETRY NOT NULL,
    user_id         INT NOT NULL,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, 
    CONSTRAINT bookings_users_fk FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE
  )