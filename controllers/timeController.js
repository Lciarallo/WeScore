const Time = require('../models/Time')

module.exports = class TimeController{

    //Método que mostra o formulário de criação da tarefa
    static criarTime(req,res){
        res.render('Time/criar')
    }

    //Método que recebe os dados do form e salva no bd
    static async criarTimePost(req, res){
        const new_time = {
            nomeTime : req.body.nome
        }
        
        await Time.create(new_time)
            .then(() => {res.redirect('/time')})
            .catch((err)=> console.log(`Erro ao cadastrar time nome:${new_time.nome}`) + console.log(err))
    }

}
