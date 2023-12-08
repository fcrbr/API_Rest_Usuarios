var jwt = require("jsonwebtoken");
var secret = "adsuasgdhjasgdhjdgahjsg12hj3eg12hj3g12hj3g12hj3g123";

module.exports = function(req, res, next){
    const authToken = req.headers['authorization']

        if(authToken != undefined){

        const bearer = authToken.split(' '); 
     
        var token = bearer[1];

            try{

            var decoded = jwt.verify(token,secret);
            console.log("Decoded Token:", decoded); // Adiciona este log para verificar o conteúdo do token decodificado
            console.log("User Role :", decoded.role);

            if(decoded.role == 1){
                 next();
            }else{
                res.status(403);
                res.send("Você não tem permissão para isso");
                return;
            }
           
            }catch(err){
            res.status(403);
            res.send("Você não está autenticado");
            return;
            }
    
        }else{
            res.status(403);
            res.send("Você não está autenticado");
            return;
        }
}
