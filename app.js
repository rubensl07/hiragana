fetch('hiragana.json')
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('dadosProcessados', JSON.stringify(data));
    })
    .catch(error => {
        console.error('Erro ao carregar o JSON:', error);
    });
