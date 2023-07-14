class User{

  constructor(username, password, fullname,email, role){
    this.username = username;
    this.password = password;
    this.fullname = fullname;
    this.email = email;
    this.role = role;

  }
}

class UserCrendential{
  constructor(email, password){
    this.email = email;
    this.password = password;
  }
}

module.exports = {User, UserCrendential};