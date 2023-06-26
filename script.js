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
const btPesq = document.querySelector(".btBusca");
const campoBusca = document.querySelector(".campoBusca");
const sugestoes = document.querySelector(".sugestoes");
const warn = document.querySelector(".warn");
const editWarn = document.querySelector(".editWarn");

var salvaAdc = []; 
var salvaAdcHTML = [];

document.addEventListener("DOMContentLoaded", function(){
    if(localStorage.key){
        salvaAdc = JSON.parse(localStorage.getItem("key"));
        if (salvaAdc == null){
            salvaAdc = [];
        }
        conteudo(); 
    };
})
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
    if(inpTit.value.trim() == "" || inpDesc.value.trim() == "" || inpImg.value.trim() == ""){
        warn.className = "warn-mostrar"
        setTimeout(function(){
            warn.className = "warn";
        }, 3000);
    }
    else{
        let adc = new adicionar(inpTit.value, inpDesc.value, inpImg.value);
        
        salvaAdc.push(adc);

        localStorage.setItem("key", JSON.stringify(salvaAdc));

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

        salvaAdcHTML.push(criaPost);

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
            for (var i = 0; i < salvaAdc.length; i++) {
                if (salvaAdc[i].titulo === excDiv.querySelector("h1").textContent.toLowerCase() && salvaAdc[i].descricao === excDiv.querySelector("p").textContent.toLowerCase()) {
                  salvaAdc.splice(i, 1);
                  salvaAdcHTML.splice(i, 1);
                  break;
                }
              }
              localStorage.setItem("key", JSON.stringify(salvaAdc));
        });
        editBt.addEventListener("click", function(){

            edit.className = "edit-mostrar";
            
            var divPai = this.parentNode;

            let editTit = divPai.querySelector("h1");
            let descTit = divPai.querySelector("p");
            let imgTit = divPai.querySelector("img");

            inpEditTit.value = editTit.innerHTML;
            inpEditDesc.value = descTit.innerHTML;
            inpEditImg.value = imgTit.src;

            
            att.addEventListener("click", function(){
                if(inpEditTit.value.trim() == "" || inpEditDesc.value.trim() == "" || inpEditImg.value.trim() == ""){
                    editWarn.className = "editWarn-mostrar";
                    setTimeout(function(){
                        editWarn.className = "editWarn";
                    }, 3000);
                }
                else{
                    var oldTit = tit.innerHTML;
                    var oldDesc = desc.innerHTML;

                    var novoTit = inpEditTit.value;
                    var novoDesc = inpEditDesc.value;
                    var novaImg = inpEditImg.value;
    
                    tit.innerHTML = novoTit;
                    desc.innerHTML = novoDesc;
                    imgTit.src = novaImg;

                    for (var i = 0; i < salvaAdc.length; i++) {
                        if (salvaAdc[i].titulo === oldTit && salvaAdc[i].descricao === oldDesc) {
                          salvaAdc[i].titulo = novoTit;
                          salvaAdc[i].descricao = novoDesc;
                          salvaAdc[i].link = novaImg;
                          console.log(1);
                          break;
                        }
                    }

                    localStorage.setItem("key", JSON.stringify(salvaAdc));
                }
            });
        })
    }
})
campoBusca.addEventListener("input", function() {
    var pesquisa = campoBusca.value.toLowerCase();
  
    var postagensFiltradas = salvaAdcHTML.filter(function(postagem) {
      var titulo = postagem.querySelector("h1").textContent.toLowerCase();
      var descricao = postagem.querySelector("p").textContent.toLowerCase();

      return titulo.includes(pesquisa) || descricao.includes(pesquisa);
    });
  
    postagens.querySelectorAll("div").forEach(function(div){
        div.className = "esconder";
    })

    postagensFiltradas.forEach(function(postagem) {
      postagem.className = "classDin";
    });
  });

  function conteudo(){
    for(let i=0; i<salvaAdc.length; i++){
        let criaPost = document.createElement("div");
        let tit = document.createElement("h1");
        let desc = document.createElement("p");
        let img = document.createElement("img");
        let exc = document.createElement("button");
        let pExc = document.createElement("p");
        let editBt = document.createElement("button");
        let pEdit = document.createElement("p");

        tit.innerHTML = salvaAdc[i].titulo;
        desc.innerHTML = salvaAdc[i].descricao;
        img.src = salvaAdc[i].link;
        pEdit.textContent = "Editar";
        pExc.textContent = "Excluir";
        criaPost.classList.add("classDin");

        salvaAdcHTML.push(criaPost);

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
            for (var i = 0; i < salvaAdc.length; i++) {
                if (salvaAdc[i].titulo === excDiv.querySelector("h1").textContent && salvaAdc[i].descricao === excDiv.querySelector("p").textContent) {
                  salvaAdc.splice(i, 1);
                  break;
                }
              }
              localStorage.setItem("key", JSON.stringify(salvaAdc));
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

                for (var i = 0; i < salvaAdc.length; i++) {
                    if (salvaAdc[i].titulo === novoTit && novoDesc === descTit.innerHTML) {
                      salvaAdc[i].titulo = novoTit;
                      salvaAdc[i].descricao = novoDesc;
                      salvaAdc[i].link = novaImg;
                      break;
                    }
                }
                localStorage.setItem("key", JSON.stringify(salvaAdc));
            });
        })
    }
  }
  
  //Classes 
  //Commit's
