class HomeController{

    async index(req, res){
        res.send("APP EXPRESS! - Extensão Dev");
    }

    async validate(req, res){
        console.log("Received request at /validate");
        res.send("okay");
    }

}

module.exports = new HomeController();