const html = document.querySelector('html')
const btnCorto = document.querySelector('.app__card-button--corto')
const btnEnfoque = document.querySelector('.app__card-button--enfoque')
const btnLargo= document.querySelector('.app__card-button--largo')
const banner= document.querySelector('.app__image')
const title=document.querySelector('.app__title')
const botones = document.querySelectorAll('.app__card-button')
const inputMusica = document.querySelector('#alternar-musica')
const musica = new Audio('./sonidos/luna-rise-part-one.mp3')
const botonIniciar = document.querySelector('#start-pause')
const audioPlay = new Audio('./sonidos/play.wav')
const audioPause = new Audio('./sonidos/pause.mp3')
const audioSonidoFinal = new Audio('./sonidos/beep.mp3')
const textoBotonIniciar = document.querySelector('#start-pause span')
const cronometro = document.querySelector('#timer')
const iconoBoton = document.querySelector('.app__card-primary-butto-icon')

let tiempoMilisegundos = 1500
let idIntervalo = null

musica.loop = true;

inputMusica.addEventListener('change', ()=>{
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

btnCorto.addEventListener('click', () => {
    tiempoMilisegundos = 300
    cambiarcontexto('descanso-corto')
    btnCorto.classList.add('active')
})

btnEnfoque.addEventListener('click', () => {
    tiempoMilisegundos = 1500
    cambiarcontexto('enfoque')
    btnEnfoque.classList.add('active')
})

btnLargo.addEventListener('click', () => {
    tiempoMilisegundos = 900
    cambiarcontexto('descanso-largo')
    btnLargo.classList.add('active')
})

function cambiarcontexto(contexto){

    mostrarCronometro()
    botones.forEach(function(contexto){
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src',`./imagenes/${contexto}.png`)

   switch (contexto) {
    case "enfoque":
        title.innerHTML = `
        Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
        break;
    case "descanso-corto":
        title.innerHTML = `
        ¿Qué tal tomar un respiro?
        <strong class="app__title-strong">¡Haz una pausa corta!</strong>`
        break;
    case "descanso-largo":
        title.innerHTML = `
        Hora de volver a la superficie
        <strong class="app__title-strong">Haz una pausa larga</strong>`
    default:
        break;
   }
}

const cuentaRegresiva = () => {
    if(tiempoMilisegundos <= 0){
        audioSonidoFinal.play();
        alert('Tiempo final')
        reiniciar()
        return
    }
    textoBotonIniciar.textContent = "Pausar"
    iconoBoton.setAttribute('src',`/imagenes/pause.png`)
    tiempoMilisegundos -= 1
    mostrarCronometro()
    // console.log("Temporizador:" +tiempoMilisegundos)
}

botonIniciar.addEventListener('click', iniciarPausar)

function iniciarPausar(){
    if(idIntervalo){
        audioPause.play();
        reiniciar()
        return
    }
    audioPlay.play();
    idIntervalo = setInterval(cuentaRegresiva,1000)
}

function reiniciar(){
    clearInterval(idIntervalo)
    textoBotonIniciar.textContent = "Comenzar"
    iconoBoton.setAttribute('src',`/imagenes/play_arrow.png`);
    idIntervalo = null
}

function mostrarCronometro(){
    const tiempo = new Date(tiempoMilisegundos * 1000)
    const formatoTiempo = tiempo.toLocaleTimeString("es-CR", {
        minute:'2-digit',
        second:'2-digit'
    })
    cronometro.innerHTML=`${formatoTiempo}`
}

mostrarCronometro()