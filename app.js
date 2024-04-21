const tbody = document.getElementById('table_body');
const input = document.getElementsByTagName('input');
const btn = document.getElementById('btn');

function Sala(id, abrv, designacao, funcional, nao_funcional) {
    this.id = id;
    this.abrv = abrv;
    this.designacao = designacao;
    this.funcional = funcional;
    this.nao_funcional = nao_funcional;
    this.total = this.funcional + this.nao_funcional;
}

let sala_teorica = new Sala("1","sala_teorica","Sala de Aula Teórica", 0, 0);
let lab_informatica = new Sala("2","lab_informatica","Laboratório de Informática", 1, 1);
let lab_automacao = new Sala("3","lab_automacao","Laboratório de Automação", 1, 1);
let lab_biologia = new Sala("4","lab_biologia","Laboratório de Biologia", 2, 1);
let lab_cad = new Sala("5","lab_cad","Laboratório de CAD", 1, 1);
let lab_cnc = new Sala("6","lab_cnc","Laboratório de CNC", 1, 1);

let salas = new Array(sala_teorica, lab_automacao, lab_informatica, lab_biologia, lab_cad);
salas.push(lab_cnc);

salvarNoLocalStorage();

function salvarNoLocalStorage(){
    salas.forEach((sala)=>{
        if(localStorage.getItem(sala.abrv) === null){
            localStorage.setItem(sala.abrv, JSON.stringify(sala));
        }
    });
}

function criarElementoTr(lab){
    const tr = document.createElement('tr');
    const td_designacao = document.createElement('td');
    const td_1 = document.createElement('td');
    const td_2 = document.createElement('td');
    const td_3 = document.createElement('td');
    const input_funciona = document.createElement('input');
    const input_nao_funciona = document.createElement('input');
    const input_total = document.createElement('input');

    if(lab.abrv === "sala_teorica"){
        input_funciona.disabled = true;
        input_nao_funciona.disabled = true
    }

    input_funciona.type = 'number';
    input_funciona.name = lab.abrv;
    input_funciona.min = 0;
    input_funciona.classList = 'count';
    input_funciona.value = lab.funcional;

    input_nao_funciona.type = 'number';
    input_nao_funciona.name = lab.abrv;
    input_nao_funciona.id = lab.id;
    input_nao_funciona.min = 0;
    input_nao_funciona.classList = 'count';
    input_nao_funciona.value = lab.nao_funcional;

    input_total.type = 'number';
    input_total.name = lab.abrv;
    input_total.id = lab.id;
    input_total.min = 0;
    input_total.classList = 'count';
    input_total.value = lab.total;

    td_1.appendChild(input_funciona);
    td_2.appendChild(input_nao_funciona);
    td_3.appendChild(input_total);

    td_designacao.textContent = lab.designacao;

    tr.appendChild(td_designacao);
    tr.appendChild(td_1);
    tr.appendChild(td_2);
    tr.appendChild(td_3);
    tbody.appendChild(tr);
}

mostarLabs();

function mostarLabs(){
    let nome, sala, lab;
    for (let i = 0; i < localStorage.length; i++) {
        nome = localStorage.key(i);
        sala = localStorage.getItem(nome);
        lab = JSON.parse(sala);
        criarElementoTr(lab);
    }
}

let input_clicado = [];

function inputClicado(e){
    if(e.target.classList.contains('count')){
        if(!input_clicado.includes(e.target.name)){
            input_clicado.push(e.target.name);
        }
    }
}

tbody.addEventListener('click', inputClicado);

function atualizarSala(){
    input_clicado.forEach((sala)=>{
        let salaFromStorage = localStorage.getItem(sala)
        let lab = JSON.parse(salaFromStorage);
        lab.funcional = input[lab.abrv].value;
        lab.nao_funcional = document.getElementById(lab.id).value;
        console.log(input[lab.id].value)
        lab.total = parseInt(lab.funcional) + parseInt(lab.nao_funcional);
        localStorage.setItem(sala, JSON.stringify(lab));

        console.log(document.getElementById(lab.id).value)
    });

    window.location.reload();
    mostarLabs();
}

btn.addEventListener('click', atualizarSala);
