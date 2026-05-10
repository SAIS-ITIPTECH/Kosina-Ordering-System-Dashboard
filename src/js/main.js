import { LoginPanel } from "./Login/LoginPanel.js";
import { DatabaseConnector } from "./Api/DatabaseConnector.js";
import { Categories } from "./Categories/Categories.js";
import { Products } from "./Products/Products.js";
import { History } from "./History/History.js";
import { Details } from "./Details/Details.js";
import { DailySales } from "./DailySales/DailySales.js";


export const database = new DatabaseConnector();


export function getCookie(cookieName){
    const cookies = document.cookie.split(';');
    for(const cookie of cookies){
        const [name, value] = cookie.split('=');
        if(name.trim() === cookieName){
            return decodeURIComponent(value);
        }
    }
    return null;
}

const loginPanel = new LoginPanel();
loginPanel.checkToken();

let activeParentModal = null;

const modalMap = {
    'categories': Categories,
    'products': Products,
    'history': History,
    'details': Details,
    "sales": DailySales
};

const columnMap = {
    'categories': document.getElementById("categoryColumns"),
    'products': document.getElementById("productColumns"),
    'history': document.getElementById("historyColumns"),
    'details': document.getElementById("detailColumns"),
    "sales": document.getElementById("saleColumns")
}

