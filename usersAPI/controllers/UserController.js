var User = require("../models/User");
var PasswordToken = require("../models/PasswordToken");
var jwt = require("jsonwebtoken");
var findByEmail = require("../models/findByEmail");

var secret = "adsuasgdhjasgdhjdgahjsg12hj3eg12hj3g12hj3g12hj3g123";

var bcrypt = require("bcryptjs");


class UserController{
    async index(req, res){
        var users = await User.findAll();
        res.json(users);
    }

    async findUser(req, res){
        var id = req.params.id;
        var user = await User.findById(id);
        if(user == undefined){
            res.status(404);
            res.json({});
        }else{
            res.status(200)
            res.json(user);
        }
    }

    async create(req, res){
        var {email, nome, password} = req.body;

        if(email == undefined || email == '' || email == ' '){

            res.status(400);
            res.json({err: "O e-mail é inválido!"})
            return;
        }

        var emailExists = await User.findEmail(email);

        if(emailExists){
            res.status(406);
            res.json({err: "O e-mail já está cadastrado!"})
            return;
        }

        
        await User.new(email,password,nome);
        
        res.status(200);
        res.send("Tudo OK!");
    }

    async edit(req, res){
        var {id, nome, role, email} = req.body;
        var result = await User.update(id,email,nome,role);
        if(result != undefined){
            if(result.status){
                res.status(200);
                res.send("Tudo OK!");
            }else{
                res.status(406);
                res.send(result.err)
            }
        }else{
            res.status(406);
            res.send("Ocorreu um erro no servidor!");
        }
    }

    async remove(req, res){
        var id = req.params.id;

        var result = await User.delete(id);

        if(result.status){
            res.status(200);
            res.send("Tudo OK!");
        }else{
            res.status(406);
            res.send(result.err);
        }
    }

    async recoverPassword(req, res){
        var email = req.body.email;
        var result = await PasswordToken.create(email);
        if(result.status){
           res.status(200);
           res.send("" + result.token);
        }else{
            res.status(406)
            res.send(result.err);
        }
    }

    async changePassword(req, res){
        var token = req.body.token;
        var password = req.body.password;
        var isTokenValid = await PasswordToken.validate(token);
        if(isTokenValid.status){
            await User.changePassword(password,isTokenValid.token.user_id,isTokenValid.token.token);
            res.status(200);
            res.send("Senha alterada");
        }else{
            res.status(406);
            res.send("Token inválido!");
        }
    }
/*
    async login(req, res){
        var {email, password } = req.body;

        var user = await findBEmail.findByEmail(email);

        if(user != undefined){

            var resultado = await bcrypt.compare(password,user.password);

            if(resultado){

                var token = jwt.sign({ email: user.email, role: user.role }, secret);

                res.status(200);
                res.json({token: token});

            }else{
                res.status(406);
                res.send("Senha incorreta");
            }

        }else{

            res.json({status: false});

        }
    }
*/
/*
async login(req, res) {
    const { email, password } = req.body;
  
    const user = await findByEmail(email);
  
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        // O usuário está autenticado
        const token = jwt.sign({ email: user.email, role: user.role }, secret);
  
        return res.status(200).json({ token: token });
      } else {
        // A senha está incorreta
        return res.status(401).json({ message: 'Senha incorreta!' });
      }
    } else {
      // O usuário não existe
      return res.status(404).json({ message: 'O usuário não existe!' });
    }
  }
*/



async login(req, res) {
    const { email, password } = req.body;
  
    const user = await findByEmail(email);
  
    if (!user) {
      // O usuário não existe
     // return res.status(404).json({ message: 'O usuário não existe!' });
      res.status(406);
      res.json({err: "O usuário não existe!"})
      return;


    } else {
      if (await bcrypt.compare(password, user.password)) {
        // O usuário está autenticado
        const token = jwt.sign({ email: user.email, role: user.role }, secret);

        console.log("User Role at Login:", user.role); 
  
        return res.status(200).json({ token: token });
      } else {
        // A senha está incorreta
        //return res.status(401).json({ message: 'Senha incorreta!' });
        res.status(406);
        res.json({err: "Senha incorreta!"})
        return;
      }
    }
  }

}

module.exports = new UserController();