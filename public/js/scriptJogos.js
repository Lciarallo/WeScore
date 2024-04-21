const valueTime01 = document.getElementById("valueTime01");
const plusButtonTime01 = document.getElementById("plusTime01");
const minusButtonTime01 = document.getElementById("minusTime01");
const bola01 = document.getElementById("bolavolei01").style.opacity;
//Time a ser substituido
const subsTime01 = document.getElementById("subistituicaoTime01");
const subsTime02 = document.getElementById("subistituicaoTime02");
//Computar o estilo do css 
const compStylesSubsTime02 = window.getComputedStyle(subsTime01);
const compStylesSubsTime01 = window.getComputedStyle(subsTime02);
//Jogadores para substituição do time 01
const subsTime01jgd1 = document.getElementById("Time01jgd1");
const subsTime01jgd2 = document.getElementById("Time01jgd2");
const subsTime01jgd3 = document.getElementById("Time01jgd3");
const subsTime01jgd4 = document.getElementById("Time01jgd4");
const subsTime01jgd5 = document.getElementById("Time01jgd5");
const subsTime01jgd6 = document.getElementById("Time01jgd6");
//Jogadores para substituição do time 02
const subsTime02jgd1 = document.getElementById("Time02jgd1");
const subsTime02jgd2 = document.getElementById("Time02jgd2");
const subsTime02jgd3 = document.getElementById("Time02jgd3");
const subsTime02jgd4 = document.getElementById("Time02jgd4");
const subsTime02jgd5 = document.getElementById("Time02jgd5");
const subsTime02jgd6 = document.getElementById("Time02jgd6");
//recupera o Card de Substituição
const statusDisplayCard = document.getElementById("popupcard");
//Computar o estilo do css 
const compStyles = window.getComputedStyle(statusDisplayCard);
const closecard = document.getElementById("closecard");

const AlterStatusCard = (time) => {
  if (time == "time01"){
    document.getElementById("subistituicaoTime02").style.display = "none";
    document.getElementById("subistituicaoTime01").style.display = "flex";
  } else if (time == "time02") {
    document.getElementById("subistituicaoTime01").style.display = "none";
    document.getElementById("subistituicaoTime02").style.display = "flex";
  }
  if (compStyles.display == "none") {
    document.getElementById("popupcard").style.display = "flex";
  } else if (compStyles.display == "flex") {
    document.getElementById("popupcard").style.display = "none";
  }
};
closecard.addEventListener("click", () => {
  AlterStatusCard();
  //document.getElementById("popupcard").style.display = "none";
});
//Jogadores para substituição do time 01
subsTime01jgd6.addEventListener("click", () => {
  AlterStatusCard("time01");
});
subsTime01jgd5.addEventListener("click", () => {
  AlterStatusCard("time01");
});
subsTime01jgd4.addEventListener("click", () => {
  AlterStatusCard("time01");
});
subsTime01jgd3.addEventListener("click", () => {
  AlterStatusCard("time01");
});
subsTime01jgd2.addEventListener("click", () => {
  AlterStatusCard("time01");
});
subsTime01jgd1.addEventListener("click", () => {
  AlterStatusCard("time01");
  //document.getElementById("popupcard").style.display = "flex";
});
//Jogadores para substituição do time 02
subsTime02jgd6.addEventListener("click", () => {
  AlterStatusCard("time02");
});
subsTime02jgd5.addEventListener("click", () => {
  AlterStatusCard("time02");
});
subsTime02jgd4.addEventListener("click", () => {
  AlterStatusCard("time02");
});
subsTime02jgd3.addEventListener("click", () => {
  AlterStatusCard("time02");
});
subsTime02jgd2.addEventListener("click", () => {
  AlterStatusCard("time02");
});
subsTime02jgd1.addEventListener("click", () => {
  AlterStatusCard("time02");
  //document.getElementById("popupcard").style.display = "flex";
});


let controlet1="semponto", controlet2="semponto",rotacaot1="mantem", rotacaot2="mantem";
const updateValueTime01 = () => {
  if (countTime01 <= 9) {
    valueTime01.innerHTML = "0" + countTime01;
  } else if (countTime01 > 9) {
    valueTime01.innerHTML = countTime01;
    if (countTime01>24 && countTime01 >= (countTime02+2)) {
      console.log("time 1 ganhou");
    }
  }
};
const updateBola01 = () => {
  document.getElementById("bolavolei01").style.opacity = "1";
  document.getElementById("bolavolei02").style.opacity = "0";
};
const updateBola02 = () => {
  document.getElementById("bolavolei01").style.opacity = "0";
  document.getElementById("bolavolei02").style.opacity = "1";
};

