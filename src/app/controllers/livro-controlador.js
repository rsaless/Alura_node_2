const {validationResult} = require('express-validator/check');
const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');
const templates = require('../views/templates');

class LivroControlador {

    static rotas(){
        return {
            lista: '/livros',
            cadastro: '/livros/form',
            edicao: '/livros/form/:id',
            delecao: '/livros/:id'
        }
    }

    lista(){
        return (req, res) => {
            new LivroDao(db).lista()
                .then(livros => res.marko(templates.livros.lista,{livros}))
                .catch(erro => console.log(erro));
        }
    }
    formularioCadastro(){
        return (req, res) => {
            res.marko(templates.livros.form,{ livro: {} });
        }
    }
    formularioEdicao(){
        return (req, res) => {
            const id = req.params.id;
            console.log(req.body);
            new LivroDao(db).buscaPorId(id)
            .then(livro => res.marko(templates.livros.form, {livro: livro}))
            .catch(erro => console.log(erro))
        }
    }
    cadastra(){
        return (req,res) => {
            console.log(req.body);
            const erros = validationResult(req);
            if(!erros.isEmpty()){
                return res.marko(templates.livros.form, {livro: req.body, errosValidacao: erros.array()});
            }
            new LivroDao(db).adiciona(req.body)
                .then(res.redirect(LivroControlador.rotas().lista))
                .catch(erro => console.log(erro));
        }
    }
    edita(){
        return (req,res) => {
            console.log(req.body);
            new LivroDao(db).atualiza(req.body)
                .then(res.redirect(LivroControlador.rotas().lista))
                .catch(erro => console.log(erro));
        }
    }
    remove(){
        return (req, res) => {
            const id = req.params.id;
            new LivroDao(db).remove(id)
                .then(() => res.status(200).end())
                .catch(erro => console.log(erro))
        }
    }
}

module.exports = LivroControlador;