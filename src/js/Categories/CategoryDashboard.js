class CategoryDashboard extends Dashboard{
    constructor(id){
        super(id);
        this.categories = new Categories(this.bodyId);
        this.newButton = `<button id="add">Add Category</button>`;

    }

    start(){
        if (dashboardContainer.className == 'hide'){
            this.makeTheTableAndButtons(this.header(), this.newButton)
            this.categories.displayAll();
            this.addSomethingButton()
        }
        dashboardContainer.classList.toggle('hide');
    }
    
    addSomethingButton(){
        console.log("add")
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
            <th>Index</th> 
            <th>Category Name</th> 
            <th>Category ID</th> 
            <th>Edit</th>
        `;
    }
}
