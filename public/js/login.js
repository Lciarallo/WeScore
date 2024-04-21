
const url = "http://localhost:3001/"
const urlSPA = "http://localhost:3002/"

const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const container = document.getElementById("logincontainer");

registerButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

loginButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

function validateForm(formData) {
  // Obtenha os valores dos campos
  const email = formData.get('email');
  const senha = formData.get('senha');

  // Valide o campo de e-mail
  if (!email || !email.trim()) {
    showErrorAlert('Por favor, preencha o campo de e-mail.');
    return false; // Impede o envio do formulário
  } else if (!isValidEmail(email)) {
    showErrorAlert('Por favor, insira um endereço de e-mail válido.');
    return false; // Impede o envio do formulário
  }

  // Valide o campo de senha
  if (!senha || !senha.trim()) {
    showErrorAlert('Por favor, preencha o campo de senha.');
    return false; // Impede o envio do formulário
  } else if (senha.length < 6) {
    showErrorAlert('A senha deve ter pelo menos 6 caracteres.');
    return false; // Impede o envio do formulário
  }

  return true; // Todos os campos estão preenchidos corretamente
}

// Função auxiliar para validar o formato de e-mail
function isValidEmail(email) {
  // Use uma expressão regular simples para validar o formato do e-mail
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
}

// Função para exibir mensagens de erro usando SweetAlert
function showErrorAlert(message) {
  const divErro = document.getElementById('erro');
  divErro.textContent = '! ' + message;
}



// Função chamada quando o botão "Salvar" do formulário de login é clicado
function loginClick(event) {
  event.preventDefault(); // Evita o envio padrão do formulário

  // Obtém os dados do formulário de login
  const formData = new FormData(document.querySelector('#LoginForm'));

  // Chama a função de validação antes de enviar a solicitação POST
  if (validateForm(formData)) {
    // Serializa os dados do formulário para formato URL encoded
    const serializedData = new URLSearchParams(formData).toString();

    // Configura o cabeçalho Content-Type
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    // Faz uma solicitação POST para fazer o login do usuário
    axios.post(`${urlSPA}login/`, serializedData, config)
      .then(response => {
        //console.log(response.data);
        // Armazena o token e dados de usuario de resposta no localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('userName', response.data.userName);
        localStorage.setItem('userMail', response.data.userMail);
        localStorage.setItem('userLogo', response.data.userLogo);
        const token = localStorage.getItem('token');
        console.log("Token: "+ token);
        // Redireciona para a página inicial do cms
        window.location.href = `/painelws`;
      })
      .catch(error => {
        // Caso o SPA retorne algum erro, mostra a mensagem para o susuário usando o sweet alert.
        const mensagem = error.response.data.error;
        showErrorAlert(mensagem);
        // console.error(error);
      });
  }
}

// Função para adicionar um evento de tecla ao campo de senha (No enter aciona o botão login)
document.getElementById("password").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    // Se a tecla "Enter" for pressionada, clique no botão de login
    document.getElementById("LoginButton").click();
  }
});