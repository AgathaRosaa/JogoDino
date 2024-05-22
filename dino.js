const dino= document.querySelector('.dino');
let position= 0;
const background= document.querySelector('.background');
let isJumping= false;

//Vai verificar se tecla acionada foi o espaço que é o 32. Caso sim, chama a função jump
function space(ev){
    if(ev.keyCode=== 32){
        if(!isJumping){
            jump();
        }
    }
}

//Função que faz o dinossauro pular de acordo com algumas regras
function jump(){
    isJumping= true;

   let upInterval= setInterval(()=> {
    if(position>=200){ //Se já tiver subido até esse numero, vamos limpar esse intervalo e criar um novo intervalo de descida
        clearInterval(upInterval);

    let dowInterval= setInterval(()=>{
        if(position<=0){ //Se já tiver descido por completo, vamos limpar esse intervalo
            isJumping=false;
            clearInterval(dowInterval);
        
        }
        else{ //Vai continuar descendo até o limite, nesse caso 0
            position-=20;
            dino.style.bottom= position + 'px';
        }

    },20)
    }

    else{ //Vai subir até o limite, nesse caso 200
        position+=20;
        dino.style.bottom = position + 'px';
    }


   }, 20)

}


//Função que cria os cactos e verifica se não deu game over
function CreateCactos(){
    const cacto= document.createElement('div');
    let cactoPosition= 1000;
    let randTime= Math.random() *6000; //Vai gerar 

    cacto.classList.add('cactos');
    background.appendChild(cacto); 

    let leftInterval= setInterval(()=>{
        if(cactoPosition<-60){ //Nessa posição já vai ter saido da tela, então vamos limpar o intervalo e apagar para não ocupar memória em vão
            clearInterval(leftInterval);
            background.removeChild(cacto);
        }
        //Condições de game over
        else if(cactoPosition> 0 && cactoPosition <60 && position<60){
            clearInterval(leftInterval)
            let text= document.body.innerHTML= `<h1 class="gameOver"> Game Over! </h1>`

        }
        else{
      //Vai andando para esquerda  
        cactoPosition -=10
        cacto.style.left = cactoPosition + 'px';
        }

    },20)

    //Vai chamar a função em tempos aleatórios que o random gerou. Para gerar cactos de forma aleatória
    setTimeout(CreateCactos,randTime);
    
}

//Chama a função para exibir as sequencias de cactos
CreateCactos()

//Ao pressionar uma tecla, chama a função space
addEventListener('keydown', space)