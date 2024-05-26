async function apiFetch () {
    
    const CEP = document.getElementById('input_consulta_cep').value;
    console.log(CEP);
    const url = `https://viacep.com.br/ws/${CEP}/json/`; 
    dado = null
    try {

    const resposta = await fetch(url);
    const dados = await resposta.json();
    console.log(dados); 
    dado = dados;
}
    catch (error) {
        console.error('Erro:', error);
    }
    
    console.log(dado)
    construirLista();
    
}
function construirLista(){
    const divContainer = document.getElementById('tableinfo');
    const dadosEnd = document.createElement('div');
    dadosEnd.classList.add('tableinfo');
    dadosEnd.innerHTML = `
        <p><strong>CEP:</strong> ${dado.cep}</p>
        <p><strong>Logradouro:</strong> ${dado.logradouro}</p>
        <p><strong>Complemento:</strong> ${dado.complemento ? dado.complemento : 'N/A'}</p>
        <p><strong>Bairro:</strong> ${dado.bairro}</p>
        <p><strong>Localidade:</strong> ${dado.localidade}</p>
    `
    divContainer.appendChild(dadosEnd);
}
function togglePlaceholderAndFunction() {
    const input_consulta_cep = document.getElementById('input_consulta_cep');
    const checkbox = document.querySelector('.switch input[type="checkbox"]');
    const button = document.querySelector('button');

    if (checkbox.checked) {
        inputCEP.placeholder = "Insira seu Logradouro";
        button.setAttribute('onclick', 'jsApiLog()');
    } else {
        inputCEP.placeholder = "Insira seu CEP";
        button.setAttribute('onclick', 'jsApiCEP()');
    }
}

document.querySelector('.switch input[type="checkbox"]').addEventListener('change', togglePlaceholderAndFunction);


async function jsApiLog () {
    // fazer dps, segundo a api vou precisar fazer um dropdown de uf -> cidade -> rua pra filtrar ex: viacep.com.br/ws/RS/Porto Alegre/Domingos/json/
// viacep.com.br/ws/RS/Porto Alegre/Domingos Jose/json/
// viacep.com.br/ws/RS/Porto Alegre/Domingos+Jose/json/
}