const valueTime02 = document.getElementById("valueTime02");
const plusButtonTime02 = document.getElementById("plusTime02");
const minusButtonTime02 = document.getElementById("minusTime02");
const updateValueTime02 = () => {
  if (countTime02 <= 9) {
    valueTime02.innerHTML = "0" + countTime02;
  } else if (countTime02 > 9) {
    valueTime02.innerHTML = countTime02;
    if (countTime02>24 && countTime02 >= (countTime01+2)) {
      console.log("time 2 ganhou");
    }
  }
};

let countTime01 = 0;
let intervalIDTime01 = 0;
plusButtonTime01.addEventListener("click", () => {
  if (countTime01 >= 0 && countTime01 < 40) {
    intervalIDTime01 = countTime01 += 1;
    updateTime01();
    updateValueTime01();
    updateBola01();
    controlet1 = "ponto";
    controlet2 = "semponto"
  }
});
// Adicione um ouvinte de evento ao documento
document.addEventListener("keydown", () => {
   // Verifique se a tecla pressionada é a tecla desejada (por exemplo, tecla 'A' com código 65)
  if (countTime01 >= 0 && countTime01 < 40 && event.key === 'q') {
    intervalIDTime01 = countTime01 += 1;
    updateTime01();
    updateValueTime01();
    updateBola01();
    controlet1 = "ponto";
    controlet2 = "semponto";
  }
});
plusButtonTime01.addEventListener("mousedown", () => {
  if (countTime01 >= 0 && countTime01 < 40) {
    intervalIDTime01 = setInterval(() => {
      countTime01 += 1;
      updateTime01();
      updateValueTime01();
      updateBola01();
      controlet1 = "ponto";
      controlet2 = "semponto";
      if (countTime01 == 40) {
        clearInterval(intervalIDTime01);
      }
    }, 200);
  }
});
minusButtonTime01.addEventListener("click", () => {
  console.log(countTime01,countTime02)//Chamda de rota redução ponto api
  if (countTime01 > 0 && countTime01 <= 40) {
    intervalIDTime01 = countTime01 -= 1;
    updateMenusTime01();
    updateValueTime01();
  }
});
document.addEventListener("keydown", () => {
  // Verifique se a tecla pressionada é a tecla desejada (por exemplo, tecla 'A' com código 65)
 if (countTime01 > 0 && countTime01 <= 40 && event.key === 'a') {
    intervalIDTime01 = countTime01 -= 1;
    updateMenusTime01();
    updateValueTime01();
 }
});
minusButtonTime01.addEventListener("mousedown", () => {
  if (countTime01 > 0 && countTime01 <= 40) {
    intervalIDTime01 = setInterval(() => {
      countTime01 -= 1;
      updateMenusTime01();
      updateValueTime01();
      if (countTime01 == 40 || countTime01 == 0) {
        clearInterval(intervalIDTime01);
      }
    }, 200);
  }
});
document.addEventListener("mouseup", () => clearInterval(intervalIDTime01));


var posiocaoLeftT1 = [0,0,55,55,55, 0];
var posiocaoTopT1 =  [37.5 ,2,2,37.5,75,75];

const jogador1 = document.querySelector(".jogador1");
const jogador2 = document.querySelector(".jogador2");
const jogador3 = document.querySelector(".jogador3");
const jogador4 = document.querySelector(".jogador4");
const jogador5 = document.querySelector(".jogador5");
const jogador6 = document.querySelector(".jogador6");

jogador1.style.left = `${posiocaoLeftT1[5]}%`;
jogador1.style.top =  `${posiocaoTopT1[5]}%`;
jogador2.style.left = `${posiocaoLeftT1[4]}%`;
jogador2.style.top =  `${posiocaoTopT1[4]}%`;
jogador3.style.left = `${posiocaoLeftT1[3]}%`;
jogador3.style.top =  `${posiocaoTopT1[3]}%`;
jogador4.style.left = `${posiocaoLeftT1[2]}%`;
jogador4.style.top =  `${posiocaoTopT1[2]}%`;
jogador5.style.left = `${posiocaoLeftT1[1]}%`;
jogador5.style.top =  `${posiocaoTopT1[1]}%`;
jogador6.style.left = `${posiocaoLeftT1[0]}%`;
jogador6.style.top =  `${posiocaoTopT1[0]}%`;

