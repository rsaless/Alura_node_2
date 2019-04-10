const templates = require('../views/templates');

class BaseControlador {
    static rotas(){
        return {
            home: '/'
        }
    }

    home(){
        return (req, res) => {
            res.marko(templates.base.home);
        }
    }
}

module.exports = BaseControlador;