fetch('hiragana.json')
    .then(response => response.json())
    .then(data => {
        let gameOn = true
        const flatObj = data.flat();
        const container = document.getElementById('hiraganaList');
        function criarElementos(hiraganaList) {
            container.innerHTML = "";
            hiraganaList.forEach(hiragana => {
                container.innerHTML += `
                    <div class="hiraganaObject">
                        <p class="charac">${hiragana.charac}</p>
                        <p class="pronounce">${hiragana.sound}</p>
                    </div>`;
            });
        }
        criarElementos(flatObj);

        const quantidadeAcertos = document.getElementById('quantidadeAcertos');

        function start() {
            const objetos = document.querySelectorAll('.hiraganaObject');

            objetos.forEach(objeto => {
                objeto.classList.remove("correto");
                objeto.classList.remove("incorreto");
                const pronounce = objeto.querySelector('.pronounce');
                const input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 3;
                pronounce.replaceWith(input);
            });
            quantidadeAcertos.textContent = "";
        }

        function end() {
            let acertos = 0;
            const objetos = document.querySelectorAll('.hiraganaObject');

            objetos.forEach((objeto, index) => {
                const input = objeto.querySelector('input[type="text"]');
                let currentHiragana = flatObj[index]
                if (input) {
                    const p = document.createElement('p');
                    p.className = 'pronounce';
                    p.textContent = currentHiragana.sound;

                    input.replaceWith(p);
                }
                if (input.value == currentHiragana.sound) {
                    acertos++;
                    objeto.classList.add("correto");
                } else {
                    objeto.classList.add("incorreto");
                }
            });
            let total = flatObj.length || 0;
            quantidadeAcertos.textContent = `Você acertou ${acertos}/${total}`;

        }

        function changeGameState(){
            if(gameOn) {
                start();
                buttonChangeGameState.textContent = "Encerrar";
            } else {
                end()
                buttonChangeGameState.textContent = "Iniciar"
            }
            gameOn = !gameOn
        }
        const buttonChangeGameState = document.getElementById('buttonChangeGameState')
        buttonChangeGameState.addEventListener('click', changeGameState);

    })
    .catch(error => {
        console.error('Erro ao carregar o JSON:', error);
    });
