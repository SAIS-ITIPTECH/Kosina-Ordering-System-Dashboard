import { LoginPanel } from "./Login/LoginPanel.js";
import { DatabaseConnector } from "./Api/DatabaseConnector.js";
import { Categories } from "./Categories/Categories.js";
import { Products } from "./Products/Products.js";
import { History } from "./History/History.js";
import { Details } from "./Details/Details.js";
import { DailySales } from "./DailySales/DailySales.js";
import { ActiveOrder } from "./ActiveOrder/ActiveOrder.js";

export const database = new DatabaseConnector();

// Configuration maps for handling modular UI updates upon deletion requests
const modalMap = {
    "categories": Categories,
    "products": Products
};

const columnMap = {
    "categories": document.getElementById("categoryColumns"),
    "products": document.getElementById("productsColumns")
};

export function getCookie(cookieName) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name.trim() === cookieName) {
            return decodeURIComponent(value);
        }
    }
    return null;
}

const loginPanel = new LoginPanel();
loginPanel.checkToken();

let activeParentModal = null;

const screenLoaders = {
    'order-screen': { Module: Details, containerId: 'detailColumns' },
    'sales-screen': { Module: DailySales, containerId: 'saleColumns' },
    'category-screen': { Module: Categories, containerId: 'categoryColumns' },
    'products-screen': { Module: Products, containerId: 'productsColumns' },
    'history-screen': { Module: History, containerId: 'historyColumns' },
    'live-screen': { Module: ActiveOrder, containerId: 'live-orders-table-body' }
};

async function loadScreenData(targetId) {
    const loader = screenLoaders[targetId];
    if (!loader) return;

    const container = document.getElementById(loader.containerId);
    if (!container) return;

    const instance = new loader.Module(container);
    await instance.displayAll();
}

// ===============================================================
// FOR SWITCHING SCREENS
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.nav-btn');
    const screens = document.querySelectorAll('.tab-content');

    buttons.forEach(button => {
        button.addEventListener('click', async () => {
            const targetId = button.getAttribute('data-target');

            screens.forEach(screen => {
                screen.classList.add('hidden');
            });

            const targetScreen = document.getElementById(targetId);
            if (targetScreen) {
                targetScreen.classList.remove('hidden');
            }

            buttons.forEach(btn => {
                btn.classList.remove('bg-[#76a609]');
            });

            button.classList.add('bg-[#76a609]');
            await loadScreenData(targetId);
        });
    });
});

// ===============================================================
// DROPDOWN ELLIPSIS
const moreBtn = document.getElementById('more-btn');
const dropdownMenu = document.getElementById('dropdown-menu');

moreBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    dropdownMenu.classList.toggle('hidden');
});

document.addEventListener('click', () => {
    dropdownMenu.classList.add('hidden');
});

// Helper to capitalize strings
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Global variable tracking items selected for modification
let selectedId = null;
let currentProductImageBase64 = null;

// Helper to convert files into Base64 strings safely
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

// Handle Image changes in the form UI
window.handleImageUpload = async function (event) {
    const file = event.target.files[0];
    if (file) {
        currentProductImageBase64 = await fileToBase64(file);
        const previewImg = document.getElementById("productImagePreview");
        previewImg.src = currentProductImageBase64;
        previewImg.classList.remove("hidden");
    }
};

// ===================================================================
// EDIT & ADD CATEGORY DIALOGUES
window.openEditCategory = function (method, id = false) {
    const dialog = document.getElementById("addCat-screen");
    const title = document.getElementById("categoryTitle");

    title.innerHTML = `${capitalize(method)} <span class="text-[#76a609]">Category</span>`;

    if (id) {
        selectedId = id;
        setPreviousCategory(id);
    } else {
        selectedId = null;
    }

    document.getElementById("category-screen").classList.add("hidden");
    dialog.classList.remove("hidden");
};

function setPreviousCategory(id) {
    const selectedCategory = document.getElementById(id);
    if (!selectedCategory) return;

    const cells = selectedCategory.cells;
    document.getElementById("displayIndex").value = cells[0].innerText;
    document.getElementById("categoryName").value = cells[1].innerText;
    document.getElementById("categoryId").value = cells[2].innerText;
}