// 2. UNIFIED MODAL SYSTEM (Opens Category, History, Sales, etc.)
function toggleModal(id, show) {
    console.log(id)
    const overlay = document.getElementById("modalOverlay");
    const modal = document.getElementById(id);
    const columnContainer = columnMap[id];

    console.log(columnContainer)

    if (show) {
        let modalContents = new modalMap[id](columnContainer);
        modalContents.displayAll();
        overlay.classList.remove("hidden");
        overlay.classList.add("flex");
        modal.classList.remove("hidden");
    } else {
        columnContainer.innerText = "";
        overlay.classList.add("hidden");
        overlay.classList.remove("flex");
        modal.classList.add("hidden");
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// 3. DIALOG SYSTEM (Opens Edit, Delete, Add New Popups)
let selectedId;
let selectedTable;

function openEditCategory(method, id = false){
    const dialog = document.getElementById("editCategory")
    const title = document.getElementById("categoryTitle");
    title.innerHTML = `
        ${capitalize(method)} <span class="text-[#76a609]">Category</span>
    `
    if (id) { 
        selectedId = id;
        setPreviousCategory(id); 
    }

    dialog.classList.remove("hidden");
    dialog.classList.add("flex");
}

const displayIndex = document.getElementById("displayIndex");
const categoryName = document.getElementById("categoryName");
const categoryId = document.getElementById("categoryId");

function setPreviousCategory(id){
    const selectedCategory = document.getElementById(id);
    const cells = selectedCategory.cells;
    displayIndex.value = cells[0].innerText;
    categoryName.value = cells[1].innerText;
    categoryId.value = cells[2].innerText;
}

function closeEditCategory(){
    displayIndex.value = "";
    categoryName.value = "";
    categoryId.value = "";

    const dialog = document.getElementById("editCategory")
    selectedId = null;
    dialog.classList.add("hidden");
    dialog.classList.remove("flex");
}

async function submitCategory(){
    const title = document.getElementById("categoryTitle");
    let response;
    let message;
    if (title.innerText.toLowerCase().includes("edit")){
        response = await database.patch("categories", {
            "displayIndex": displayIndex.value,
            "name": categoryName.value,
            "categoryId": categoryId.value
        }, selectedId);
        message = "UPDATED";
    } else if ((title.innerText.toLowerCase().includes("add"))) {
        response = await database.post("categories", {
            "displayIndex": displayIndex.value,
            "name": categoryName.value,
            "categoryId": categoryId.value
        })
        message = "ADDED";
    }

    if (await response["status"] === "error") {
        window.alert(`${response["message"]}`);
    } else {
        triggerSuccess(message);
        closeEditCategory();
        const categories = new Categories(document.getElementById("categoryColumns"))
        categories.displayAll();
    }
}

// ========================================================================================

async function openEditProduct(method, id = false){
    const dialog = document.getElementById("editProduct")
    const title = document.getElementById("productTitle");
    title.innerHTML = `
        ${capitalize(method)} <span class="text-[#76a609]">Product</span>
    `

    let choices = ``;
    let categories = await database.get('categories')
    categories.forEach(element => {
        choices += `<option value="${element["category_id"]}">${element["category_id"]}</option>`
    });
    productCatId.innerHTML = choices;

    if (id) { 
        selectedId = id;
        setPreviousProduct(); 
    }

   
    dialog.classList.remove("hidden");
    dialog.classList.add("flex");
}

const productCatId = document.getElementById("productCatId")
const productId = document.getElementById("productId")
const productName = document.getElementById("productName")
const price = document.getElementById("price")
const availableTrue = document.getElementById("avaialableTrue")
const availableFalse = document.getElementById("avaialableFalse")

function setPreviousProduct(){
    const selectedProduct = document.getElementById(selectedId);
    const cells = selectedProduct.cells;
    
    productCatId.selectedIndex = [...productCatId.options].findIndex(opt => opt.innerText === cells[1].innerText);
    productId.value = cells[2].innerText
    productName.value = cells[3].innerText
    price.value = cells[4].innerText
    if (cells[5].innerText.toLowerCase() === "true") {
        avaialableTrue.checked = true
    } else if (cells[5].innerText.toLowerCase() === "false") {
        availableFalse.checked = true
    }
}



function closeEditProduct(){
    productCatId.value = "";
    productId.value = "";
    productName.value = "";
    price.value = "";
    avaialableTrue.value = "";
    avaialableTrue.value = "";

    const dialog = document.getElementById("editProduct")
    dialog.classList.add("hidden");
    dialog.classList.remove("flex");
}

async function submitProduct(){
    let title = document.getElementById("productTitle")
    let response;
    let message;

    if (title.innerText.toLowerCase().includes("edit")){
        response = await database.patch("products", {
            "categoryId": productCatId.value,
            "productId": productId.value,
            "name": productName.value,
            "price": price.value,
            "available": Boolean(document.querySelector('input[name="availability"]:checked').value)
        }, selectedId);
        message = "UPDATED";

    } else if ((title.innerText.toLowerCase().includes("add"))) {
        response = await database.post("products", {
            "categoryId": productCatId.value,
            "productId": productId.value,
            "name": productName.value,
            "price": price.value,
            "available": Boolean(document.querySelector('input[name="availability"]:checked').value)
        })
        message = "ADDED";
    }

    if (await response["status"] === "error") {
        window.alert(`${response["message"]}`);
    } else {
        triggerSuccess(message);
        closeEditProduct();
        const products = new Products(document.getElementById("productColumns"))
        products.displayAll();
    }
}

// ========================================================================================

function openDelete(table, id){
    selectedTable = table;
    selectedId = id;
    const dialog = document.getElementById("deleteItem")
    dialog.classList.remove("hidden");
    dialog.classList.add("flex");
}

async function deleteItem(){
    const response = await database.delete(selectedTable, selectedId)
    window.alert(`${await response["message"]}`);

    const table = new modalMap[selectedTable](columnMap[selectedTable])
    table.displayAll();
    closeDelete();
}

function closeDelete(){
    selectedId = null;
    selectedTable = null;
    const dialog = document.getElementById("deleteItem")
    dialog.classList.add("hidden");
    dialog.classList.remove("flex");
}


// 4. SUCCESS FEEDBACK (The Toast Notification)
function triggerSuccess(message) {
    const toast = document.getElementById("successDihh");
    toast.classList.remove("hidden");
    toast.classList.add("flex");

    document.getElementById("successMsg").innerText = `${message} SUCCESSFULLY`

    setTimeout(() => {
        toast.classList.add("hidden");
        toast.classList.remove("flex");
    }, 2500);
}

// 5. LEGACY WRAPPERS (So your existing button clicks still work)
function openMenu() { toggleModal('categories', true); }
function closeMenu() { toggleModal('categories', false); }

function openList() { toggleModal('products', true); }
function closeList() { toggleModal('products', false); }

function openHistory() { toggleModal('history', true); }
function closeHistory() { toggleModal('history', false); }

function openDetails() { toggleModal('details', true); }
function closeDetails() { toggleModal('details', false); }

function openSales() { toggleModal('sales', true); }
function closeSales() { toggleModal('sales', false); }

// 6. LOGOUT
function exitDashboard() {
    window.location.reload(); // Hard reset back to login screen
}

// LOGOUT FUNCTION
function logout(){
    document.cookie = "token= ;expires=Tue, 11 Sep 2001 00:00:00 UTC; path=/;";
    document.cookie = "name= ;expires=Tue, 11 Sep 2001 00:00:00 UTC; path=/;";
    document.cookie = "resto= ;expires=Tue, 11 Sep 2001 00:00:00 UTC; path=/;";
    mainPanel.classList.toggle("hide");
    location.reload();
}

// UPLOAD IMG
const imageInput = document.getElementById("imageInput");

function openUpload(id){
    selectedId = id
    const dialog = document.getElementById("UploadPanel")
    dialog.classList.remove("hidden");
    dialog.classList.add("flex");
}

function closeUpload(){
    selectedId = null;
    const dialog = document.getElementById("UploadPanel")
    dialog.classList.add("hidden");
    dialog.classList.remove("flex");
}

async function addImg(){
    if (checkIfEmpty().includes("null")) {
        const img64 = await getImage() || false;
        if (!img64) { return; }
        const data = await database.post("image", {
            "image": img64,
            "productId": selectedId,
        })
        imgResults(data);
        closeUpload();
    } else {
        window.alert("THIS PRODUCT HAS ALREADY IMAGE!");
    }
}

async function replaceImg(){
    if (checkIfEmpty().includes("null")) {
            window.alert("THIS PRODUCT HAS NO IMAGE!");
    } else {
        const img64 = await getImage() || false;
        if (!img64) { return; }
        const data = await database.patch("image", {
            "image": img64,
            "productId": selectedId,
            "imageId": document.getElementById(`${selectedId}Img`).alt
        }, selectedId)
        imgResults(data);
        closeUpload();
    }
}

async function removeImg(){
    if (checkIfEmpty().includes("null")) {
        window.alert("THIS PRODUCT HAS NO IMAGE!");
    } else {
        const data = await database.delete("image", document.getElementById(`${selectedId}Img`).alt)
        imgResults(data);
        closeUpload();
    }
}

function checkIfEmpty(){
    return document.getElementById(`${selectedId}Img`).src
}

function getImage() {
    return new Promise((resolve, reject) => {
        const file = imageInput.files[0] ? imageInput.files[0] : false;
        if (!file) return reject(window.alert("No file selected"));

        const reader = new FileReader();

        reader.onloadend = () => {
            resolve(reader.result);
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function imgResults(data){
    if (data["status"] === "error") {
        window.alert(`${data["message"]}`);
    }
    else{
        window.alert(`${data["message"]}`);
        let newDashboard = new Products(columnMap["products"])
        newDashboard.displayAll()
    }
}

window.openMenu = openMenu;
window.openList = openList;
window.openHistory = openHistory;
window.openDetails = openDetails;
window.openSales = openSales;
window.closeMenu = closeMenu;
window.closeList = closeList;
window.closeHistory = closeHistory;
window.closeDetails = closeDetails;
window.closeSales = closeSales;

window.openEditCategory = openEditCategory;
window.closeEditCategory = closeEditCategory;
window.submitCategory = submitCategory;

window.openEditProduct = openEditProduct;
window.closeEditProduct = closeEditProduct;
window.submitProduct = submitProduct;

window.openDelete = openDelete;
window.deleteItem = deleteItem;
window.closeDelete = closeDelete;

window.openUpload = openUpload;
window.closeUpload = closeUpload;
window.addImg = addImg;
window.replaceImg = replaceImg;
window.removeImg = removeImg;
