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
    'menuModal': Categories,
    'listModal': Products,
    'historyModal': History,
    'detailsModal': Details,
    "salesModal": DailySales
};

const columnMap = {
    'menuModal': document.getElementById("categoryColumns"),
    'listModal': document.getElementById("productColumns"),
    'historyModal': document.getElementById("historyColumns"),
    'detailsModal': document.getElementById("detailColumns"),
    "salesModal": document.getElementById("saleColumns")
}

// 2. UNIFIED MODAL SYSTEM (Opens Category, History, Sales, etc.)
function toggleModal(id, show) {
    const overlay = document.getElementById("modalOverlay");
    const modal = document.getElementById(id);
    const columnContainer = columnMap[id];
    console.log(columnContainer)
        console.log(id)

    if (show) {
        let modalContents = new modalMap[id](columnContainer);
        modalContents.displayAll();
        overlay.classList.remove("hidden");
        overlay.classList.add("flex");
        modal.classList.remove("hidden");
    } else {
        columnContainer.innerText = "";
        console.log("hide")
        overlay.classList.add("hidden");
        overlay.classList.remove("flex");
        modal.classList.add("hidden");
    }
}

// 3. DIALOG SYSTEM (Opens Edit, Delete, Add New Popups)
function openDialog(id) {
    const dialog = document.getElementById(id);
    dialog.classList.remove("hidden");
    dialog.classList.add("flex");
}

function closeDialog(id) {
    const dialog = document.getElementById(id);
    dialog.classList.add("hidden");
    dialog.classList.remove("flex");
}

function openEditList1(id) {
    const dialog = document.getElementById(id);
    dialog.classList.remove("hidden");
    dialog.classList.add("flex");
}
function closeEditList1(id) {
    const dialog = document.getElementById(id);
    dialog.classList.add("hidden");
    dialog.classList.remove("flex");
}

// 4. SUCCESS FEEDBACK (The Toast Notification)
function triggerSuccess(parentId) {
    if (parentId) closeDialog(parentId);

    const toast = document.getElementById("successDihh");
    toast.classList.remove("hidden");
    toast.classList.add("flex");

    setTimeout(() => {
        toast.classList.add("hidden");
        toast.classList.remove("flex");
    }, 2500);
}

// 5. LEGACY WRAPPERS (So your existing button clicks still work)
function openMenu() { toggleModal('menuModal', true); }
function closeMenu() { toggleModal('menuModal', false); }

function openList() { toggleModal('listModal', true); }
function closeList() { toggleModal('listModal', false); }

function openEditList() { toggleModal('editList', true); }
function closeEditList() { toggleModal('editList', false); }

function openEditList() { toggleModal('editList', true); }
function closeEditList() { toggleModal('editList', false); }

function openHistory() { toggleModal('historyModal', true); }
function closeHistory() { toggleModal('historyModal', false); }

function openDetails() { toggleModal('detailsModal', true); }
function closeDetails() { toggleModal('detailsModal', false); }

function openSales() { toggleModal('salesModal', true); }
function closeSales() { toggleModal('salesModal', false); }

function openNew() { openDialog('editItem'); } // Reusing the edit dialog for new items
function openEdit() { openDialog('editItem'); }
function openDelete() { openDialog('deleteItem'); }

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

// UPLOAD PANEL
// const uploadPanel = document.getElementById('UploadPanel');
// const imageInput = document.getElementById("image");
// const replaceImage = document.getElementById("replaceImage");
// const addImage = document.getElementById("addImage");
// const removeImage = document.getElementById("removeImage");
// const closeUpload = document.getElementById("closeUpload");
// const upload = new UploadPanel();

// // START
// const buttons = new OptionsButton('optionButtons');
// buttons.start();
// const dashboardContainer = document.getElementById('dashboardPlaceholder')
// const mainPanel = document.getElementById('main');

// // DELETE PANEL
// const deletePanel = document.getElementById("deletePanel");
// const yes = document.getElementById('yes');
// const no = document.getElementById('no');

// // MODIFY PANEL
// const modifyPanel = document.getElementById('modifyPanel');
// const del = new DeleteSomething();
// const loginPanel = document.getElementById("loginPanel");

// // MAP
// const dashboardMap = {
//     'categories': CategoryDashboard,
//     'products': ProductsDashboard,
//     'history': HistoryDashboard,
//     'details': DetailsDashboard,
//     "dailySales": DailySalesDashboard
// };

// const modifyPanelMap = {
//     'categories': ModifyCategory,
//     'products': ModifyProducts
// };

// // LOGIN RELATED
// const tokenChecker = new TokenChecker;
// tokenChecker.checkToken();

// const login = new LoginPanel();
// const sidePanel = document.getElementById("sidePanel");

window.openMenu = openMenu;
window.openList = openList;
window.openHistory = openHistory;
window.openDetails = openDetails;
window.openSales = openSales;
window.toggleModal = toggleModal;
window.openDialog = openDialog;