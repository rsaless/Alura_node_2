const Livro = require('../models/livro');
const BaseControlador = require('../controllers/base-controlador');
const LivroControlador = require('../controllers/livro-controlador');
const livroControlador = new LivroControlador();

module.exports = (app) => {
    const rotasLivro = LivroControlador.rotas();

    app.use(rotasLivro.autenticadas, (req, res, next) => (req.isAuthenticated()) ? next() : res.redirect(BaseControlador.rotas().login))
    app.get(rotasLivro.lista, livroControlador.lista());
    app.get(rotasLivro.edicao, livroControlador.formularioEdicao());
    app.route(rotasLivro.cadastro)
        .get(livroControlador.formularioCadastro())
        .post(Livro.validacoes(), livroControlador.cadastra())
        .put(livroControlador.edita())
    app.delete(rotasLivro.delecao, livroControlador.remove());
}

