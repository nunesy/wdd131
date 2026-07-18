// 1. Atualizar informações do Footer
    document.getElementById("anoAtual").textContent = new Date().getFullYear();
    document.getElementById("ultimaModificacao").textContent = "Última Modificação: " + document.lastModified;


document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Atualizar informações do Footer
    const anoAtualElement = document.getElementById("anoAtual");
    const ultimaModificacaoElement = document.getElementById("ultimaModificacao");

    if (anoAtualElement) {
        anoAtualElement.textContent = new Date().getFullYear();
    }
    if (ultimaModificacaoElement) {
        ultimaModificacaoElement.textContent = "Última Modificação: " + document.lastModified;
    }

    // 2. Variáveis Estáticas baseadas nos valores da seção Clima
    const temperatura = 28; // Corresponde a 10 °C
    const vento = 23;        // Corresponde a 5 km/h

    const windChillElement = document.getElementById("wind-chill");

    // 3. Função de cálculo (Fórmula para Graus Celsius e km/h)
    function calcularSensacaoTermica(temp, speed) {
        return (13.12 + (0.6215 * temp) - (11.37 * Math.pow(speed, 0.16)) + (0.3965 * temp * Math.pow(speed, 0.16))).toFixed(1);
    }

    // 4. Verificação das condições limitantes exigidas
    if (windChillElement) {
        if (temperatura <= 10 && vento > 4.8) {
            const resultado = calcularSensacaoTermica(temperatura, vento);
            windChillElement.textContent = `${resultado} °C`;
        } else {
            windChillElement.textContent = "N/A";
        }
    }
});