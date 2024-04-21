const url = "http://localhost:3001/";


///     FUNÇÕES DO CADASTRO DE CAMPEONATO     ///

// Função de validação do formulário
function validateForm(formData) {
    const name = formData.get('nomeCampeonato');
    const file = formData.get('logoCampeonato');

    // Validar campos preenchidos. Se algum campo estiver vazio, exibir mensagem de erro
    if (!name || !file) {
        // Exibir mensagem de erro para o usuário
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, preencha todos os campos obrigatórios!',
        });
        return false; // Impede o envio do formulário
    }

    // Validar a imagem. Se a extensão do arquivo não for uma imagem, exibir mensagem de erro
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const imageExtension = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(`.${imageExtension}`)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'A imagem deve ser um arquivo de imagem válido [jpg, jpeg, png, gif]!',
        });
        return false;
    }

    return true; // Todos os campos estão preenchidos corretamente
}
// Função para obeter o IdUsuario Do Seu LocalStorage
function obterIdUsuarioLocalStorage() {
    return localStorage.getItem('userId');
}

// Evento quando o botão "Salvar" de criação é clicado
document.querySelector('#saveCampeonatoForm').addEventListener('click', function () {
    // Obter os dados do formulário de criação
    const formData = new FormData(document.querySelector('#createCampeonatoForm'));
    // Adicionar o idUsuario ao formData aqui
    const idUsuario = obterIdUsuarioLocalStorage();
    formData.append('idUsuario', idUsuario);

    // Chama a função de validação antes de enviar a solicitação POST
    if (validateForm(formData)) {

    //busca o token armazenado no login
    const token = localStorage.getItem('token');

    // Configurar o cabeçalho com a autorizção do token
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };
    // Fazer uma solicitação POST para criar um novo banner
    axios.post(`${url}campeonato/create`, formData, config)
        .then(response => {
            Swal.fire({
                icon: 'success',
                title: 'Campeonato criado com sucesso',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                // Após o tempo definido (1500 ms), redirecione para a página cursos
                window.location.href = `../campeonato/`;
            });
        })
        .catch(error => {
            console.error(error);
            if (error.response) {
                const { data, status } = error.response;
                Swal.fire({
                    icon: 'error',
                    title: `${data.message}`,
                    text: `Erro ${status} ` || 'Erro desconhecido',
                });
            } else if (error.request) {
                // A solicitação foi feita, mas não houve resposta do servidor
                console.error('Sem resposta do servidor');
            } else {
                // Algo aconteceu durante a configuração da solicitação que acionou um erro
                console.error('Erro na configuração da solicitação', error.message);
            }
        });
    }
});


  function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const imageExtension = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(`.${imageExtension}`)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'A imagem deve ser um arquivo de imagem válido [jpg, jpeg, png, gif]!',
        });
        return false;
    }

    // First time - remove the prompt
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
      dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }

    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
      thumbnailElement = document.createElement("div");
      thumbnailElement.classList.add("drop-zone__thumb");
      dropZoneElement.appendChild(thumbnailElement);
    }

    thumbnailElement.dataset.label = file.name;

    // Show thumbnail for image files
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
      };
    } else {
      thumbnailElement.style.backgroundImage = null;
    }
  }
