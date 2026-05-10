class ModifyProducts extends EditPanel{
    constructor(type){
        super(document.getElementById('inputFields'), type, ["name", "price", "categoryId", "available"]);
    }

    async start(target = null){
        const dashboardType = "products";
        const title = this.modificationType === "add" ? "ADD NEW PRODUCTS" : `EDIT ${target}`;
        this.createInputFields(await this.inputFields(), title, this.inputFields, target, dashboardType);
        const inputDomElements = this.inputsDOM();
        if (this.modificationType === "edit") { this.displayCurrentValue(target, inputDomElements); }
        this.createButtons(target, ModifyProductModel, inputDomElements);
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
        inputsDomElements["name"].value = cells[3].innerHTML
        inputsDomElements["categoryId"].selectedIndex = [...inputsDomElements["categoryId"].options].findIndex(opt => opt.value == cells[1].innerHTML);
        inputsDomElements["name"].value = cells[3].innerHTML
        inputsDomElements["price"].value = cells[4].innerHTML
        inputsDomElements["available"].selectedIndex = [...inputsDomElements["available"].options].findIndex(opt => opt.text == cells[5].innerHTML);
    }

    async inputFields(){
        const database = new DatabaseConnector("categories");
        const result = await database.get();
        let categoryChoices = "";
        result.forEach(element => {
            categoryChoices += `<option value="${element["category_id"]}">${element["category_id"]}</option>`
        });

        return `
            <label for="name">Category ID: </label>
            <select name="categoryId" id="categoryId">
                ${categoryChoices}
            </select>
            <br>
            <label for="name">Product Name: </label>
            <input type="text" name="name" id="name">
            <br>
            <label for="price">Price: </label>
            <input type="number" name="price" id="price">
            <br>
            <label for="avail">Available: </label>
            <select name="avail" id="available">
                <option value="true">TRUE</option>
                <option value="false">FALSE</option>
            </select>
        `
    }
}
