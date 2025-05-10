// Selecionar elementos
    // Selecionar elementos do form
    const valor = document.getElementById("amount"); // 1º
    const despesa = document.getElementById("expense"); // 4º
    const categoria = document.getElementById("category");// 5º
    const form = document.querySelector("form");// 6º


    // Selecionar elementos da list
    const listaDespesas = document.querySelector("ul"); // 19
    const totalDeDespesas = document.querySelector("aside header h2"); // 57 selecionar total geral da lista


    // 48 Selecionar quatidade de despesas
    const quantidadeDeDespesas = document.querySelector("aside header p span"); // selecionar em cascata

// Fim Selecionar elementos


//////////////////////////////////////////////////////////////////////

// Eventos


    // 2º
    // aceitar somente números neste campo
    valor.oninput = () => {
        let valorEmNumeros = valor.value.replace(/\D/g, ""); // retirando as letras do valor atual
        
        valor.value = formatarValor(valorEmNumeros); // Repassando somente os números para o input já formatado
    }


    // 7º Eventos do formulário
    form.onsubmit = (evento) => {
        evento.preventDefault(); // pegar o evento e desativar o recarregamento da pátina do submit // 8º

        // 9º Criar um objeto para cada evendo de submit para guardar as informações das despesas
        const novaDespesa = {
            id : new Date().getTime(),
            nome_despesa : despesa.value,
            categoria_id : categoria.value,
            nome_categoria : categoria.options[categoria.selectedIndex].text,
            valor_despesa : valor.value,
            criado_em : new Date()
        }

        // 11ºchamar função para adicionar item na lista
        adicionarDespesaNaLista(novaDespesa); 

    }
// Fim Eventos


////////////////////////////////////////////////////////////////////////////////

// Funções

    // 3º Formatar valor de input - valor da despesa
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


    // 10º Adicionar itens na lista ( li na ul)
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

            atualizaTotalDespesas() // 47 função para atualizar total

            
        } catch (error) {
            alert("Erro ao adicionar despesa");
        }
    }

    // 43 Atualizar total de despesas 
    function atualizaTotalDespesas() {

        // 46 obs : vai chamar essa função depois que adicionar algum item na lista

        

        try {
            // 45 recuperar quantidade de itens da lista -- ( (li)s da ul )
            const itens = listaDespesas.children // pega os filhos da ul, que são os (li)s 

            // 49 Atualizar a quantidade de despesas e mudar o texto despesa para o plural ou singular
            quantidadeDeDespesas.textContent = `${itens.length} ${itens.length > 1 ? "despesas" : "despesa"}` // if ternário para verificar a quantidade e exibir plural ou singular


            // 50 Variável para incrementar o total ( soma dos valores das despesas )
            let total = 0

            // 51 Percorrer os li's da da lista ( ul )
            for(let item = 0; item < itens.length; item++){

                // 52 capturar o valor
                const valorDoItem = itens[item].querySelector(".expense-amount")

                // 53 Remover caracteres não numéricos
                let valor = valorDoItem.textContent.replace(/[^\d]/g, "").replace(",", ".")

                // 54 convertes para float para pegar números quebrados
                valor = parseFloat(valor)

                // 55 Verificar se é um número
                if (isNaN(total)) {
                    return alert("Não foi possível atualizar os totais de despesas")
                }

                // 56 Incrementar o total ( somar )
                total += Number(valor)

            }

            // 58 Mostar o total no html
            // totalDeDespesas.textContent = formatarValor(total) // Desta forma o total não fica formatado o R$ fica em negrito

            // 59 Criar span para adicionar o R$ formatado
            const spanTotal = document.createElement("small")

            // 60 adicionar o R$ na span
            spanTotal.textContent = "R$"

            //  61 Pegar o total e retirar o R$ que já vem da nossa função formatarValor()
            total = formatarValor(total).toUpperCase().replace("R$", "")

            // 63 Limpar o conteúdo do elemento , caso não limpe aparece todos os valores incrementados em vez de mostrar somente a soma
            totalDeDespesas.innerHTML = ""

            // 62 Adicionar o span e o total em <h2><small>R$</small>0,00</h2>
            totalDeDespesas.append(spanTotal, total)
            
        } catch (error) {
            alert("Não foi possível atualizar os totais de despesas") // 44 
        }
    }


// Fim Funções