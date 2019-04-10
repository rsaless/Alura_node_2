const BaseControlador = require('../controllers/base-controlador');
const baseControlador = new BaseControlador();

module.exports = (app) => {
    const rotasBase = BaseControlador.rotas();

    app.get(rotasBase.home, baseControlador.home());
}

