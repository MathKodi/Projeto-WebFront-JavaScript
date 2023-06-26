const botao = document.querySelector(".botaoadiciona");
const caixinha = document.querySelector(".dialog");
const edit = document.querySelector(".edit");
const sair = document.querySelector(".sair");
const editSair = document.querySelector(".editSair");
const adiciona = document.querySelector(".adc");
const att = document.querySelector(".att");
const inpTit = document.querySelector(".inpTit");
const inpDesc = document.querySelector(".inpDesc");
const inpImg = document.querySelector(".inpImg");
const inpEditTit = document.querySelector(".inpEditTit");
const inpEditDesc = document.querySelector(".inpEditDesc");
const inpEditImg = document.querySelector(".inpEditImg");
const postagens = document.querySelector(".postagens");
var salvaAdc = []; 

botao.addEventListener("click",function(){
    caixinha.className = "dialog-mostrar";
    inpTit.value = "";
    inpDesc.value = "";
    inpImg.value = "";
});
sair.addEventListener("click", function(){
    caixinha.className = "dialog";
});
editSair.addEventListener("click", function(){
    edit.className = "edit";
});
function adicionar(titulo, descricao, link){
    this.titulo = titulo;
    this.descricao = descricao;
    this.link = link;
}
adiciona.addEventListener("click", function(){
    let adc = new adicionar(inpTit.value, inpDesc.value, inpImg.value);
    
    salvaAdc.push(adc);

    localStorage.setItem("key", salvaAdc);

    let criaPost = document.createElement("div");
    let tit = document.createElement("h1");
    let desc = document.createElement("p");
    let img = document.createElement("img");
    let exc = document.createElement("button");
    let pExc = document.createElement("p");
    let editBt = document.createElement("button");
    let pEdit = document.createElement("p");

    tit.innerHTML = adc.titulo;
    desc.innerHTML = adc.descricao;
    img.src = adc.link;
    pEdit.textContent = "Editar";
    pExc.textContent = "Excluir";
    criaPost.classList.add("classDin");

    exc.appendChild(pExc);
    editBt.appendChild(pEdit);
    criaPost.appendChild(tit);
    criaPost.appendChild(desc);
    criaPost.appendChild(img);
    criaPost.appendChild(exc);
    criaPost.appendChild(editBt);
    postagens.appendChild(criaPost);

    exc.addEventListener("click", function(){
        var excDiv = this.parentNode;
        if (excDiv.classList.contains("classDin")){
            excDiv.parentNode.removeChild(excDiv);
        }
    });
    editBt.addEventListener("click", function(){

        edit.className = "edit-mostrar";
        
        var divPai = this.parentNode;

        var editTit = divPai.querySelector("h1");
        var descTit = divPai.querySelector("p");
        var imgTit = divPai.querySelector("img");

        inpEditTit.value = editTit.innerHTML;
        inpEditDesc.value = descTit.innerHTML;
        inpEditImg.value = imgTit.src;

        att.addEventListener("click", function(){
            var novoTit = inpEditTit.value;
            var novoDesc = inpEditDesc.value;
            var novaImg = inpEditImg.value;

            tit.innerHTML = novoTit;
            desc.innerHTML = novoDesc;
            imgTit.src = novaImg;

        });
    })
    
});


