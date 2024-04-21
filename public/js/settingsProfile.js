const url = "http://localhost:3001/";

// Manipulador de evento para clicar no botão quando o elemento .custum-file-upload é clicado
document.querySelector('.custum-file-upload').addEventListener('click', function() {
    document.querySelector('#file').click();

});
// Manipulador de evento para o input de arquivo


document.querySelector('#salvar').addEventListener('click', function() {
    // Obter os valores atualizados dos campos de entrada
    const nomeInput = document.getElementById('nome').value;
    const emailInput = document.getElementById('email').value;

    // Criar um objeto FormData para enviar os dados do arquivo
    const formData = new FormData();
    formData.append('nome', nomeInput);
    formData.append('email', emailInput);
    formData.append('logoUsuario', fileInput); // Renomeando para corresponder ao nome do campo esperado pelo servidor

    // Obter o token de autorização do localStorage
    const token = localStorage.getItem('token');

    // Configuração do cabeçalho com o token de autorização
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data' // Para enviar dados de formulário multipart
        }
    };

    const idUsuario = localStorage.getItem('userId');

    // Fazer uma solicitação PUT para atualizar os dados do usuário no servidor
    axios.put(`${url}/usuario/${idUsuario}`, formData, config)
        .then(response => {
            console.log('Dados do usuário atualizados com sucesso:', response.data);
            // Exibir uma mensagem de sucesso para o usuário
            Swal.fire({
                icon: 'success',
                title: 'Dados atualizados com sucesso!',
                showConfirmButton: false,
                timer: 1500
            });
        })
        .catch(error => {
            console.error('Erro ao atualizar dados do usuário:', error);
            // Exibir uma mensagem de erro para o usuário
            Swal.fire({
                icon: 'error',
                title: 'Erro ao atualizar dados do usuário',
                text: 'Ocorreu um erro ao atualizar os dados do usuário. Por favor, tente novamente mais tarde.'
            });
        });
});
