class HistoryDashboard extends Dashboard{
    constructor(id){
        super(id);
        this.history = new History(this.bodyId);
    }

    start(){
        if (dashboardContainer.className == 'hide'){
            this.makeTheTableAndButtons(this.header())
            this.history.displayAll();
        } 
        dashboardContainer.classList.toggle('hide');
    }

    header(){
        return `
            <th>Daily Sale ID</th> 
            <th>Order ID</th> 
            <th>Date</th> 
            <th>Total Price</th> 
            <th>Payment Method</th>
            <th>Paid</th>
        `;
    }
}