const updateTime01 = () => {
  if (controlet1 == "semponto" && rotacaot1 == "mantem") {
    //Altera posição dos jogadores.
    moveLeft(posiocaoLeftT1);
    moveLeft(posiocaoTopT1);
  
    jogador1.style.left = `${posiocaoLeftT1[5]}%`;
    jogador1.style.top =   `${posiocaoTopT1[5]}%`;  
    jogador2.style.left = `${posiocaoLeftT1[4]}%`;
    jogador2.style.top =   `${posiocaoTopT1[4]}%`;  
    jogador3.style.left = `${posiocaoLeftT1[3]}%`;
    jogador3.style.top =   `${posiocaoTopT1[3]}%`;  
    jogador4.style.left = `${posiocaoLeftT1[2]}%`;
    jogador4.style.top =   `${posiocaoTopT1[2]}%`;  
    jogador5.style.left = `${posiocaoLeftT1[1]}%`;
    jogador5.style.top =   `${posiocaoTopT1[1]}%`;  
    jogador6.style.left = `${posiocaoLeftT1[0]}%`;
    jogador6.style.top =   `${posiocaoTopT1[0]}%`;
    rotacaot1 = "rotacionou";
    rotacaot2 = "mantem";
  } else {
    rotacaot1 = "mantem";
  }
};
const updateMenusTime01 = () => {  
  if (controlet1 == "ponto" && rotacaot1 == "rotacionou") {
    //Altera posição dos jogadores.
    moveRight(posiocaoLeftT1);
    moveRight(posiocaoTopT1);
    jogador1.style.left = `${posiocaoLeftT1[5]}%`;
    jogador1.style.top =   `${posiocaoTopT1[5]}%`;  
    jogador2.style.left = `${posiocaoLeftT1[4]}%`;
    jogador2.style.top =   `${posiocaoTopT1[4]}%`;  
    jogador3.style.left = `${posiocaoLeftT1[3]}%`;
    jogador3.style.top =   `${posiocaoTopT1[3]}%`;  
    jogador4.style.left = `${posiocaoLeftT1[2]}%`;
    jogador4.style.top =   `${posiocaoTopT1[2]}%`;  
    jogador5.style.left = `${posiocaoLeftT1[1]}%`;
    jogador5.style.top =   `${posiocaoTopT1[1]}%`;  
    jogador6.style.left = `${posiocaoLeftT1[0]}%`;
    jogador6.style.top =   `${posiocaoTopT1[0]}%`;
    controlet1 = "semponto";
    rotacaot1 = "mantem";
    rotacaot2 = "rotacionou";
  }
};
//Time 02
let countTime02 = 0;
let intervalIDTime02 = 0;
plusButtonTime02.addEventListener("click", () => {
  if (countTime02 >= 0 && countTime02 < 40) {
    intervalIDTime02 = countTime02 += 1;
    updateTime02();
    updateValueTime02();
    updateBola02();
    controlet2 = "ponto";
    controlet1 = "semponto";
  }
});
// Adicione um ouvinte de evento ao documento
document.addEventListener("keydown", () => {
  // Verifique se a tecla pressionada é a tecla desejada (por exemplo, tecla 'A' com código 65)
 if (countTime02 >= 0 && countTime02 < 40 && event.key === 'e') {
    intervalIDTime02 = countTime02 += 1;
    updateTime02();
    updateValueTime02();
    updateBola02();
    controlet2 = "ponto";
    controlet1 = "semponto";
 }
});
plusButtonTime02.addEventListener("mousedown", () => {
  if (countTime02 >= 0 && countTime02 < 40) {
    intervalIDTime02 = setInterval(() => {
      countTime02 += 1;
      updateTime02();
      updateValueTime02();
      updateBola02();
      controlet2 = "ponto";
      controlet1 = "semponto";
      if (countTime02 == 40) {
        clearInterval(intervalIDTime02);
      }
    }, 200);
  }
});
minusButtonTime02.addEventListener("click", () => {
  if (countTime02 > 0 && countTime02 <= 40) {
    intervalIDTime02 = countTime02 -= 1;
    updateMenusTime02();
    updateValueTime02();
  }
});
document.addEventListener("keydown", () => {
  // Verifique se a tecla pressionada é a tecla desejada (por exemplo, tecla 'A' com código 65)
 if (countTime02 > 0 && countTime02 <= 40 && event.key === 'd') {
  intervalIDTime02 = countTime02 -= 1;
  updateMenusTime02();
  updateValueTime02();
 }
});
minusButtonTime02.addEventListener("mousedown", () => {
  if (countTime02 > 0 && countTime02 <= 40) {
    intervalIDTime02 = setInterval(() => {
      countTime02 -= 1;
      updateMenusTime02();
      updateValueTime02();
      if (countTime02 == 40 || countTime02 == 0) {
        clearInterval(intervalIDTime02);
      }
    }, 200);
  }
});
document.addEventListener("mouseup", () => clearInterval(intervalIDTime02));

var posiocaoLeftT2 = [75, 75, 75, 25,  25,25];
var posiocaoTopT2 =  [ 0,37.5,75, 75,37.5, 0];
const jogador1t2 = document.querySelector(".jogador1t2");
const jogador2t2 = document.querySelector(".jogador2t2");
const jogador3t2 = document.querySelector(".jogador3t2");
const jogador4t2 = document.querySelector(".jogador4t2");
const jogador5t2 = document.querySelector(".jogador5t2");
const jogador6t2 = document.querySelector(".jogador6t2");

