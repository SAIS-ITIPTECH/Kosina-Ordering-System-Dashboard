class ModifyCategory extends EditPanel{
    constructor(type){
        super(document.getElementById('inputFields'), type, ["displayIndex", "name", "categoryId"]);
    }

    start(target = null){
        const dashboardType = "categories";
        const title = this.modificationType === "add" ? "ADD NEW CATEGORY" : `EDIT ${target}`;
        this.createInputFields(this.inputFields(), title, this.inputFields, target, dashboardType);
        const inputDomElements = this.inputsDOM();
        if (this.modificationType === "edit") {
            this.displayCurrentValue(target, inputDomElements); }
        this.createButtons(target, ModifyCategoryModel, inputDomElements);
    }

    inputsDOM(){  
        let inputs = {};
        this.inputsId.forEach(id => {
            inputs[id] = document.getElementById(id);
        });
        return inputs;
    }

    displayCurrentValue(target, inputsDomElements){
        const row = document.getElementById(target);
        const cells = row.cells;
        let index = 0;
        Object.values(inputsDomElements).forEach(input => {
            input.value = cells[index].innerHTML;
            index++;
        });
    }

    inputFields(){
        return `
            <label for="index">Display Index: </label>
            <input type="text" name="index" id="displayIndex">
            <br>
            <label for="name">Category Name: </label>
            <input type="text" name="name" id="name">
            <br>
            <label for="id">Category Id: </label>
            <input type="text" name="id" id="categoryId">
        `
    }
}
