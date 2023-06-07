class DataManager {
    constructor() {
        this.dados = JSON.parse(localStorage.getItem("item")) || [];
        this.calculateConsumption();
    }

    calculateConsumption() {
        let currentMonth = new Date().getMonth() + 1;
        let currentYear = new Date().getFullYear();

        let totalConsumptionYear = 0;
        let totalConsumptionMonth = 0;

        this.dados.forEach((item) => {
            let parts = item.date.split('-');

            if (parts[0] == currentYear) {
                totalConsumptionYear += parseInt(item.amount);
                
                if (parts[1] == currentMonth) {
                    totalConsumptionMonth += parseInt(item.amount);
                }
            }
        });

        document.getElementById("consumoAno").innerHTML = `Consumo Total no Ano: ${totalConsumptionYear}L`;
        document.getElementById("consumoMes").innerHTML = `Consumo Total no Mês: ${totalConsumptionMonth}L`;
    }
}

window.dataManager = new DataManager();