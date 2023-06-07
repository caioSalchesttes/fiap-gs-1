class DataManager {
    constructor() {
        this.dados = JSON.parse(localStorage.getItem("item")) || [];
        this.modal = new bootstrap.Modal(document.getElementById('exampleModal'));

        this.attachEventListeners();
        this.renderData();
    }

    attachEventListeners() {
        document.getElementById("pesquisar").addEventListener("keyup", (e) => {
            this.searchCards(e.target.value);
        });
    }

    saveData() {
        let name = document.getElementById("name").value;
        let date = document.getElementById("date").value;
        let amount = document.getElementById("amount").value;

        if (!name || !date || !amount) {
            alert("Preencha todos os campos");
            return false;
        }

        if (this.dados.some(item => item.date === date)) {
            alert("Data já cadastrada");
            return false;
        }

        this.dados.push({
            id: this.dados.length + 1,
            name: name,
            date: date,
            amount: amount,
        });

        localStorage.setItem("item", JSON.stringify(this.dados));
        this.modal.hide();
        this.clearFields();
        this.renderData();
    }

    searchCards(search) {
        const searchType = document.getElementById("tipo_pesquisa").value;
        const results = this.dados.filter(item => item[searchType]?.toString().includes(search));
        this.renderData(results);
    }

    renderData(dadosToRender = this.dados) {
        let listagem = document.getElementById("listagem");
        listagem.innerHTML = "";

        dadosToRender.forEach((item, index) => {
            listagem.appendChild(this.createRow(item, index));
        });
    }

    createRow(item) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${this.formatDateMonth(item.date)}</td>
            <td>${item.amount}L</td>
            <td><button class="btn btn-danger" onClick="window.dataManager.removeData(${item.id})">Remover</button></td>
        `;

        return row;
    }

    formatDateMonth(date) {
        return date.split('-').reverse().join('/');
    }

    clearFields() {
        document.getElementById("name").value = "";
        document.getElementById("date").value = "";
        document.getElementById("amount").value = "";
    }

    removeData(id) {
        this.dados = this.dados.filter((item) => item.id != id);
        localStorage.setItem("item", JSON.stringify(this.dados));
        this.renderData();
    }
}

window.dataManager = new DataManager();
