const botao = document.querySelector(".botaoadiciona");
const caixinha = document.querySelector(".dialog");
const sair = document.querySelector(".sair");
const adiciona = document.querySelector(".adc");
const inpTit = document.querySelector(".inpTit");
const inpDesc = document.querySelector(".inpDesc");
const inpImg = document.querySelector(".inpImg");
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

    tit.innerHTML = adc.titulo;
    desc.innerHTML = adc.descricao;
    img.src = adc.link;

    criaPost.appendChild(tit);
    criaPost.appendChild(desc);
    criaPost.appendChild(img);
    criaPost.appendChild(exc);
    postagens.appendChild(criaPost);
});

exc.addEventListener("click", function(){
    document.body.removeChild(document.body.querySelector("postagens"));
});


