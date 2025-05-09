// Selecionar elementos do form
const valor = document.getElementById("amount"); // 1º
const despesa = document.getElementById("expense"); // 4º
const categoria = document.getElementById("category");// 5º
const form = document.querySelector("form");// 6º


// Selecionar elementos da list
const listaDespesas = document.querySelector("ul"); // 19





// Fim Selecionar elementos

// Eventos


// 2º
// aceitar somente números neste campo
valor.oninput = () => {
    let valorEmNumeros = valor.value.replace(/\D/g, ""); // retirando as letras do valor atual
    
    valor.value = formatarValor(valorEmNumeros); // Repassando somente os números para o input já formatado
}


// 7º
// Eventos do formulário
form.onsubmit = (evento) => {
    evento.preventDefault(); // pegar o evento e desativar o recarregamento da pátina do submit // 8º

    // 9º
    // Criar objeto para salvar informações da despesa
    const novaDespesa = {
        id : new Date().getTime(),
        nome_despesa : despesa.value,
        categoria_id : categoria.value,
        nome_categoria : categoria.options[categoria.selectedIndex].text,
        valor_despesa : valor.value,
        criado_em : new Date()
    }

    // chamar função para adicionar item na lista
    adicionarDespesaNaLista(novaDespesa); // 11º

    console.log(novaDespesa)

}




// Fim Eventos

// Funções


// 3º
// Formatar valor de input - valor da despesa
function formatarValor(valor) {

    valor = valor / 100; // Transformar o valor em centavos ( para funcionar a formatação )

    // Formata valor para padrão R$ Real Brasil
    valor = valor.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL"
    });

    // Retorna o valor formatado
    return valor
}


// 10º
// Adicionar despesa na lista
function adicionarDespesaNaLista(novaDespesa) {

    try {
        // 12º
        // Criar elemento para adicionar na lista
        const liItemDespesa = document.createElement("li"); // 13º Criar li
        liItemDespesa.classList.add("expense"); // 14ª Adicionando a classe expense no li

        // 15º 
        // Criar o icone da categoria
        const iconeDespesa = document.createElement("img") // 16 Criar img
        iconeDespesa.setAttribute("src", `img/${novaDespesa.categoria_id}.svg`) // 17 setando o src da imagem
        iconeDespesa.setAttribute("alt", novaDespesa.nome_categoria) // 18 setando o alt da imagem"


        // 23 Criar <div class="expense-info">
        const divDespesaInfo = document.createElement("div"); // 24 Criado
        divDespesaInfo.classList.add("expense-info") // 25 Adicionando a classe expense-info na div

        // 26 Criar <strong>Almoço</strong> da div
        const strongNomeDespesa = document.createElement("strong"); // 27 Criado
        strongNomeDespesa.textContent = novaDespesa.nome_despesa // 28 Adiciona texto no sgrong

        // 29 Criar <span>Alimentação</span> caregoria
        const spanCategoriaDespesa = document.createElement("span"); // 30 Criado
        spanCategoriaDespesa.textContent = novaDespesa.nome_categoria // 31 Adiciona texto no span

        
        // 32 Adicionar strong e span dentro da div
        divDespesaInfo.append(strongNomeDespesa, spanCategoriaDespesa)


        // 34 Criar o <span class="expense-amount"> que vai dentro do li
        const spanValorDespesa = document.createElement("span");
        spanValorDespesa.classList.add("expense-amount") // 35 adicionar classe

        // 36 usar o innnerHtnl para criar o <small>R$</small> que vai dentro do span, com sintaxe html
        spanValorDespesa.innerHTML = `<small>R$</small>${novaDespesa.valor_despesa.toUpperCase().replace("R$", "")}`


        // 38 Adicionar icone de deletar <img src="./img/remove.svg" alt="remover" class="remove-icon" />
        const imgIconeRemover = document.createElement("img")
        imgIconeRemover.classList.add("remove-icon") // 39 Adiconnar classe remove-icon
        imgIconeRemover.setAttribute("src", "./img/remove.svg") // 40 setando src da img
        imgIconeRemover.setAttribute("alt", "remover") // 41 setando alt da img


        // 20
        // Adiciona informações no item ( img na li e div na li)
        liItemDespesa.append(iconeDespesa, divDespesaInfo, spanValorDespesa, imgIconeRemover) // 21 Adiciona o img (icone) no li ----  // 33 adiciona div no li ---- // 37 adicionar o span dentro do li ---- // 42 adicionando icone de remover
        
        listaDespesas.append(liItemDespesa) // 22 Adiciona o li na ul

        
    } catch (error) {
        alert("Erro ao adicionar despesa");
        console.log(error); // Apagar
    }
}



// Fim Funções