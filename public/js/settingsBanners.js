
// Manipulador de evento para clicar no botão quando o elemento .custum-file-upload é clicado
document.querySelector('.custum-file-upload').addEventListener('click', function() {
    document.querySelector('#file').click();

});
// Manipulador de evento para o input de arquivo


document.querySelector('#salvar').addEventListener('click', function() {

    // Criar um objeto FormData para enviar os dados do arquivo
    const formData = new FormData();

    formData.append('imgBanner', fileInput); // Renomeando para corresponder ao nome do campo esperado pelo servidor


    // Obter o token de autorização do localStorage
    const token = localStorage.getItem('token');

    // Configuração do cabeçalho com o token de autorização
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data' // Para enviar dados de formulário multipart
        }
    };

});




