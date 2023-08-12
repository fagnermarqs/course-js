function tasksToArray() {
	tasks = [];
	arr = [];

	// pega todas as tarefas até então
	const listTaks = document.querySelectorAll(".task-box");
	
	console.log("listTaks = " + listTaks);
	console.log("length = " + listTaks.length);

	for (var i = 0; i < listTaks.length; i++) {
		if (!listTaks[i].classList.contains("template")) {
			// console.log("Task " + i + " = " + listTaks[i].textContent);
			arr.push(listTaks[i]);
			tasks.push(listTaks[i].children[0].textContent);
		}
	}


	return [arr, tasks];
}

function showElement(element) {
	console.log(typeof(element) + " - " + element);
}

// função para salvar todas as tarefas usando Ajax
function saveAll() {
	const [arr, tasks] = tasksToArray();
	const json = JSON.stringify(tasks);

	arr.forEach(doneTask);

	console.log(json);
}

// função que adiciona tarefa
function addTask() {
	// título da tarefa
	var title = document.getElementById("task-title").value

	if (title) {
		// clona o template
		const template = document.querySelector(".template");
		const newTask = template.cloneNode(true);

		// adiciona título
		newTask.querySelector(".task-title").textContent = title;

		// remover as classe desnecessárias
		newTask.classList.remove("template");
		newTask.classList.remove("hide");

		// adicionar tarefa na lista
		const list = document.querySelector("#task-list");

		list.appendChild(newTask);

		// limpar caixa de entrada
		document.getElementById("task-title").value = "";

		const doneBtn = newTask.querySelector(".done-btn");
		const removeBtn = newTask.querySelector(".remove-btn");

		doneBtn.addEventListener("click", function () {
			doneTask(this.parentNode);
		});

		removeBtn.addEventListener("click", function () {
			removeTask(this.parentNode);
		});		
	}
}

function hasDone(task) {
	return task.classList.contains("done");
}

// função para remover tarefas
function removeTask(task) {
	task.remove(true);
}

// função para finalizar tarefas
function doneTask(task) {
	if (hasDone(task)) {
		task.classList.remove("done");
	} else
		task.classList.add("done");

	// task.querySelector(".done-btn").classList.add("hide");
	// task.querySelector(".remove-btn").classList.add("hide");
}

// evento de adicionar tarefa
const addBtn = document.getElementById("add-btn");

addBtn.addEventListener("click", function (e) {
	e.preventDefault();
	addTask();
});

// evento de salvar todas as tarefas
const btnSaveAll = document.querySelector(".save-me");

btnSaveAll.addEventListener("click", function (e) {
	e.preventDefault();
	saveAll();
});