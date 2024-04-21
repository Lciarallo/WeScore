const api = require('../config/api')

// Metodo para buscar todos os elementos da api
exports.getALLDatas = async (req,res) => {
    try {
        // Configurar o cabeçalho com a autorização do token
        const token = await req.session.token
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        // Fazer a requisição para a API
        let response = await api.get("/campeonato/all", config)
        const campeonatos = response.data
        const idcamp = campeonatos[0].idCampeonato
        let cont = 0;
        campeonatos.forEach(function (element){
            if (cont == 0){
                element.active = true
                cont++
            } else{
                element.active = false
            }
        })

        const user = {
            userId: req.session.userId,
            userName: req.session.userName,
            userMail: req.session.userMail,
            userLogo: req.session.userLogo
        }

        res.render('campeonato/', { campeonatos, user, layout : 'painelws' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar datas.' });
    }
}
exports.addCampeonato = async (req,res) => {
    const user = {
        userId: req.session.userId,
        userName: req.session.userName,
        userMail: req.session.userMail,
        userLogo: req.session.userLogo
    }
    res.render('campeonato/add', { user,layout : 'painelws'})
}