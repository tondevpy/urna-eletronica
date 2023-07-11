let seuVotoPara = document.querySelector('.d-1-1 span')
let cargo = document.querySelector('.d-1-2 span')
let descricao = document.querySelector('.d-1-4')
let aviso = document.querySelector('.d-2')
let lateral = document.querySelector('.d-1-right')
let numeros = document.querySelector('.d-1-3')
let somNumerico = new Audio('./sounds/toquebtn.mp3')
let somConfirma = new Audio('./sounds/confirmar.mp3')
let somCorrige = new Audio('./sounds/corrige.mp3')
let vereadorEncontrado = false;
let prefeitoEncontrado = false
let etapaAtual = 0
let numeroInserido = ''

function iniciar() {
    let etapa = etapas[etapaAtual]
    let numeroHTML = ''

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHTML += '<div class="numero pisca"></div>'
        } else {
            numeroHTML += '<div class="numero"></div>'
        }
    }

    seuVotoPara.style.display = 'none'
    cargo.innerHTML = etapa.titulo
    descricao.innerHTML = ''
    aviso.innerHTML = ''
    lateral.innerHTML = ''
    numeros.innerHTML = numeroHTML
}

function updateInterface() {
    if (etapaAtual === 0) {
        let vereadorEncontrado = false;

        for (let i = 0; i < etapas[0].candidatos.length; i++) {
            let vereador = etapas[0].candidatos[i];

            if (numeroInserido === vereador.numero) {
                descricao.innerHTML = `Nome: ${vereador.nome}<br>Numero: ${vereador.numero}<br>Partido: ${vereador.partido}`;

                for (let j = 0; j < vereador.fotos.length; j++) {
                    let foto = vereador.fotos[j];
                    lateral.innerHTML += `<div><img src="./imagens/${foto.url}" alt="${foto.legenda}">${foto.legenda}</div>`;
                }

                vereadorEncontrado = true;
                aviso.innerHTML = 'Aperte a tecla: <br>Confirma para CONFIRMAR o voto <br>CORRIGE para reiniciar o voto'
                break;
            }
        }

        if (!vereadorEncontrado) {
            let meuBotao = document.getElementById('confirmar');
            meuBotao.onclick = null;
            descricao.innerHTML = `Nenhum candidato encontrado com os dados fornecidos clique em <b>CORRIGE</b>`;
            aviso.innerHTML = 'Aperte a tecla: <br>Confirma para CONFIRMAR o voto <br>CORRIGE para reiniciar o voto'
            lateral.innerHTML = '';
        } else {
            let meuBotao = document.getElementById('confirmar');
            meuBotao.onclick = confirma;
        }
    } else {
        let prefeitoEncontrado = false;

        for (let i = 0; i < etapas[1].candidatos.length; i++) {
            let prefeito = etapas[1].candidatos[i];

            if (numeroInserido === prefeito.numero) {
                descricao.innerHTML = `Nome: ${prefeito.nome}<br>Numero: ${prefeito.numero}<br>Partido: ${prefeito.partido}<br>Vice-Prefeito: ${prefeito.vice}`;

                for (let j = 0; j < prefeito.fotos.length; j++) {
                    let foto = prefeito.fotos[j];
                    lateral.innerHTML += `<div><img src="./imagens/${foto.url}" alt="${foto.legenda}">${foto.legenda}</div>`;
                }

                prefeitoEncontrado = true;
                aviso.innerHTML = 'Aperte a tecla: <br>Confirma para CONFIRMAR o voto <br>CORRIGE para reiniciar o voto'
                break;
            }
        }

        if (!prefeitoEncontrado) {
            let meuBotao = document.getElementById('confirmar');
            meuBotao.onclick = null;
            descricao.innerHTML = `Nenhum candidato encontrado com os dados fornecidos`;
            lateral.innerHTML = '';
            aviso.innerHTML = 'Aperte a tecla: <br>Confirma para CONFIRMAR o voto <br>CORRIGE para reiniciar o voto'
        } else {
            let meuBotao = document.getElementById('confirmar');
            meuBotao.onclick = confirma;
        }
    }
}

function clicou(n) {
    let numeroClicado = document.querySelector('.numero.pisca')

    if (numeroClicado !== null) {
        numeroClicado.innerHTML = n
        numeroInserido += `${n}`

        numeroClicado.classList.remove('pisca')
        if (numeroClicado.nextElementSibling !== null) {
            numeroClicado.nextElementSibling.classList.add('pisca')
        } else {
            updateInterface()
        }

    }
    somNumerico.play()
}

function confirma() {
    numeroInserido = numeroInserido.replace(/\s/g, '');
    console.log(numeroInserido);
    somConfirma.play();

    if (etapaAtual === 0) {
        etapaAtual = 1; // Avança para a próxima etapa independentemente de ter encontrado um vereador
        numeroInserido = '';
        vereadorEncontrado = false; // redefine para false
        iniciar();
    } else if (etapaAtual === 1) {
        descricao.innerHTML = `O seu voto foi efetuado com sucesso...`
        aviso.innerHTML = ''
        lateral.innerHTML = ''
        cargo.innerHTML = ''
        numeros.innerHTML = ''
    } else {
        numeroInserido = '';
        prefeitoEncontrado = false; // redefine para false
    }
}


function corrige() {
    somCorrige.play();
    numeroInserido = '';
    vereadorEncontrado = false; // redefine para false
    prefeitoEncontrado = false; // redefine para false

    let numeros = document.querySelectorAll('.numero');
    numeros.forEach(numero => {
        numero.innerHTML = '';
    });

    numeros[0].classList.add('pisca');

    updateInterface(); // Verifica se um novo candidato é encontrado
}


function branco() {
    // quando clicar aqui o voto será validado como branco
    somConfirma.play();
    numeroInserido = '';

    let numeros = document.querySelectorAll('.numero');
    numeros.forEach(numero => {
        numero.innerHTML = '';
    });

    updateInterface();
}

iniciar();

