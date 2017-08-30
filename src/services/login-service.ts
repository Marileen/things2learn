
declare var DB: any;

export class LoginService {

    checkLogin(pw):Promise<any> {
        
        return DB.ready().then((yo) => {

            //passwort checken DB
            //DB.User.me
            if (DB.User.me) {
                //user is logged in
                console.log('Hello ' + DB.User.me.username); //the username of the user

                return new Promise((resolve, reject) => {
                    resolve(DB.User.me.username);
                })

            }

            return DB.User.login("DerLerner",pw);

        })
    }
    
}

export var loginService = new LoginService();