async function apiFetch() {
    const CEP = document.getElementById('input_consulta_cep').value;
    console.log(CEP);
    const url = `https://viacep.com.br/ws/${CEP}/json/`;
    let dado = null;

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        console.log(dados);
        dado = dados;
    } catch (error) {
        console.error('Erro:', error);
    }

    if (dado) {
        construirLista(dado);
    }
}
    document.getElementById('botaoSalvar').addEventListener("click", function() {
    const enderecoAtual = document.querySelector('.tableinfo');
    if (enderecoAtual) {
        const endereco = {
            cep: enderecoAtual.querySelector('p:nth-child(1)').innerText.replace('CEP: ', ''),
            logradouro: enderecoAtual.querySelector('p:nth-child(2)').innerText.replace('Logradouro: ', ''),
            complemento: enderecoAtual.querySelector('p:nth-child(3)').innerText.replace('Complemento: ', ''),
            bairro: enderecoAtual.querySelector('p:nth-child(4)').innerText.replace('Bairro: ', ''),
            localidade: enderecoAtual.querySelector('p:nth-child(5)').innerText.replace('Localidade: ', '')
        };
        salvarEndereco(endereco);
    }
});

    function construirLista(dado) {
    const divContainer = document.getElementById('tableinfo');
    divContainer.innerHTML = '';

    const dadosEnd = document.createElement('div');
    dadosEnd.classList.add('tableinfo');
    dadosEnd.innerHTML = `
        <p><strong>CEP:</strong> ${dado.cep}</p>
        <p><strong>Logradouro:</strong> ${dado.logradouro}</p>
        <p><strong>Complemento:</strong> ${dado.complemento ? dado.complemento : 'N/A'}</p>
        <p><strong>Bairro:</strong> ${dado.bairro}</p>
        <p><strong>Localidade:</strong> ${dado.localidade}</p>
    `;
    divContainer.appendChild(dadosEnd);
}

    function salvarEndereco(endereco) {
    let enderecos = JSON.parse(localStorage.getItem("enderecosSalvos")) || [];
    enderecos.push(endereco);
    localStorage.setItem("enderecosSalvos", JSON.stringify(enderecos));
    adcEnderecoDOM(endereco);
}

    function carregarEnderecos() {
    let enderecos = JSON.parse(localStorage.getItem("enderecosSalvos")) || [];
    enderecos.forEach(endereco => {
        adcEnderecoDOM(endereco);
    });
}

    function adcEnderecoDOM(endereco) {
    const divContainer = document.getElementById('enderecosSalvos');
    const dadosEnd = document.createElement('div');
    dadosEnd.classList.add('saved-address');
    dadosEnd.innerHTML = `
        <p><strong>CEP:</strong> ${endereco.cep}</p>
        <p><strong>Logradouro:</strong> ${endereco.logradouro}</p>
        <p><strong>Complemento:</strong> ${endereco.complemento ? endereco.complemento : 'N/A'}</p>
        <p><strong>Bairro:</strong> ${endereco.bairro}</p>
        <p><strong>Localidade:</strong> ${endereco.localidade}</p>
        <button onclick="deletarEndereco('${endereco.cep}')">Deletar</button>
    `;
    divContainer.appendChild(dadosEnd);
}

    function deletarEndereco(cep) {
    let enderecos = JSON.parse(localStorage.getItem("enderecosSalvos")) || [];
    enderecos = enderecos.filter(endereco => endereco.cep !== cep);
    localStorage.setItem("enderecosSalvos", JSON.stringify(enderecos));
    atualizarDOM();
}

    function atualizarDOM() {
    const divContainer = document.getElementById('enderecosSalvos');
    divContainer.innerHTML = '<h3>Endereços Salvos:</h3>';
    carregarEnderecos();
}

window.onload = carregarEnderecos;