window.closeEditCategory = function () {
    document.getElementById("displayIndex").value = "";
    document.getElementById("categoryName").value = "";
    document.getElementById("categoryId").value = "";
    selectedId = null;

    document.getElementById("addCat-screen").classList.add("hidden");
    document.getElementById("category-screen").classList.remove("hidden");
};

window.submitCategory = async function () {
    const title = document.getElementById("categoryTitle");
    const displayIndex = document.getElementById("displayIndex").value;
    const categoryName = document.getElementById("categoryName").value;
    const categoryId = document.getElementById("categoryId").value;

    let response;
    let message;

    if (title.innerText.toLowerCase().includes("edit")) {
        response = await database.patch("categories", {
            "displayIndex": displayIndex,
            "name": categoryName,
            "categoryId": categoryId
        }, selectedId);
        message = "UPDATED";
    } else {
        response = await database.post("categories", {
            "displayIndex": displayIndex,
            "name": categoryName,
            "categoryId": categoryId
        });
        message = "ADDED";
    }

    if (response && response["status"] === "error") {
        window.alert(`${response["message"]}`);
    } else {
        window.alert(`Category ${message} SUCCESSFULLY!`);
        window.closeEditCategory();

        const categories = new Categories(document.getElementById("categoryColumns"));
        await categories.displayAll();
    }
};

// ===================================================================
// DELETE CATEGORY LOGIC (UPDATED WITH CUSTOM MODAL)
window.openDelete = function (util) {
    const buttonName = (util[0] === "categories") ? "category" : "product";
    openConfirm(`Delete ${buttonName}`, deleteItem, util, "Are you sure you want to delete this category?");
};

// ===================================================================
// EDIT & ADD PRODUCT DIALOGUES
window.openEditProduct = async function (method, id = false) {
    const dialog = document.getElementById("addPro-screen");
    const title = document.getElementById("productFormTitle");

    title.innerHTML = `${capitalize(method)} <span class="text-[#76a609]">Product</span>`;

    // Clear image cache variables and display defaults
    currentProductImageBase64 = null;
    const previewImg = document.getElementById("productImagePreview");
    previewImg.src = "";
    previewImg.classList.add("hidden");
    document.getElementById("productImageInput").value = "";

    // Fetch and dynamically fill Category selection element
    const selectElement = document.getElementById("productCatId");
    selectElement.innerHTML = "";
    try {
        const categoriesList = await database.get("categories");
        if (categoriesList && Array.isArray(categoriesList)) {
            categoriesList.forEach(cat => {
                const opt = document.createElement("option");
                opt.value = cat.categoryId;
                opt.textContent = cat.name;
                selectElement.appendChild(opt);
            });
        }
    } catch (err) {
        console.error("Could not fetch categories list dropdown option values:", err);
    }

    if (id) {
        selectedId = id;
        setPreviousProduct(id);
    } else {
        selectedId = null;
        // Reset normal text items
        document.getElementById("productId").value = "";
        document.getElementById("productName").value = "";
        document.getElementById("price").value = "";
        document.getElementById("availableTrue").checked = true;
    }

    document.getElementById("products-screen").classList.add("hidden");
    dialog.classList.remove("hidden");
};

function setPreviousProduct(id) {
    const row = document.getElementById(id);
    if (!row) return;

    const cells = row.cells;

    // Process image tracking source element
    const existingImgSrc = cells[0].querySelector("img").src;
    if (existingImgSrc && !existingImgSrc.includes("null") && existingImgSrc.startsWith("data:")) {
        currentProductImageBase64 = existingImgSrc;
        const previewImg = document.getElementById("productImagePreview");
        previewImg.src = existingImgSrc;
        previewImg.classList.remove("hidden");
    }

    document.getElementById("productCatId").value = cells[1].innerText;
    document.getElementById("productId").value = cells[2].innerText;
    document.getElementById("productName").value = cells[3].innerText;

    // Clean currency characters out of text fields
    const cleanPrice = cells[4].innerText.replace(/[^0-9.]/g, '');
    document.getElementById("price").value = cleanPrice;

    const isAvailable = cells[5].innerText.trim().toLowerCase() === "true";
    if (isAvailable) {
        document.getElementById("availableTrue").checked = true;
    } else {
        document.getElementById("availableFalse").checked = true;
    }
}

