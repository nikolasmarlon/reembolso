// Selecionar elementos
const valor = document.getElementById("amount");





// Fim Selecionar elementos

// Eventos

// aceitar somente números neste campo
valor.oninput = () => {
    let valorEmNumeros = valor.value.replace(/\D/g, ""); // retirando as letras do valor atual
    
    valor.value = formatarValor(valorEmNumeros); // Repassando somente os números para o input já formatado
}





// Fim Eventos

// Funções

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

// Formatar valor