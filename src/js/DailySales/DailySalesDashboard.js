class DailySalesDashboard extends Dashboard{
    constructor(id){
        super(id);
        this.dailySales = new DailySales(this.bodyId);
    }

    start(){
        if (dashboardContainer.className == 'hide'){
            this.makeTheTableAndButtons(this.header())
            this.dailySales.displayAll();
        } 
        dashboardContainer.classList.toggle('hide');
    }

    header(){
        return `
            <th>Daily Sale ID</th> 
            <th>DATE</th> 
            <th>TOTAL SALES</th> 
            <th>TOTAL INCOME</th>
        `;
    }
}
