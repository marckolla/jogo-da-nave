//variáveis globais.
var diryj,dirxj,jog,velj,pjx,pjy;
var tamtelaw,tamtelah;
var jogo;
var velt;
var frames;
var contbombas,painelcontbombas,velb,tmpcriabomba;
var bombastotal;
var vidaplaneta,barraplaneta;
var ie,isom;
var telamsg;

function tecladw(){
    var tecla = event.keyCode;
    if(tecla == 38){//cima
        diryj =- 1;
    }else 
    if(tecla == 40){//baixo
        diryj = 1;
    }else
    if(tecla == 37){//esquerda
        dirxj =-1;
    }else 
    if(tecla == 39){//direita
        dirxj =1;
    }else
    if(tecla == 32){//espaço / tiro
        atira(pjx + 17,pjy)
    }


}
function teclaup(){
    var tecla = event.keyCode;
    if((tecla == 38) || (tecla == 40)){
        diryj = 0;
    }else 
    if((tecla == 37) || (tecla ==39)){
        dirxj = 0;
    }
}
function criabomba(){
    if(jogo){
        var y = 0;
        var x = Math.random() * tamtelaw;
        var bomba = document.createElement("div");
        var att1 = document.createAttribute("class");
        var att2 = document.createAttribute("style");
        att1.value = "bomba";
        att2.value = "top:" + y + "px;left:" + x + "px;";
        bomba.setAttributeNode(att1);
        bomba.setAttributeNode(att2);
        document.body.appendChild(bomba);
        contbombas--;
    }
}
function controlabomba(){
    bombastotal = document.getElementsByClassName("bomba");
    var tam = bombastotal.length;
    for(var i = 0;i < tam;i++){
        if(bombastotal[i]){
            var pi = bombastotal[i].offsetTop;
            pi += velb;
            bombastotal[i].style.top = pi + "px";
            if(pi > tamtelah){
                vidaplaneta -= 10;
                criaexplosao(2,bombastotal[i].offsetLeft,null);
                bombastotal[i].remove();
            }
        }
    }
}
function atira(x,y){
    var t = document.createElement("div");
    var att1 = document.createAttribute("class");
    var att2 = document.createAttribute("style");
    att1.value = "tirojog";
    att2.value = "top:" + y +"px;left:" + x + "px";
    t.setAttributeNode(att1);
    t.setAttributeNode(att2);
    document.body.appendChild(t);
}

function controletiros(){
    var tiros = document.getElementsByClassName("tirojog");
    var tam = tiros.length;
    for(var i = 0;i < tam;i++){
        if(tiros[i]){
            var pt = tiros[i].offsetTop;
            pt -= velt;
            tiros[i].style.top = pt + "px"; 
            colisaotirobomba(tiros[i]);
            if(pt < 0){
                tiros[i].remove();
            }
        }
    }
}
function colisaotirobomba(tiro){
    var tam =bombastotal.length;
    for(i = 0;i < tam;i++){
        if(bombastotal[i]){
            if(
                (
                    (tiro.offsetTop <= (bombastotal[i].offsetTop + 40))&& //parte cima tiro cpm baixo da bomba
                    ((tiro.offsetTop + 6) >= (bombastotal[i].offsetTop)) //parte baixo tiro com cima bomba
                )
                &&
                (
                    (tiro.offsetLeft <= (bombastotal[i].offsetLeft + 24))&&//esquerda tiro com direta bomba
                    ((tiro.offsetLeft + 6) >= (bombastotal[i].offsetLeft)) //dieita tiro com esquerda bomba 
                )
            ){
                criaexplosao(1,bombastotal[i].offsetLeft - 25,bombastotal[i].offsetTop);
                bombastotal[i].remove();
                tiro.remove();
            }
        }
    }
}

