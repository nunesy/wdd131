// =========================================================
// 1. ELEMENTOS DO DOM
// =========================================================
const formTarefa = document.getElementById('form-tarefa');
const listaTarefas = document.getElementById('lista-tarefas');
const btnLimpar = document.getElementById('btn-limpar');
const btnMenu = document.getElementById('btn-menu');
const menuLista = document.getElementById('menu-lista');
const btnTema = document.getElementById('btn-tema');
const inputBusca = document.getElementById('input-busca');

const modalEdicao = document.getElementById('modal-edicao');
const formEdicao = document.getElementById('form-edicao');
const btnFecharModal = document.getElementById('btn-fechar-modal');

// =========================================================
// 2. INICIALIZAÇÃO DOS DADOS
// =========================================================
let tarefas = JSON.parse(localStorage.getItem('minhasTarefas')) || [];

let precisouMigrar = false;
tarefas = tarefas.map(function (tarefa) {
    if (tarefa.data !== undefined) {
        tarefa.dataFim = tarefa.data;
        delete tarefa.data;
        precisouMigrar = true;
    }
    if (tarefa.hora !== undefined) {
        tarefa.horaFim = tarefa.hora;
        delete tarefa.hora;
        precisouMigrar = true;
    }
    return tarefa;
});

if (precisouMigrar) {
    localStorage.setItem('minhasTarefas', JSON.stringify(tarefas));
}

