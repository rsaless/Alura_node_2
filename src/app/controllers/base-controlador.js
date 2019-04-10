const LivroControlador = require('./livro-controlador');
const templates = require('../views/templates');

class BaseControlador {
    static rotas(){
        return {
            home: '/',
            login: '/login',
        }
    }

    home(){
        return (req, res) => {
            res.marko(templates.base.home);
        }
    }
    
    login(){
        return (req, res) => {
            res.marko(templates.base.login);
        }
    }

    efetuaLogin(){
        return (req, res, next) => {
            // código do login
            const passport = req.passport;
            passport.authenticate('local', (erro, usuario, info) => {
                if (info) return res.marko(templates.base.login);
                if (erro) return next(erro);

                req.login(usuario, (erro) => {
                    if (erro) next(erro);
                    return res.redirect(LivroControlador.rotas().lista);
                });

            })(req, res, next);
        }
    }
}

module.exports = BaseControlador;