class DetailsDashboard extends Dashboard{
    constructor(id){
        super(id);
        this.details = new Details(this.bodyId);
    }

    start(){
        if (dashboardContainer.className == 'hide'){
            this.makeTheTableAndButtons(this.header())
            this.details.displayAll();
        } 
        dashboardContainer.classList.toggle('hide');
    }

    header(){
        return `
            <th>Order ID</th> 
            <th>Item ID</th>           
            <th>Product ID</th> 
            <th>Name</th>   
            <th>Quantity</th>
        `;
    }
}