// =========================================================
// 3. FUNÇÕES PRINCIPAIS
// =========================================================
function mostrarTarefas() {
    if (listaTarefas) {
        listaTarefas.innerHTML = ``;

        if (tarefas.length === 0) {
            listaTarefas.innerHTML = `<p>Nenhuma tarefa pendente. Bora fazer algo!</p>`;
            return;
        }

        tarefas.forEach(function (tarefa) {
            const status = tarefa.concluida ? `(Concluída)` : ``;
            const classeConcluida = tarefa.concluida ? 'concluida' : '';

            let textoInicio = '';
            if (tarefa.dataInicio) {
                const inicioFormatado = tarefa.dataInicio.split('-').reverse().join('/');
                textoInicio = `<br><small>📅 Início: ${inicioFormatado}</small>`;
            }

            let textoFim = '';
            if (tarefa.dataFim) {
                const hoje = new Date();
                const dataPrazo = new Date(`${tarefa.dataFim}T${tarefa.horaFim || '23:59'}`);

                const hojeSemHora = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
                const prazoSemHora = new Date(dataPrazo.getFullYear(), dataPrazo.getMonth(), dataPrazo.getDate());

                const diffTempo = prazoSemHora.getTime() - hojeSemHora.getTime();
                const diffDias = Math.ceil(diffTempo / (1000 * 3600 * 24));

                const horaFormatada = tarefa.horaFim ? ` às ${tarefa.horaFim}` : '';
                const dataFormatada = tarefa.dataFim.split('-').reverse().join('/');

                if (tarefa.concluida) {
                    textoFim = `<br><small style="color: gray;">🏁 Prazo era: ${dataFormatada}</small>`;
                } else if (diffDias < 0) {
                    const diasAtraso = Math.abs(diffDias);
                    textoFim = `<br><small style="color: #e74c3c; font-weight: bold;">🚨 ATRASADA: Venceu há ${diasAtraso} dia(s)</small>`;
                } else if (diffDias === 0) {
                    textoFim = `<br><small style="color: #f39c12; font-weight: bold;">⏳ Vence HOJE${horaFormatada}!</small>`;
                } else {
                    textoFim = `<br><small style="color: #27ae60; font-weight: bold;">⏰ Prazo: ${dataFormatada} (Faltam ${diffDias} dias)</small>`;
                }
            }

            const textoLink = tarefa.link ? `<br>🔗 <a href="${tarefa.link}" target="_blank" style="color: var(--cor-destaque); font-weight: bold; text-decoration: none;">Acessar Referência</a>` : '';

            // Exportar para o Google Agenda
            let botaoGoogleCalendar = '';
            if (tarefa.dataFim) {
                const dataGoogle = tarefa.dataFim.replace(/-/g, '');
                const horaInicioGoogle = tarefa.horaFim ? tarefa.horaFim.replace(':', '') + '00' : '090000';
                const horaFimGoogle = tarefa.horaFim ? (parseInt(tarefa.horaFim.split(':')[0]) + 1).toString().padStart(2, '0') + tarefa.horaFim.split(':')[1] + '00' : '100000';

                const linkGoogle = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(tarefa.titulo)}&dates=${dataGoogle}T${horaInicioGoogle}/${dataGoogle}T${horaFimGoogle}&details=${encodeURIComponent('Tarefa criada pelo Bora Fazer! Link de referência: ' + (tarefa.link || 'Nenhum'))}`;

                
                botaoGoogleCalendar = `<a href="${linkGoogle}" target="_blank" class="btn-secundario" style="text-decoration: none; display: inline-block; font-size: 0.9rem; margin-top: 5px;">🗓️ Google Agenda</a>`;
            }

            const htmlTarefa = `
                <div class="tarefa-item ${classeConcluida}">
                    <p>
                        <strong>${tarefa.titulo}</strong> - Prioridade: ${tarefa.prioridade} <strong>${status}</strong>
                        ${textoInicio}
                        ${textoFim}
                        ${textoLink}
                    </p>
                    <div style="margin-top: 15px; display: flex; flex-wrap: wrap; gap: 5px;">
                        <button class="btn-secundario" onclick="marcarConcluida(${tarefa.id})">✔ Concluir</button>
                        <button class="btn-secundario" onclick="abrirModalEdicao(${tarefa.id})">✏️ Editar</button>
                        ${botaoGoogleCalendar}
                    </div>
                </div>
            `;

            listaTarefas.innerHTML += htmlTarefa;
        });
    }
}

function adicionarTarefa(evento) {
    evento.preventDefault();

    const tituloInput = document.getElementById('titulo').value;
    const prioridadeInput = document.getElementById('prioridade').value;
    const dataInicioInput = document.getElementById('data-inicio') ? document.getElementById('data-inicio').value : '';
    const dataFimInput = document.getElementById('data-fim') ? document.getElementById('data-fim').value : '';
    const horaFimInput = document.getElementById('hora-fim') ? document.getElementById('hora-fim').value : '';
    const linkInput = document.getElementById('link-ref') ? document.getElementById('link-ref').value : '';

    const novaTarefa = {
        id: Date.now(),
        titulo: tituloInput,
        prioridade: prioridadeInput,
        dataInicio: dataInicioInput,
        dataFim: dataFimInput,
        horaFim: horaFimInput,
        link: linkInput,
        concluida: false,
        notificada: false
    };

    tarefas.push(novaTarefa);
    localStorage.setItem('minhasTarefas', JSON.stringify(tarefas));
    alert(`Tarefa "${tituloInput}" salva com sucesso!`);
    window.location.href = `index.html`;
}

function marcarConcluida(id) {
    tarefas = tarefas.map(function (tarefa) {
        if (tarefa.id === id) {
            tarefa.concluida = true;
        }
        return tarefa;
    });

    localStorage.setItem('minhasTarefas', JSON.stringify(tarefas));
    mostrarTarefas();
    if (typeof atualizarEstatisticas === 'function') atualizarEstatisticas();
}

function limparConcluidas() {
    tarefas = tarefas.filter(function (tarefa) {
        return tarefa.concluida === false;
    });

    localStorage.setItem('minhasTarefas', JSON.stringify(tarefas));
    mostrarTarefas();
}

// =========================================================
// 4. LÓGICA DO MODAL DE EDIÇÃO AVANÇADA
// =========================================================
function abrirModalEdicao(id) {
    const tarefa = tarefas.find(function (t) { return t.id === id; });

    if (tarefa) {
        document.getElementById('edit-id').value = tarefa.id;
        document.getElementById('edit-titulo').value = tarefa.titulo;
        document.getElementById('edit-prioridade').value = tarefa.prioridade;
        document.getElementById('edit-data-inicio').value = tarefa.dataInicio || '';
        document.getElementById('edit-data-fim').value = tarefa.dataFim || '';
        document.getElementById('edit-hora-fim').value = tarefa.horaFim || '';
        document.getElementById('edit-link').value = tarefa.link || '';

        modalEdicao.classList.remove('modal-oculto');
    }
}

function fecharModal() {
    modalEdicao.classList.add('modal-oculto');
}

function salvarEdicao(evento) {
    evento.preventDefault();

    const id = parseInt(document.getElementById('edit-id').value);

    tarefas = tarefas.map(function (tarefa) {
        if (tarefa.id === id) {
            tarefa.titulo = document.getElementById('edit-titulo').value;
            tarefa.prioridade = document.getElementById('edit-prioridade').value;
            tarefa.dataInicio = document.getElementById('edit-data-inicio').value;
            tarefa.dataFim = document.getElementById('edit-data-fim').value;
            tarefa.horaFim = document.getElementById('edit-hora-fim').value;
            tarefa.link = document.getElementById('edit-link').value;
            tarefa.notificada = false;
        }
        return tarefa;
    });

    localStorage.setItem('minhasTarefas', JSON.stringify(tarefas));
    fecharModal();
    mostrarTarefas();
    if (typeof atualizarEstatisticas === 'function') atualizarEstatisticas();
}

if (btnFecharModal) btnFecharModal.addEventListener('click', fecharModal);
if (formEdicao) formEdicao.addEventListener('submit', salvarEdicao);

// =========================================================
// 5. BUSCA, MODO ESCURO E LEMBRETE
// =========================================================
if (inputBusca) {
    inputBusca.addEventListener('input', function (evento) {
        const termoDigitado = evento.target.value.toLowerCase();
        const tarefasNaTela = listaTarefas.querySelectorAll('.tarefa-item');

        tarefasNaTela.forEach(function (divTarefa) {
            const textoTarefa = divTarefa.innerText.toLowerCase();
            if (textoTarefa.includes(termoDigitado)) {
                divTarefa.style.display = 'block';
            } else {
                divTarefa.style.display = 'none';
            }
        });
    });
}

if (localStorage.getItem('temaEscuro') === 'true') {
    document.body.classList.add('dark-mode');
    if (btnTema) btnTema.textContent = '☀️';
}

if (btnTema) {
    btnTema.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            btnTema.textContent = '☀️';
            localStorage.setItem('temaEscuro', 'true');
        } else {
            btnTema.textContent = '🌙';
            localStorage.setItem('temaEscuro', 'false');
        }
    });
}

if (btnMenu && menuLista) {
    btnMenu.addEventListener('click', function () {
        menuLista.classList.toggle('ativo');
    });
}

setInterval(function () {
    const agora = new Date();
    let teveMudanca = false;

    tarefas.forEach(function (tarefa) {
        if (!tarefa.concluida && tarefa.dataFim && tarefa.horaFim && !tarefa.notificada) {
            const dataHoraTarefa = new Date(`${tarefa.dataFim}T${tarefa.horaFim}`);

            if (agora >= dataHoraTarefa) {
                alert(`⏰ LEMBRETE: O prazo da tarefa "${tarefa.titulo}" acabou!`);
                tarefa.notificada = true;
                teveMudanca = true;
            }
        }
    });

    if (teveMudanca) {
        localStorage.setItem('minhasTarefas', JSON.stringify(tarefas));
    }
}, 10000);

// =========================================================
// 6. DASHBOARD E ESTATÍSTICAS
// =========================================================
function atualizarEstatisticas() {
    const statTotal = document.getElementById('stat-total');
    const statConcluidas = document.getElementById('stat-concluidas');
    const statPendentes = document.getElementById('stat-pendentes');
    const textoProgresso = document.getElementById('texto-progresso');
    const barraProgresso = document.getElementById('barra-progresso');

    if (statTotal) {
        const total = tarefas.length;
        const concluidas = tarefas.filter(function (tarefa) { return tarefa.concluida === true; }).length;
        const pendentes = total - concluidas;

        let porcentagem = 0;
        if (total > 0) {
            porcentagem = Math.round((concluidas / total) * 100);
        }

        statTotal.textContent = total;
        statConcluidas.textContent = concluidas;
        statPendentes.textContent = pendentes;
        textoProgresso.textContent = porcentagem + '%';
        barraProgresso.style.width = porcentagem + '%';
    }
}

// =========================================================
// 7. ESCUTA DE EVENTOS GERAIS E EXECUÇÃO INICIAL
// =========================================================
if (formTarefa) formTarefa.addEventListener('submit', adicionarTarefa);
if (btnLimpar) btnLimpar.addEventListener('click', limparConcluidas);

mostrarTarefas();
if (typeof atualizarEstatisticas === 'function') atualizarEstatisticas();