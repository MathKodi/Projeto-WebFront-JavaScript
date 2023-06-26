/*Variaveis constantes*/
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

/*Array*/
var salvaAdc = []; 
var salvaAdcHTML = [];

document.addEventListener("DOMContentLoaded", function(){   /*Evento que ocorre quando Estrutura DOM está pronta p JavaScript*/
    if(localStorage.key){
        salvaAdc = JSON.parse(localStorage.getItem("key"));
        if (salvaAdc == null){
            salvaAdc = [];
        }
        conteudo(); 
    };
})
botao.addEventListener("click",function(){ /*Clicar no Botão "Adicionar"*/
    caixinha.className = "dialog-mostrar";
    inpTit.value = "";
    inpDesc.value = "";
    inpImg.value = "";
});
sair.addEventListener("click", function(){ /* Clicar no botão sair */
    caixinha.className = "dialog";
});
editSair.addEventListener("click", function(){ /* Clicar no botão sair */
    edit.className = "edit";
});

//Classe 
class Operacoes{
    
    adicionar(titulo, descricao, link){
        this.titulo = titulo;
        this.descricao = descricao;
        this.link = link;
    }
    excluir(div){
            if (div.classList.contains("classDin")){
                div.remove();
            }
            for (var i = 0; i < salvaAdc.length; i++) {
                if (salvaAdc[i].titulo === div.querySelector("h1").textContent && salvaAdc[i].descricao === div.querySelector("p").textContent) {
                  salvaAdc.splice(i, 1);
                  salvaAdcHTML.splice(i, 1);
                  break;
                }
            }
            localStorage.setItem("key", JSON.stringify(salvaAdc));
    }
    editar(div){
        edit.className = "edit-mostrar";
        var editTit = div.querySelector("h1").innerHTML;
        var descTit = div.querySelector("p").innerHTML;
        var imgTit = div.querySelector("img").src;
        //Recuperar valor - ponteiro
        inpEditTit.value = editTit;
        inpEditDesc.value = descTit;
        inpEditImg.value = imgTit;
        att.addEventListener("click",function(){
            if(inpEditTit.value.trim() == "" || inpEditDesc.value.trim() == "" || inpEditImg.value.trim() == ""){
                editWarn.className = "editWarn-mostrar";
                setTimeout(function(){
                    editWarn.className = "editWarn";
                }, 3000);
            }
            else{
                var novoTit = inpEditTit.value;
                var novoDesc = inpEditDesc.value;
                var novaImg = inpEditImg.value;

                div.querySelector("h1").innerHTML = novoTit;
                div.querySelector("p").innerHTML = novoDesc;
                div.querySelector("img").src = novaImg;

                for (var i = 0; i < salvaAdc.length; i++) {
                    if (salvaAdc[i].titulo == editTit && salvaAdc[i].descricao == descTit) {
                        salvaAdc[i].titulo = novoTit;
                        salvaAdc[i].descricao = novoDesc;
                        salvaAdc[i].link = novaImg;
                        break;
                    }
                }
                localStorage.setItem("key", JSON.stringify(salvaAdc));
            }
        })
    }

}

adiciona.addEventListener("click", function(){ /*Função para Adicionar um objeto*/
    if(inpTit.value.trim() == "" || inpDesc.value.trim() == "" || inpImg.value.trim() == "" ){
        warn.className = "warn-mostrar"
        setTimeout(function(){
            warn.className = "warn";
        }, 3000);
    }
    else{
        let op = new Operacoes();
        op.adicionar(inpTit.value, inpDesc.value, inpImg.value);
        //Criar elementos html
        let criaPost = document.createElement("div");
        let tit = document.createElement("h1");
        let desc = document.createElement("p");
        let img = document.createElement("img");
        let exc = document.createElement("button");
        let pExc = document.createElement("p");
        let editBt = document.createElement("button");
        let pEdit = document.createElement("p");
        //atribuir valores nos elementos
        tit.innerHTML = op.titulo;
        desc.innerHTML = op.descricao;
        img.src = op.link;
        pEdit.textContent = "Editar";
        pExc.textContent = "Excluir";
        criaPost.classList.add("classDin");
        //Salvar Conteúdo na Array e no local Storage
        salvaAdc.push(op);
        localStorage.setItem("key", JSON.stringify(salvaAdc));
        salvaAdcHTML.push(criaPost);
        //Organização dos elementos html
        exc.appendChild(pExc);
        editBt.appendChild(pEdit);
        criaPost.appendChild(tit);
        criaPost.appendChild(desc);
        criaPost.appendChild(img);
        criaPost.appendChild(exc);
        criaPost.appendChild(editBt);
        postagens.appendChild(criaPost);
        //Excluir o conteúdo 
        exc.addEventListener("click", function(){
            op.excluir(criaPost, );
        });
        //Editar o conteúdo
        editBt.addEventListener("click", function(){
            op.editar(criaPost);
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
        op = new Operacoes();
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
            op.excluir(criaPost);
        });
        editBt.addEventListener("click", function(){
            op.editar(criaPost);
            
        })
    }
  }

  //Remover do local storage enquanto excluo da pg
  //Classes 
  //Commit's
