module.exports.iniciaChat = function(application, req, res) {
    var dadosForm = req.body;

    req.check('apelido', 'Nome ou apelido é obrigatório').isLength({ min: 1 });
    req.check('apelido', 'Nome ou apelido deve conter mais de 5 caracteres').isLength({ min: 5 });

    var erros = req.validationErrors();

    if (erros) {
        res.render("index", { validacao: erros });
        return;
    }

    application.get('io').emit(
        'msgParaCliente',
        { apelido: dadosForm.apelido, mensagem: 'acabou de entrar no chat' }
    );

    res.render('chat', { dadosForm: dadosForm });
};
