//let titulo = document.querySelector('h1');
//titulo.innerHTML ='jogo do numero secreto';

//let paragrafo = document.querySelector ('p');
//paragrafo.innerHTML = 'escolha um numero entre 1 e 10';

let listaDenumerosSorteados = [];
let limitNumero = 10;
let numeroSecreto = gerarNumeroAleatorio();
console.log(numeroSecreto);
let tentativas = 1;

function exibirTextoNaTela (tag,texto) {
    let campo = document.querySelector (tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,'Brazilian Portuguese Female',{
        rate:1.2});
}

function exibirSmsInicial() {
    exibirTextoNaTela ('h1', 'O jogo do número secreto');
    exibirTextoNaTela ('p', 'Escolha um número entre 1 e 10');
}
exibirSmsInicial();


function verificarChute(){
    let chute = document.querySelector('input').value;
   if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1? 'tentativas' : 'tentativa';
        let smsTentativas = `Voce descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p',smsTentativas );
        document.getElementById('reiniciar').removeAttribute('disabled');
   } else {
    if (chute > numeroSecreto){
        exibirTextoNaTela('p', 'O número secreto é menor');
    } else {
        exibirTextoNaTela('p', 'O número secreto é maior');
    }
   tentativas++;}  
   limparCampo();
}

function gerarNumeroAleatorio () {
  let numeroEscolhido =  parseInt (Math.random() * limitNumero + 1);
  let quantidadeDeElementosNaLista = listaDenumerosSorteados.length;

  if (quantidadeDeElementosNaLista == limitNumero); {
       listaDenumerosSorteados = [];
    }


  if (listaDenumerosSorteados.includes(numeroEscolhido)){
      return gerarNumeroAleatorio();
  } else {
    listaDenumerosSorteados.push(numeroEscolhido);
    console.log(listaDenumerosSorteados);
    return numeroEscolhido;
  }
} 

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirSmsInicial();
    document.getElementById('reiniciar').setAttribute('disable', true);
}