window.closeEditProduct = function () {
    document.getElementById("productId").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("price").value = "";
    document.getElementById("productImageInput").value = "";
    currentProductImageBase64 = null;
    selectedId = null;

    document.getElementById("addPro-screen").classList.add("hidden");
    document.getElementById("products-screen").classList.remove("hidden");
};

window.submitProduct = async function () {
    const title = document.getElementById("productFormTitle");
    const categoryId = document.getElementById("productCatId").value;
    const productId = document.getElementById("productId").value;
    const productName = document.getElementById("productName").value;
    const price = parseFloat(document.getElementById("price").value) || 0;
    const available = document.getElementById("availableTrue").checked;

    const payload = {
        "category_id": categoryId,
        "product_id": productId,
        "name": productName,
        "price": price,
        "available": available,
        "display_url": currentProductImageBase64
    };

    let response;
    let message;

    if (title.innerText.toLowerCase().includes("edit")) {
        response = await database.patch("products", payload, selectedId);
        message = "UPDATED";
    } else {
        response = await database.post("products", payload);
        message = "ADDED";
    }

    if (response && response["status"] === "error") {
        window.alert(`${response["message"]}`);
    } else {
        window.alert(`Product ${message} SUCCESSFULLY!`);
        window.closeEditProduct();

        const products = new Products(document.getElementById("productsColumns"));
        await products.displayAll();
    }
};

// ===================================================================
// DISTINCT DELETE PRODUCT LOGIC (UPDATED WITH CUSTOM MODAL)
window.openDeleteProduct = function (id) {
    openConfirm("Delete product", deleteItem, ["products", id], "Delete product? You may contact the developers to undo this decision.");
};


// ========================================================================================
// REUSABLE POPUP MODAL CONTROL UTILITIES

const confirmButton = document.getElementById("confirmButton");
const confirmMessage = document.getElementById("confirmMessage");
const confirmTitle = document.getElementById("confirmTitle");

window.openExit = function () {
    openConfirm("Log Out", exitDashboard, null, "Are you sure you want to log out of the Admin Terminal Access?");
};

window.openPaid = function (util) {
    if (util[1].innerText === "PAID") {
        window.alert("this order is already paid!");
    } else {
        openConfirm("Confirm Paid", confirmPaid, util, "Are you sure you want to change this order status to PAID?");
    }
};

window.openServed = function (util) {
    openConfirm("FINISH ORDER", orderServed, util, "Are you sure this order has been fully served?");
};

function openConfirm(titleText, func, util = null, body = null) {
    const dialog = document.getElementById("exitDialog");
    dialog.classList.remove("hidden");
    dialog.classList.add("flex");

    confirmTitle.innerText = titleText;
    confirmMessage.innerText = body;

    confirmButton.onclick = () => {
        func(util);
    };
}

window.closeConfirm = function () {
    const dialog = document.getElementById("exitDialog");
    dialog.classList.add("hidden");
    dialog.classList.remove("flex");
};

async function deleteItem([table, id]) {
    const response = await database.delete(table, id);
    if (response && response["status"] === "error") {
        window.alert(`${response["message"]}`);
    } else {
        window.alert("DELETED SUCCESSFULLY!");
        if (modalMap[table] && columnMap[table]) {
            const newTable = new modalMap[table](columnMap[table]);
            await newTable.displayAll();
        }
    }
    closeConfirm();
}

async function confirmPaid([id]) {
    await database.patch("confirmCash", null, id);
    const history = new History(document.getElementById("historyColumns"));
    await history.displayAll();
    closeConfirm();
}

function exitDashboard() {
    document.cookie = "token= ;expires=Tue, 11 Sep 2001 00:00:00 UTC; path=/;";
    document.cookie = "name= ;expires=Tue, 11 Sep 2001 00:00:00 UTC; path=/;";
    document.cookie = "resto= ;expires=Tue, 11 Sep 2001 00:00:00 UTC; path=/;";
    window.location.reload();
}

async function orderServed(id) {
    let response = await database.patch("liveorder", null, id);
    window.alert(`${response["message"]}`);
    // Check if displayActives is a global function from other script files
    if (typeof displayActives === "function") {
        displayActives();
    }
    closeConfirm();
}