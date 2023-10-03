const sContainer = document.querySelector('.container');
const sNome = document.querySelector('#nome');
const sQuantidade = document.querySelector('#quantidade');
const sCategoria = document.querySelector('#categoria');
const sLocal = document.querySelector('#local');

let itens;
let id;

//FUNÇÃO PARA ABRIR PAGINA DE EDIÇÃO:
function abrirPaginaEdicao() {
    var urlPagina = 'edicao.html'
    window.location.href = urlPagina;
}

//botaoSalvar.onclick = e => {
//BOTAO PARA SALVAR UM PRODUTO
function btnSalvar() {
    if (sNome.value == '' || sQuantidade.value == '' || sCategoria.value == '' || sLocal.value == '') {
        return
    }
    if (id !== undefined) {
        itens[id].nome = sNome.value;
        itens[id].quantidade = sQuantidade.value;
        itens[id].categoria = sCategoria.value;
        itens[id].local = sLocal.value;
    } else {
        itens.push({'nome': sNome.value,
                    'quantidade': sQuantidade.value,
                    'categoria': sCategoria.value,
                    'local': sLocal.value});
    }
    console.log(itens);
    setItensBD(itens);
    console.log(itens);
    carregarItens();
    id = undefined;

    console.log(sNome.value);    

    document.getElementById("meuFormulario").submit();
}

//FUNÇÃO PARA INSERIR DIV PERSONALIZADAS NA PAGINA HTML
function inserirItem (item, index) {
    // Crie um elemento div
const divProduto = document.createElement("div");
divProduto.id = "listaProdutos";
divProduto.className = "produto"; // Adicione a classe CSS se necessário

// Crie o container de imagem
const divContainerImg = document.createElement("div");
divContainerImg.id = "containerImg";

// Crie a imagem
const img = document.createElement("img");
img.id = "imagem";
img.src = "Imagens/img2_padrao.png";

// Adicione a imagem ao container de imagem
divContainerImg.appendChild(img);

// Crie o container de informações
const divContainerInfo = document.createElement("div");
divContainerInfo.id = "containerInfo";

// Crie os botões de excluir e editar
const btnExcluir = document.createElement("button");
btnExcluir.id = "btnExcluir";
btnExcluir.onclick = deletarItem(index)
const iconExcluir = document.createElement("i");
iconExcluir.className = "fa fa-trash";
btnExcluir.appendChild(iconExcluir);

const btnEditar = document.createElement("button");
btnEditar.id = "btnEditar";
const iconEditar = document.createElement("i");
iconEditar.className = "fa fa-pencil";
btnEditar.appendChild(iconEditar);

// Crie as informações de texto
const txtNome = document.createElement("div");
txtNome.className = "info";
txtNome.id = "txtNome";
txtNome.textContent = 'Nome: ' + item.nome ;

const txtQuantidade = document.createElement("div");
txtQuantidade.className = "info";
txtQuantidade.id = "txtQtd";
txtQuantidade.textContent = "Quantidade: " + item.quantidade ;

const txtLocal = document.createElement("div");
txtLocal.className = "info";
txtLocal.id = "txtLocal";
txtLocal.textContent = "Local: " + item.local;

const txtCategoria = document.createElement("div");
txtCategoria.className = "info";
txtCategoria.id = "txtCategoria";
txtCategoria.textContent = "Categoria: " + item.categoria;

// Adicione todos os elementos ao container de informações
divContainerInfo.appendChild(btnExcluir);
divContainerInfo.appendChild(btnEditar);
divContainerInfo.appendChild(txtNome);
divContainerInfo.appendChild(txtQuantidade);
divContainerInfo.appendChild(txtLocal);
divContainerInfo.appendChild(txtCategoria);

// Adicione o container de imagem e o container de informações à div do produto
divProduto.appendChild(divContainerImg);
divProduto.appendChild(divContainerInfo);

// Adicione a div do produto ao documento HTML
sContainer.appendChild(divProduto);
}

//FUNÇÃO PARA DELETER ITEM
function deletarItem(index) {
    itens.splice(index, 1)
    setItensBD();
    carregarItens();
}

//FUNÇÃO PARA QUANDO A LISTA ESTIVER VAZIA
function listaVazia() {
    const listaVazia = document.createElement('h3');
    listaVazia.innerHTML = 
    ' Lista Vazia ';
    sContainer.appendChild(listaVazia);
}

//FUNÇÃO PARA EXIBIR OS ITENS SALVO NA LISTA
function carregarItens() {
    itens = getItensBD();
        itens.forEach((item, index) => {
            inserirItem(item, index);
        });
    }
        //sContainer.innerHTML = ''; //Limpa o container antes de adicionar os itens
        //console.log(itens); 
    

//FUNÇÃO DO BANCO DE DADOS, SALVAR E LISTAR
const getItensBD = () => JSON.parse(localStorage.getItem('produtosDB')) ?? [];
//const setItensBD = () => localStorage.setItem('produtosDB', JSON.stringify(itens));
function setItensBD(itens) {
    return localStorage.setItem('produtosDB', JSON.stringify(itens));
}

//CHAMANDO A FUNÇÃO PARA SER CARREGA
carregarItens();
//localStorage.clear();