// OPTION BUTTONS CLASS

class OptionsButton{    
    constructor(className){
        this.buttonList = [];
        this.className = className;
    }

    start(){
        const elements = document.getElementsByClassName(this.className);
        for(let el of elements){
            if (el.value === "logout") {
                el.onclick = () => {
                    logout();
                }
                break;
            }

            el.onclick = () => {
                mainPanel.classList.toggle('hide');
                const dashboard = this.chooseOptions(el.value);
                if (dashboard) dashboard.start();
            }
            this.buttonList.push(el);
        }
    }

    chooseOptions(value) {
        const dashboard = dashboardMap[value];
        if (!dashboard) {
            window.alert(`No class for ${value} yet`);
            mainPanel.classList.toggle('hide');
            return null;
        }
        return new dashboard(value);
    }
}

// MAIN DASHBOARD CLASSES

class Dashboard{
    constructor(id){
        this.id = id;
        this.headerId = `${id}Header`;
        this.bodyId = `${id}Body`
    }

    makeTheTableAndButtons(head, button = ""){
        dashboardContainer.innerHTML = this.makeTableTemplate(button);
        const table = document.getElementById(`${this.headerId}`)
        table.innerHTML = head
        this.back();
    }

    chooseOptions(value) {
        const modifyPanel = modifyPanelMap[value];
        if (!Dashboard) {
            window.alert(`No class for ${value} yet`);
            return null;
        }
        return new modifyPanel("add");
    }

    back(){
        document.getElementById("back").onclick = () => {
            dashboardContainer.classList.toggle('hide');
            dashboardContainer.innerHTML = '';
            modifyPanel.classList.toggle('hide');
            modifyPanel.innerHTML = '';
            mainPanel.classList.toggle('hide');
        }
    }

    makeTableTemplate(button){
        return `    
            <div id=${this.id}Dashboard>
                <table >
                    <thead id=${this.headerId}></thead>
                    <tbody id=${this.bodyId}></tbody> 
                </table>
            </div> 
            <div>
                ${button}
                <button id="back">Back</button>
            </div> 
        `
    }
}

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

// DATABASE MODELS

class Categories{
    constructor(container){
        this.container = container;
    }

    async displayAll(){
        const database = new DatabaseConnector("categories");
        const categories = await database.get();
        for(let cat of categories){
            const renderer = new RenderCategories(this.container, cat)
            renderer.render();
        }
    }
}

class Products{
    constructor(container){
        this.container = container;
    }

    async displayAll(){
        const database = new DatabaseConnector("products");
        const products = await database.get();

        for(let pro of products){
            const renderer = new RenderProducts(this.container, pro);
            renderer.render();
        }
    }
}

class History{
    constructor(container){
        this.container = container;
    }

    async displayAll(){
       
        const database = new DatabaseConnector("history");
        const history = await database.get();
        for(let his of history){
            const renderer = new RenderHistory(this.container, his)
            renderer.render();
        }
    }
}

class Details{
    constructor(container){
        this.container = container;
    }

    async displayAll(){
       
        const database = new DatabaseConnector("details");
        const details = await database.get();
        for(let det of details){
            const renderer = new RenderDetails(this.container, det)
            renderer.render();
        }
    }
}

class DailySales{
    constructor(container){
        this.container = container;
    }

    async displayAll(){
        const database = new DatabaseConnector("sales");
        const sales = await database.get();
        for(let sal of sales){
            const renderer = new RenderDailySales(this.container, sal)
            renderer.render();
        }
    }
}


// DATA COLUMNS STUFF

class ColumnElements {
    constructor(container, name, id, type) {
        this.type = type;
        this.name = name;
        this.id = id;
        this.container = document.getElementById(container);
        this.deleteButtons = [];
    }

    renderAll(cat) {
        const row = document.createElement('tr');
        row.id = this.id;
        row.innerHTML= cat;
        this.container.appendChild(row);
        this.getDeleteButtons();
        this.getEditButtons();
    }

