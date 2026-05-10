class ProductsDashboard extends Dashboard{
    constructor(id){
        super(id);
        this.categories = new Products(this.bodyId);
        this.newButton = `<button id="add">Add Product</button>`;
    }

    start(){
        if (dashboardContainer.className == 'hide'){
            this.makeTheTableAndButtons(this.header(),this.newButton)
            this.categories.displayAll();
            this.addSomethingButton()
        } 
        dashboardContainer.classList.toggle('hide');
    }
      
    addSomethingButton(){
        document.getElementById('add').onclick = () => {
            if (modifyPanel.className == 'hide'){
                let edit = this.chooseOptions(this.id);
                edit.start();
            } 
            modifyPanel.classList.toggle('hide')
        }
    }

    header(){
        return `
            <th>Image</th>
            <th>Category ID</th> 
            <th>Product ID</th> 
            <th>Product Name</th> 
            <th>Price</th>
            <th>Available</th>
            <th>Modify</th>
        `;
    }
}