function criaexplosao(tipo,x,y){ //tipo 1 = ar; 2 chao/terra
    if(document.getElementById("explosao" + (ie - 1))){
        document.getElementById("explosao" + (ie - 1)).remove();  
    }
    var explosao = document.createElement("div");
    var img = document.createElement("img");
    var som = document.createElement("audio");
    //atributos para div
    var att1 = document.createAttribute("class");
    var att2 = document.createAttribute("style");
    var att3 = document.createAttribute("id");
    //atributos para imagem
    var att4 = document.createAttribute("src");
    //atributos para audio
    var att5 = document.createAttribute("src");
    var att6 = document.createAttribute("id");
    att3.value = "explosao" + ie;
    if(tipo == 1){
        att1.value = "explosaoar";
        att2.value = "top:" + y + "px;left:" + x + "px;";
        att4.value = "explosaoar.gif" //new date
    }else{
        att1.value = "explosaochao";
        att2.value = "top:" + (tamtelah - 57) + "px;left:" + (x - 17) +"px;";
        att4.value = "explosaochao.gif" //new date
    }
    att5.value = "exp1.mp3?" + new Date();
    att6.value = "som" + isom;
    explosao.setAttributeNode(att1);
    explosao.setAttributeNode(att2);
    explosao.setAttributeNode(att3);
    img.setAttributeNode(att4);
    som.setAttributeNode(att5);
    som.setAttributeNode(att6);
    explosao.appendChild(img);
    explosao.appendChild(som);
    document.body.appendChild(explosao);
    document.getElementById("som" + isom).play();
    ie++;
    isom++;
    
    

}

function controlajogador(){
    pjy += diryj * velj;
    pjx += dirxj * velj;
    jog.style.top = pjy + "px";
    jog.style.left = pjx + "px";
}
function gerenciagame(){
    barraplaneta.style.width = vidaplaneta + "px";
    if(contbombas <= 0){
        jogo = false;
        clearInterval(tmpcriabomba);
        telamsg.style.backgroundImage = "url('vitoria.jpg')";
        telamsg.style.width = 760 + "px";
        telamsg.style.height = 542 + "px";
        telamsg.style.display = "block";
    }
    if(vidaplaneta <= 0){
        jogo = false;
        clearInterval(tmpcriabomba);
        telamsg.style.backgroundImage = "url('derrota.jpg')";
        telamsg.style.width = 654 + "px";
        telamsg.style.height = 506 + "px";
        telamsg.style.display = "block";
    }
}
function gameloop(){
    if(jogo){
        //funções de controle.
        controlajogador();
        controletiros();
        controlabomba();
    }
    gerenciagame();
    frames = requestAnimationFrame(gameloop);
}
function reinicia(){
    bombastotal = document.getElementsByClassName("bomba");
    var tam = bombastotal.length;
    for(var i = 0;i < tam;i++){
        if(bombastotal[i]){
            bombastotal[i].remove();
        }
    }
    telamsg.style.display = "none";
    clearInterval(criabomba);
    cancelAnimationFrame(frames);
    vidaplaneta = 300;
    pjx = tamtelaw/2;
    pjy = tamtelah/2;
    jog.style.top = pjy + "px";
    jog.style.left = pjx + "px";
    contbombas = 150;
    jogo = true;
    tmpcriabomba = setInterval(criabomba,1700);
    gameloop();

}
function inicia(){

    jogo = false;

    //ini tela
    tamtelah = window.innerHeight;
    tamtelaw = window.innerWidth;

    //ini jogador
    dirxj = diryj = 0;
    pjx = tamtelaw/2;
    pjy = tamtelah/2;
    velj = velt = 5;
    jog = document.getElementById("navejog");
    jog.style.top = pjy + "px";
    jog.style.left = pjx + "px";
    //controles das bombas
   
    contbombas = 150;
    velb = 3;
    

    //controls do planeta
    vidaplaneta = 300;
    barraplaneta = document.getElementById("barraplaneta");
    barraplaneta.style.width = vidaplaneta + "px";
    //conttroles de explosao
    ie = 0;
    isom = 0;

    //telas
    telamsg = document.getElementById("telamsg");
    telamsg.style.backgroundImage ="url('intro.jpg')";
    telamsg.style.display = "block";
    telamsg.style.width = 720 + "px";
    telamsg.style.height = 620 + "px";
    telamsg.style.top = 10 + "px";
    document.getElementById("btnjogar").addEventListener("click",reinicia)
    
}

window.addEventListener("load",inicia);
document.addEventListener("keydown",tecladw); 
document.addEventListener("keyup",teclaup);