    getDeleteButtons(){
        const elements = document.getElementsByClassName('deleteButton');
        for(let el of elements){
            el.onclick = async () => {
                await del.openPanel(el.value, this.type, this)
            }
            this.deleteButtons.push(el);
        }
    }

    getEditButtons(){
        const elements = document.getElementsByClassName('editButton');
        for(let el of elements){
            el.onclick = async () => {
                if (modifyPanel.className == 'hide'){
                    let edit = this.chooseOptions(this.type);
                    edit.start(el.value);
                } 
                modifyPanel.classList.toggle('hide')
            } 
        }
    }

    chooseOptions(value) {
        const modifyPanel = modifyPanelMap[value];
        if (!modifyPanel) {
            window.alert(`No class for ${value} yet`);
            return null;
        }
        return new modifyPanel("edit");
    }
}

class RenderCategories extends ColumnElements{
    constructor(container, cat){
        super(container, cat.name, cat.category_id, 'categories');
        this.index = cat.display_index;
        
    }

    render(){      
        this.renderAll(`<td>${this.index}</td>
                        <td>${this.name}</td>
                        <td>${this.id}</td>
                        <td>
                            <button class="editButton" value="${this.id}">Edit</button>
                            <button class="deleteButton" value="${this.id}">Delete</button>
                        </td>`
        );  
    }

    
}

class RenderProducts extends ColumnElements{
    constructor(container, pro){
        super(container, pro.name, pro.product_id, 'products');
        this.categoryId = pro.category_id
        this.price = pro.price;
        this.available = Boolean(pro.available);
        this.imageUrl = pro.display_url ?? null; 
        this.imgId = pro.image_id;
    }

    render(){
        this.renderAll(`
                        <td><img class="productImg" src="${this.imageUrl}" id="${this.id}Img" alt="${this.imgId}"></td>
                        <td>${this.categoryId}</td>
                        <td>${this.id}</td>
                        <td>${this.name}</td>
                        <td>${this.price}</td>
                        <td>${String(this.available).toUpperCase()}</td>
                        <td>
                            <button class="editImageButton" value="${this.id}">Image</button>
                            <button class="editButton" value="${this.id}">Edit</button>
                            <button class="deleteButton" value="${this.id}">Delete</button>
                        </td>`
        );

        this.getImageButtons()
    }

    getImageButtons(){
        const elements = document.getElementsByClassName('editImageButton');
        for(let el of elements){
            el.onclick = async () => {
                upload.open(el.value)
            } 
        }
    }

}

class RenderHistory extends ColumnElements{
    constructor(container, his){
        super(container, null, his.order_id);
        this.date = his.order_date;
        this.totalPrice = his.total_price;
        this.paymentMethod = his.payment_method;
        this.paid = his.paid;
        this.dailySaleId = his.daily_sale_id;
    }

    render(){
        this.renderAll(`
            <td>${this.dailySaleId}</td>
            <td>${this.id}</td>
            <td>${this.date}</td>
            <td>${this.totalPrice}</td>
            <td>${this.paymentMethod}</td>
            <td>${this.paid}</td>
        `);
    }
}

class RenderDetails extends ColumnElements{
    constructor(container, det){
        super(container, det.name, det.detail_id);
        this.orderId = det.order_id;
        this.productId = det.product_id;
        this.quantity = det.quantity;
    }

    render(){
        this.renderAll(`
            <td>${this.orderId}</td>
            <td>${this.id}</td>
            <td>${this.productId}</td>
            <td>${this.name}</td>
            <td>${this.quantity}</td>
            <td>
        `);
    }
}

class RenderDailySales extends ColumnElements{
    constructor(container, sal){
        super(container, null, sal.daily_sale_id);
        this.date = sal.date;
        this.totalSales = sal.total_sales;
        this.totalIncome = sal.total_income;
    }

    render(){
        this.renderAll(`
            <td>${this.id}</td>
            <td>${this.date}</td>
            <td>${this.totalSales}</td>
            <td>${this.totalIncome}</td>
            <td>
        `);
    }
}

// DATABASE CLASSES

