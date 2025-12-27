//1 selecao de elmentos cache
const containerProdutos = document.querySelector('.container-produtos');
const totalPicolesDisplay = document.getElementById('total-picoles');
const valorTotalDisplay =  document.getElementById('valor-total');
const btnCancelar = document.getElementById('cancelar-pedido');
const btnImprimir = document.getElementById('imprimir-pedido');

//1.Função Central de Atualização do Resumo (Mecanica Reativa)
function atualizarResumoPedido(){
    let totalItens = 0;
    let valorTotal = 0;

    document.querySelectorAll('.item-produto').forEach(produto =>{
        const qtd =parseInt(produto.querySelector('.contador').innerText);
        const preco = parseFloat(produto.getAttribute('data-preco'));

        totalItens += qtd;
        valorTotal += (qtd * preco);
    });

    totalPicolesDisplay.innerText = totalItens;
    valorTotalDisplay.innerText = `R$ ${valorTotal.toFixed(2).replace('.', '.')}`;
}

// 2. Delegação de Eventos (Otimizado para cliques no container)
containerProdutos.addEventListener('click', (e) =>{
    const target = e.target;
    const item = target.closest('.item-produto');
    if (!item) return;

    const contadorelemento = item.querySelector('.contador');
    let quantidadeAtual = parseInt(contadorelemento.innerText);

    // Lógica do botao ADICIONAR
    if (target.classList.contains('btn-add')) {
        quantidadeAtual++;
        contadorelemento.innerText = quantidadeAtual;
    }
    // Lógica do botao REMOVER
    else if (target.classList.contains('btn-remove')){
        if (quantidadeAtual > 0){
            quantidadeAtual--;
            contadorelemento.innerText = quantidadeAtual
        }
    }

    // Atualiza o resumo do pedido após qualquer alteração
    atualizarResumoPedido();
});

//3.     mecânica do botão cancelar (Reset total)
btnCancelar.addEventListener('click', () =>{
    if (confirm("Deseja realmente cancelar todo o pedido?")){
        document.querySelectorAll('.contador').forEach(c => c.innerText = "0");
        atualizarResumoPedido();
    }
});

//MECANICA BOTÃO IMPRIMIR (VALIDAÇÃO DE SAÍDA)
btnImprimir.addEventListener('click', () => {
    const total = totalPicolesDisplay.innerText;
    if (total === "0") {
        alert("o carrinho está vazio! Adicione produtos para imprimir.");
return;
    }

    //1. configuraçoes do whatsapp
    const numeroTelefone = "5516997820455";
    let mensagem = `*🍦 NOVO PEDIDO - Distribuidora vitoria* \n`;
    mensagem += `----------------------------------\n`;

    //2. Varedura dos itens selecionados
    document.querySelectorAll('.item-produto').forEach(produto =>{
        const qtd = parseInt(produto.querySelector('.contador').innerText);
        const nome = produto.querySelector('.nome-produto').innerText;

        if (qtd > 0) {
           
            mensagem += `✅ ${qtd}x ${nome}\n`;
        }
    })

    //3 Adiciona o valor total
    mensagem += `----------------------------------\n`;
    mensagem += `*Total do Pedido: ${valorTotalDisplay.innerText}*`;


// 4. codifica a mensagem para URL e abre o whatsApp

const linkZap = `https://wa.me/${numeroTelefone}?text=${encodeURIcomponent(mensagem)}`;

// Abre em uma nova aba
window.open(linkZap, '_blank');

})