jogador1t2.style.left = `${posiocaoLeftT2[0]}%`;
jogador1t2.style.top =   `${posiocaoTopT2[0]}%`;
jogador2t2.style.left = `${posiocaoLeftT2[1]}%`;
jogador2t2.style.top =   `${posiocaoTopT2[1]}%`;
jogador3t2.style.left = `${posiocaoLeftT2[2]}%`;
jogador3t2.style.top =   `${posiocaoTopT2[2]}%`;
jogador4t2.style.left = `${posiocaoLeftT2[3]}%`;
jogador4t2.style.top =   `${posiocaoTopT2[3]}%`;
jogador5t2.style.left = `${posiocaoLeftT2[4]}%`;
jogador5t2.style.top =   `${posiocaoTopT2[4]}%`;
jogador6t2.style.left = `${posiocaoLeftT2[5]}%`;
jogador6t2.style.top =   `${posiocaoTopT2[5]}%`;

const updateTime02 = () => {
  if (controlet2 == "semponto" && rotacaot2 == "mantem") {
    //Altera posição dos jogadores.
    moveLeft(posiocaoLeftT2);
    moveLeft(posiocaoTopT2);

    jogador1t2.style.left = `${posiocaoLeftT2[0]}%`;
    jogador1t2.style.top =   `${posiocaoTopT2[0]}%`;
    jogador2t2.style.left = `${posiocaoLeftT2[1]}%`;
    jogador2t2.style.top =   `${posiocaoTopT2[1]}%`;
    jogador3t2.style.left = `${posiocaoLeftT2[2]}%`;
    jogador3t2.style.top =   `${posiocaoTopT2[2]}%`;
    jogador4t2.style.left = `${posiocaoLeftT2[3]}%`;
    jogador4t2.style.top =   `${posiocaoTopT2[3]}%`;
    jogador5t2.style.left = `${posiocaoLeftT2[4]}%`;
    jogador5t2.style.top =   `${posiocaoTopT2[4]}%`;
    jogador6t2.style.left = `${posiocaoLeftT2[5]}%`;
    jogador6t2.style.top =   `${posiocaoTopT2[5]}%`;
    rotacaot2 = "rotacionou";
    rotacaot1 = "mantem";
  } else {
    rotacaot2 = "mantem";
  }
};
const updateMenusTime02 = () => {
  if (controlet2 == "ponto" && rotacaot2 == "rotacionou") {
    //Altera posição dos jogadores.
    moveRight(posiocaoLeftT2);
    moveRight(posiocaoTopT2);

    jogador1t2.style.left = `${posiocaoLeftT2[0]}%`;
    jogador1t2.style.top =   `${posiocaoTopT2[0]}%`;
    jogador2t2.style.left = `${posiocaoLeftT2[1]}%`;
    jogador2t2.style.top =   `${posiocaoTopT2[1]}%`;
    jogador3t2.style.left = `${posiocaoLeftT2[2]}%`;
    jogador3t2.style.top =   `${posiocaoTopT2[2]}%`;
    jogador4t2.style.left = `${posiocaoLeftT2[3]}%`;
    jogador4t2.style.top =   `${posiocaoTopT2[3]}%`;
    jogador5t2.style.left = `${posiocaoLeftT2[4]}%`;
    jogador5t2.style.top =   `${posiocaoTopT2[4]}%`;
    jogador6t2.style.left = `${posiocaoLeftT2[5]}%`;
    jogador6t2.style.top =   `${posiocaoTopT2[5]}%`;
    controlet2 = "semponto";
    rotacaot2 = "mantem";
    rotacaot1 = "rotacionou";
  }
};

// Função para mover os elementos do vetor para a direita
function moveRight(arr) {
  const lastElement = arr.pop();
  arr.unshift(lastElement);
}

// Função para mover os elementos do vetor para a esquerda
function moveLeft(arr) {
  const firstElement = arr.shift();
  arr.push(firstElement);
}
// Obtenha todos os botões com atributo 'data-target'
const alterCards = document.querySelectorAll("[data-target]");

// Adicione um evento de clique a cada botão
alterCards.forEach(alterCard => {
  alterCard.addEventListener("click", () => {
    // Oculte todos os elementos
    document.querySelectorAll("#cartoes, #quadradejogos, #substituicao").forEach(element => {
      element.style.display = "none";
    });
    
    // Mostre o elemento correspondente com base no atributo 'data-target'
    const targetId = alterCard.getAttribute("data-target");
    document.getElementById(targetId).style.display = "block";
  });
});