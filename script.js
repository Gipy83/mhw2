var risposte = {};

function Restart(){
    const bloccoRisposta = document.querySelector('.risultato');
    bloccoRisposta.classList.add('hidden');
    
    const selezione = document.querySelectorAll('.choice-grid div');
    for(const box of selezione){
        box.classList.remove("opacity");
        box.classList.remove("select");
        const image = box.querySelector("img.checkbox");
        image.src = "images/unchecked.png";
    }
    risposte = {};
    window.scrollTo(0, 0);

    Start();
}


function Start(type){
    const selezione = document.querySelectorAll('.choice-grid div');

    for(const box of selezione){
        box.addEventListener("click", Selezionato);
    }

    if(type===0){
        const article = document.querySelector('article')
        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        const span = document.createElement('span');
        const btn = document.createElement('button');

        
        article.appendChild(div);
        div.appendChild(h2);
        div.appendChild(span);
        div.appendChild(btn);

        btn.textContent = 'Ricomincia il quiz';

        btn.addEventListener('click', Restart);

        div.classList.add('risultato');
        div.classList.add('hidden');
    }
}


function Risultato(){
    const bloccoRisposta = document.querySelector('.risultato');
    bloccoRisposta.classList.remove('hidden');
    const h2 = document.querySelector('.risultato h2');
    const span = document.querySelector('.risultato span')

    if(risposte.two === risposte.three){
        h2.textContent = RESULTS_MAP[risposte.two]['title'];
        span.textContent = RESULTS_MAP[risposte.two]['contents'];
    }else{
        h2.textContent = RESULTS_MAP[risposte.one]['title'];
        span.textContent = RESULTS_MAP[risposte.one]['contents'];
    }

}


function BloccaSelezione(){
    const boxes = document.querySelectorAll('.choice-grid div');

    for(const box of boxes){
        box.removeEventListener("click", Selezionato);
    }
}

function Oscura(scelta){
    const boxes = scelta.parentElement.querySelectorAll("div");
 
    for (let box of boxes)
    {
        if(box.dataset.choiceId !== scelta.dataset.choiceId)
        {
            box.classList.add("opacity");
            box.classList.remove("select");
            const image = box.querySelector("img.checkbox");
            image.src = "images/unchecked.png";
        }
    }
}

function Seleziona(target){
    const image1 = target.querySelector("img.checkbox");
    image1.src = "images/checked.png";
    target.classList.add("select");
    target.classList.remove("opacity");
}



function Selezionato(event){
    Seleziona(event.currentTarget); 
    Oscura(event.currentTarget);  

    risposte[event.currentTarget.dataset.questionId] = event.currentTarget.dataset.choiceId;

    if(risposte.one !== undefined && risposte.two !== undefined && risposte.three !== undefined){
        BloccaSelezione();
        Risultato();
    }
}



Start(0);