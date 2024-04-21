function token() {
    const token = localStorage.getItem('token');
    if (!token) { //Se não existe token, vai para o login
        window.location.href = `/login`;
    }
    // Configurar o cabeçalho com a autorizção do token
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const url = "http://localhost:3001/";
    // Fazer uma solicitação POST para criar o usuario
    axios.get(`${url}usuario/checkUser/`, config)
        .then(response => {
            if (response.status != 200){
                window.location.href = `/login`;
            }
            console.log("Front JS - Token Valido.");
        })
        .catch(error => {
            window.location.href = `/login`;
        });
}
  //Função para limpar o token no logout
function clearToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userMail');
    localStorage.removeItem('userLogo');
}