class DatabaseConnector{
    constructor(target){
        this.target = target;
    }

    async get() {
        let data = await fetch(`https://kosina-api.up.railway.app/${this.target}`,{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${tokenChecker.getCookie("token")}`
            }
        }) 
        return await data.json();
    }

    async post(body){
        let data = await fetch(`https://kosina-api.up.railway.app/${this.target}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${tokenChecker.getCookie("token")}`
            },
            body: JSON.stringify(body)
        }) 
        return await data.json();
    }

    async patch(body, id){
        console.log(id);
        let data = await fetch(`https://kosina-api.up.railway.app/${this.target}/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${tokenChecker.getCookie("token")}`
            },
            body: JSON.stringify(body)
        }) 
        return await data.json();
    }

    async delete(id){
        console.log(id);
        let data = await fetch(`https://kosina-api.up.railway.app/${this.target}/${id}`,{
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${tokenChecker.getCookie("token")}`
            },
        }) 
        return await data.json();
    }
}

// MODIFY CLASSES
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

class EditPanel{
    constructor(container, type, inputsId){
        this.modificationType = type;
        this.container = container;
        this.inputsId = inputsId
    }

    createInputFields(inputHtml, title, target = null, type){
        modifyPanel.innerHTML = this.modifyScreenTemplate(title);
        document.getElementById('inputContainers').innerHTML = inputHtml;
    }

    createButtons(target, model, inputDomElements){
        document.getElementById('confirm').onclick = () =>{
            

            modifyPanel.classList.toggle('hide');
            const modify = new model(inputDomElements);
             
            if (this.modificationType === "add") {
                modify.posttoDB();
            } else {
                modify.updateDb(target);
            }
        }

        document.getElementById('cancel').onclick = () =>{
            modifyPanel.classList.toggle('hide');
        }
    }

    displayCurrentValue(inputId, target, type){
        const row = document.getElementById(target);
        const cells = row.cells;

        let index = 0;
        Object.values(inputId).forEach(input => {
            if(type == "products" && index == 1) { return; }
            input.value = cells[index].innerHTML;
            index++;
        });
    }

    modifyScreenTemplate(title ="ADD SOMETHING"){           
        return `    
            <header>${title}</header>
            <section id="inputContainers"></section>
            <section id="confirmButtons">
                <button id="confirm">CONFIRM</button>
                <button id="cancel">CANCEL</button>
            </section>
        `
    }

}

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

// MODIFY MODELS

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

// LOGIN CLASSES
class LoginPanel{
    constructor(){
        this.database = new DatabaseConnector("login");
        const loginButton = document.getElementById("loginButton");
        this.username = document.getElementById("username");
        this.password = document.getElementById("password");
        loginButton.onclick = () => {
            this.submit();
        }
    }

    async submit(){
        let data = await this.database.post({
            "username": this.username.value,
            "password": this.password.value
        });
        
        this.username.value = "";
        this.password.value = "";

        if (data["status"] === "error") {window.alert(`${data["message"]}`);}
        else{
            loginPanel.classList.toggle("hide");
            mainPanel.classList.toggle("hide");
            this.saveToCookie(data);
        }
    }

    saveToCookie(data){
        document.cookie = `token=${data["token"]}; max-age=${data["expiration"]}; path=/`
        document.cookie = `name=${data["name"]}; max-age=${data["expiration"]}; path=/`
        document.cookie = `resto=${data["resto"]}; max-age=${data["expiration"]}; path=/`
    }
}

class TokenChecker{
    constructor(){
        this.database = new DatabaseConnector("return");
    }

    async checkToken(){
        let data = await this.database.get();
        if (data["status"] === "error") {
            window.alert(`${data["message"]}`);
            
        }
        else{
            window.alert("welcome back");
            loginPanel.classList.toggle("hide");
            mainPanel.classList.toggle("hide");
        }
    }

    getCookie(cookieName){
        const cookies = document.cookie.split(';');
        for(const cookie of cookies){
            const [name, value] = cookie.split('=');
            if(name.trim() === cookieName){
                return decodeURIComponent(value);
            }
        }
        return null;
    }
}

function logout(){
    document.cookie = "token= ;expires=Tue, 11 Sep 2001 00:00:00 UTC; path=/;";
    document.cookie = "name= ;expires=Tue, 11 Sep 2001 00:00:00 UTC; path=/;";
    document.cookie = "resto= ;expires=Tue, 11 Sep 2001 00:00:00 UTC; path=/;";
    mainPanel.classList.toggle("hide");
    location.reload();
}

class UploadPanel{
    constructor(){
        this.database = new DatabaseConnector("image");
    }

    open(id){
        this.id = id
        uploadPanel.classList.toggle("hide");

        addImage.onclick = async () => {
            if (this.checkIfEmpty().includes("null")) {
                const img64 = await this.getImage()
                if (!img64) { return; }
                this.addImage(img64)
            } else {
                window.alert("THIS PRODUCT HAS ALREADY IMAGE!");
            }
        }

        replaceImage.onclick = async () => {
            if (this.checkIfEmpty().includes("null")) {
                window.alert("THIS PRODUCT NO IMAGE!");
            } else {
                const img64 = await this.getImage()
                if (!img64) { return; }
                this.replaceImage(img64)
            }
        }

        removeImage.onclick = () => {
            if (this.checkIfEmpty().includes("null")) {
                window.alert("THIS PRODUCT NO IMAGE!");
            } else {
                this.removeImage()
            }
        }

        closeUpload.onclick = () => {
            uploadPanel.classList.toggle("hide");
        }
    }

    getImage() {
        return new Promise((resolve, reject) => {
            const file = imageInput.files[0];
            if (!file) return reject(window.alert("No file selected"));

            const reader = new FileReader();

            reader.onloadend = () => {
                resolve(reader.result);
            };

            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    async addImage(img64){
        const data = await this.database.post({
            "image": img64,
            "productId": this.id,
        })
        this.results(data);
    }

    async replaceImage(img64){
        const data = await this.database.patch({
            "image": img64,
            "productId": this.id,
            "imageId": document.getElementById(`${this.id}Img`).alt
        }, this.imageId)
        this.results(data);
    }

    async removeImage(){
        const data = await this.database.delete(document.getElementById(`${this.id}Img`).alt)
        this.results(data);
    }

    results(data){
        if (data["status"] === "error") {
            window.alert(`${data["message"]}`);
        }
        else{
            window.alert(`${data["message"]}`);
            uploadPanel.classList.toggle("hide");
            let newDashboard = new ProductsDashboard("products")
            dashboardContainer.classList.toggle("hide");
            newDashboard.start()
        }
    }
}

// Upload PANEL
const uploadPanel = document.getElementById('UploadPanel');
const imageInput = document.getElementById("image");
const replaceImage = document.getElementById("replaceImage");
const addImage = document.getElementById("addImage");
const removeImage = document.getElementById("removeImage");
const closeUpload = document.getElementById("closeUpload");
const upload = new UploadPanel();

//START
const buttons = new OptionsButton('optionButtons');
buttons.start();
const dashboardContainer = document.getElementById('dashboardPlaceholder')
const mainPanel = document.getElementById('main');

// DELETE PANEL
const deletePanel = document.getElementById("deletePanel");
const yes = document.getElementById('yes');
const no = document.getElementById('no');

// MODIFY PANEL
const modifyPanel = document.getElementById('modifyPanel');
const del = new DeleteSomething();
const loginPanel = document.getElementById("loginPanel");




//MAP
const dashboardMap = {
    'categories': CategoryDashboard,
    'products': ProductsDashboard,
    'history': HistoryDashboard,
    'details': DetailsDashboard,
    "dailySales": DailySalesDashboard
};

const modifyPanelMap = {
    'categories': ModifyCategory,
    'products': ModifyProducts
};

//LOGIN RELATED
const tokenChecker = new TokenChecker;
tokenChecker.checkToken();

const login = new LoginPanel();
const sidePanel = document.getElementById("sidePanel");