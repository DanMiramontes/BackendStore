DELIMITER //
CREATE PROCEDURE sp_users_show(IN ID VARCHAR(1), IN username VARCHAR(20))
BEGIN
  IF (ID IS NULL OR ID = '' )AND (username IS NULL OR username = '' )THEN
     -- ID IS NULL Y username IS NULL
     SELECT * FROM store.user;
  ELSE 
	 IF (ID IS NULL OR ID = '' ) AND username IS NOT NULL THEN
     -- ID IS NULL Y username IS "username "
       SELECT user.id, user.username,user.fullname, user.password,rol.role, user.created_at
       FROM store.user user
       INNER JOIN (
         SELECT * FROM store.roles rol
       ) rol ON user.role_id = rol.id
       WHERE user.username = username;
	ELSE 
       -- ID IS 1 Y username IS NULL 
	   SELECT user.id, user.username,user.fullname, user.password,rol.role, user.created_at
       FROM store.user user
       INNER JOIN (
         SELECT * FROM store.roles rol
       ) rol ON user.role_id = rol.id
       WHERE user.id = ID;
	END IF;
  END IF;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_categories_show(IN ID VARCHAR(1), IN name VARCHAR(20))
BEGIN
  IF (ID IS NULL OR ID = '' ) AND (name IS NULL OR name = '' )THEN
     -- ID IS NULL Y name IS NULL
     SELECT * FROM store.categories;
  ELSE 
	 IF (ID IS NULL OR ID = '' ) AND name IS NOT NULL THEN
     -- ID IS NULL Y name IS "name "
       SELECT * FROM store.categories WHERE categories.name = name;
	ELSE 
       -- ID IS 1 Y name IS NULL 
       SELECT * FROM store.categories WHERE categories.id = ID;
	END IF;
  END IF;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_verifyIdentity(IN pEmail VARCHAR(20))
BEGIN
	SELECT DISTINCT USER.id, USER.username,CONVERT(USER.password USING utf8) AS password, USER.fullname,USER.email, rol.role
	FROM store.user USER
    INNER JOIN (
      SELECT * FROM store.roles rol
    ) rol ON USER.role_id = rol.id
    WHERE 1 = 1 
    AND USER.email = pEmail;
END //
DELIMITER ;