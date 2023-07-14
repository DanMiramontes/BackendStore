DELIMITER //
CREATE PROCEDURE sp_create_role(role VARCHAR(20))
BEGIN
  DECLARE code CHAR(5) DEFAULT '00000';
  DECLARE msg TEXT;
  DECLARE nrows INT;
  DECLARE result TEXT;
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
      GET DIAGNOSTICS CONDITION 1
        code = RETURNED_SQLSTATE, msg = MESSAGE_TEXT;
    END;
    
    INSERT INTO store.roles(role,created_at) VALUES(role,current_time);
	IF code = '00000' THEN
       GET DIAGNOSTICS nrows = ROW_COUNT;
       SET result = CONCAT('created');
	ELSE
       SET result = CONCAT('created failed, error = ',code,', message = ',msg);
    END IF;
	SELECT result;
END //
DELIMITER ;



DELIMITER //
CREATE PROCEDURE sp_create_user(IN pUsername VARCHAR(20),IN pPassword VARCHAR(255),IN pFullname VARCHAR(50),IN pEmail VARCHAR(20),IN pRole INT)
BEGIN
  DECLARE code CHAR(5) DEFAULT '00000';
  DECLARE msg TEXT;
  DECLARE nrows INT;
  DECLARE result TEXT;
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
      GET DIAGNOSTICS CONDITION 1
        code = RETURNED_SQLSTATE, msg = MESSAGE_TEXT;
    END;
    
    INSERT INTO store.user(username,password,fullname,email,role_id,created_at) VALUES(pUsername,pPassword,pFullname,pEmail,pRole,CURRENT_TIME);
	IF code = '00000' THEN
       GET DIAGNOSTICS nrows = ROW_COUNT;
       SET result = CONCAT('created succeeded, row count = ',nrows);
	ELSE
       SET result = CONCAT('created failed, error = ',code,', message = ',msg);
    END IF;
	SELECT result;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE sp_create_categories(IN pName VARCHAR(50),IN pDescription VARCHAR(255))
BEGIN
  DECLARE code CHAR(5) DEFAULT '00000';
  DECLARE msg TEXT;
  DECLARE nrows INT;
  DECLARE result TEXT;
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
      GET DIAGNOSTICS CONDITION 1
        code = RETURNED_SQLSTATE, msg = MESSAGE_TEXT;
    END;
    INSERT INTO store.categories(name, description, created_at) VALUES(pName, pDescription,CURRENT_TIME);
    IF code = '00000' THEN
       GET DIAGNOSTICS nrows = ROW_COUNT;
       SET result = CONCAT('created succeeded, row count = ',nrows);
	ELSE
       SET result = CONCAT('created failed, error = ',code,', message = ',msg);
    END IF;
	SELECT result;
END //
DELIMITER ;
