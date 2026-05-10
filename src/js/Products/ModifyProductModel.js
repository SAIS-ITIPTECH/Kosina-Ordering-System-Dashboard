// MODIFY MODEL

class ModifyProductModel{
    constructor(inputValues){
        this.name = inputValues["name"].value;
        this.price = inputValues["price"].value;
        this.categoryId = inputValues["categoryId"].value;
        this.available = inputValues["available"].value;
        this.database = new DatabaseConnector("products");
    }
    
    async posttoDB(){
        let response = await this.database.post({
            "name":  this.name,
            "price":  this.price,
            "categoryId":  this.categoryId,
            "available":  this.available
        })

        window.alert(`${await response["message"]}`);

        let newDashboard = new ProductsDashboard("products")
        dashboardContainer.classList.toggle("hide");
        newDashboard.start()
    }

    async updateDb(id){
        let response = await this.database.patch({
            "name":  this.name,
            "price":  this.price,
            "categoryId":  this.categoryId,
            "available":  this.available
        }, id)

        window.alert(`${await response["message"]}`);

        let newDashboard = new ProductsDashboard("products")
        dashboardContainer.classList.toggle("hide");
        newDashboard.start()
    }
}
