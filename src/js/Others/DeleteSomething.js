// MODIFY CLASS

class DeleteSomething{
    constructor(){
        this.dashboardMap = {
            "categories": CategoryDashboard,
            "products": ProductsDashboard
        }
    }
    openPanel(id, type){
        return new Promise((resolve) => {
            deletePanel.classList.toggle('hide');
            no.onclick = () => {
                deletePanel.classList.toggle('hide');
                return resolve();
            };

            yes.onclick = () => {
                this.delete(id, type);
                return resolve();
            };
            
        })
    }

    async delete(id, type){
        const database = new DatabaseConnector(type);
        const response = await database.delete(id)

        window.alert(`${await response["message"]}`);
        
        let newDashboard = new this.dashboardMap[type](type);
        dashboardContainer.classList.toggle("hide");
        newDashboard.start()
        deletePanel.classList.toggle('hide');
    }
}
