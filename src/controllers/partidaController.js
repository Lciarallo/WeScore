const api = require('../config/api')

exports.getPartidaCampeonatoById = async (req,res) =>{
    try {
        const vidPartida = req.params.partida
        // Configurar o cabeçalho com a autorização do token
        const token = await req.session.token
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }

        // Fazer a requisição para a API
        let response = await api.get(`/partida/get/${vidPartida}`, config)
        const partida = response.data

        response = await api.get(`/time/players/${partida.idTime1}`, config)
        const jogadoresTime1 = response.data.Jogadors
        response = await api.get(`/time/players/${partida.idTime2}`, config)
        const jogadoresTime2 = response.data.Jogadors
        
        console.log("Partidas",partida)
        console.log("JogadoresTime1",jogadoresTime1)
        console.log("JogadoresTime2",jogadoresTime2)
        res.render('jogos', { partida, jogadoresTime1, jogadoresTime2, layout : 'painelws' })
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar datas.' });
        console.error(error)
    }
}