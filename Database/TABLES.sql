USE store;

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  role varchar(20) NOT NULL,
  created_at DATETIME NULL
) COMMENT='Stores the role''s data.';


CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username varchar(20) NOT NULL ,
  password blob NOT NULL,
  fullname varchar(50)  NOT NULL,
  email varchar(100) NOT NULL UNIQUE,
  role_id INT NOT NULL,
  FOREIGN KEY( role_id) REFERENCES roles(id),
  created_at DATETIME NULL,
  updated_at DATETIME NULL
) COMMENT='Stores the role user''s data.';


CREATE TABLE categories (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(id),
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at DATETIME NULL
)COMMENT='Stores the categories data.';



