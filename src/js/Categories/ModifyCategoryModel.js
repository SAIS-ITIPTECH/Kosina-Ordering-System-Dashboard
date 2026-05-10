// MODIFY MODEL

class ModifyCategoryModel{
    constructor(inputValues){
        this.displayIndex = inputValues["displayIndex"].value;
        this.name = inputValues["name"].value;
        this.categoryId = inputValues["categoryId"].value;
        this.database = new DatabaseConnector("categories");
    }

    async posttoDB(){
        let response = await this.database.post({
            "displayIndex":  this.displayIndex,
            "name":  this.name,
            "categoryId":  this.categoryId
        })
            
        window.alert(`${await response["message"]}`);

        let newDashboard = new CategoryDashboard("categories")
        dashboardContainer.classList.toggle("hide");
        newDashboard.start()
    }

    async updateDb(id){
        let response = await this.database.patch({
            "displayIndex":  this.displayIndex,
            "name":  this.name,
            "categoryId":  this.categoryId
        }, id)

        window.alert(`${await response["message"]}`);

        let newDashboard = new CategoryDashboard("categories")
        dashboardContainer.classList.toggle("hide");
        newDashboard.start()
    }
}
