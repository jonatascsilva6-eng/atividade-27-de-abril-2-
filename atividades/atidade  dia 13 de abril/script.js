// document.addEventListener('DOMContentLoaded', );
var dados = [
    {
        id: 1,
        taskName: "Estudar JavaScript",
        taskDescription: "Revisar funções e arrays",
        taskPriority: "Alta",
        taskDueDate: "2026-04-15"
    },
    {
        id: 2,
        taskName: "Fazer exercícios SQL",
        taskDescription: "Praticar JOIN e GROUP BY",
        taskPriority: "Média",
        taskDueDate: "2026-04-18"
    },
    {
        id: 3,
        taskName: "Treinar Python",
        taskDescription: "Pandas e gráficos",
        taskPriority: "Baixa",
        taskDueDate: "2026-04-20"
    }
];
const adcionar = () => {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');

    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskPriority = document.getElementById('taskPriority').value;
    const taskDueDate = document.getElementById('taskDueDate').value;

    if (taskName && taskDescription && taskDueDate) {
        const id = Date.now();
        const item = {
            id: id,
            taskName: taskName,
            taskDescription: taskDescription,
            taskPriority: taskPriority,
            taskDueDate: taskDueDate
        }

        dados.push(item);
        renderTask(item);

        // Limpar o formulário
        taskForm.reset();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function renderTask(item) {
    const tbody = document.getElementById('taskTableBody');
    const tr = document.createElement('tr');
    tr.id = `task-${item.id}`;
    tr.innerHTML = `
        <td>${item.taskName}</td>
        <td>${item.taskPriority}</td>
        <td>${item.taskDueDate}</td>
        <td>
            <button onclick="editar(${item.id})">Editar</button>
            <button onclick="excluir(${item.id})">Excluir</button>
        </td>
    `;
    tbody.appendChild(tr);
}

function excluir(id) {
    // Remove from dados
    dados = dados.filter(item => item.id !== id);
    // Remove from DOM
    const taskDiv = document.getElementById(`task-${id}`);
    if (taskDiv) {
        taskDiv.remove();
    }
}

function editar(id) {
    const item = dados.find(item => item.id === id);
    if (!item) return;

    const tr = document.getElementById(`task-${id}`);
    tr.innerHTML = `
        <td><input type="text" id="editName-${id}" value="${item.taskName}"></td>
        <td>
            <select id="editPriority-${id}">
                <option value="Baixa" ${item.taskPriority === 'Baixa' ? 'selected' : ''}>Baixa</option>
                <option value="Média" ${item.taskPriority === 'Média' ? 'selected' : ''}>Média</option>
                <option value="Alta" ${item.taskPriority === 'Alta' ? 'selected' : ''}>Alta</option>
            </select>
        </td>
        <td><input type="date" id="editDate-${id}" value="${item.taskDueDate}"></td>
        <td>
            <button onclick="salvar(${id})">Salvar</button>
            <button onclick="cancelar(${id})">Cancelar</button>
        </td>
    `;

    tr.innerHTML = `
        <td colspan="4">
            <label>Nome: <input type="text" id="editName-${id}" value="${item.taskName}"></label><br>
            <label>Descrição: <textarea id="editDesc-${id}">${item.taskDescription}</textarea></label><br>
            <label>Prioridade: 
                <select id="editPriority-${id}">
                    <option value="Baixa" ${item.taskPriority === 'Baixa' ? 'selected' : ''}>Baixa</option>
                    <option value="Média" ${item.taskPriority === 'Média' ? 'selected' : ''}>Média</option>
                    <option value="Alta" ${item.taskPriority === 'Alta' ? 'selected' : ''}>Alta</option>
                </select>
            </label><br>
            <label>Data: <input type="date" id="editDate-${id}" value="${item.taskDueDate}"></label><br>
            <button onclick="salvar(${id})">Salvar</button>
            <button onclick="cancelar(${id})">Cancelar</button>
        </td>
    `;
}

function salvar(id) {
    const newName = document.getElementById(`editName-${id}`).value;
    const newDesc = document.getElementById(`editDesc-${id}`).value;
    const newPriority = document.getElementById(`editPriority-${id}`).value;
    const newDate = document.getElementById(`editDate-${id}`).value;

    if (newName && newDesc && newDate) {
        const item = dados.find(item => item.id === id);
        item.taskName = newName;
        item.taskDescription = newDesc;
        item.taskPriority = newPriority;
        item.taskDueDate = newDate;

        // Re-render the task
        const tr = document.getElementById(`task-${id}`);
        tr.innerHTML = `
            <td>${item.taskName}</td>
            <td>${item.taskPriority}</td>
            <td>${item.taskDueDate}</td>
            <td>
                <button onclick="editar(${item.id})">Editar</button>
                <button onclick="excluir(${item.id})">Excluir</button>
            </td>
        `;
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function cancelar(id) {
    const item = dados.find(item => item.id === id);
    // Re-render the task without changes
    const tr = document.getElementById(`task-${id}`);
    tr.innerHTML = `
        <td>${item.taskName}</td>
        <td>${item.taskPriority}</td>
        <td>${item.taskDueDate}</td>
        <td>
            <button onclick="editar(${item.id})">Editar</button>
            <button onclick="excluir(${item.id})">Excluir</button>
        </td>
    `;
}

function load() {
    dados.map(item => renderTask(item))
}

load()