CREATE TABLE IF NOT EXISTS recipes (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  cuisine VARCHAR(100),
  title VARCHAR(255),
  rating DOUBLE,
  prep_time INT,
  cook_time INT,
  total_time INT,
  description TEXT,
  nutrients JSON,
  calories INT,
  serves VARCHAR(50)
);

CREATE INDEX IF NOT EXISTS idx_recipes_rating ON recipes (rating DESC, id ASC);
CREATE INDEX IF NOT EXISTS idx_recipes_cuisine ON recipes (cuisine);
CREATE INDEX IF NOT EXISTS idx_recipes_calories ON recipes (calories);

