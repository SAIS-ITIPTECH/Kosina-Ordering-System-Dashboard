let activeParentModal = null;

// 1. DASHBOARD NAVIGATION LOGIC
function showDashboard(event) {
    event.preventDefault();
    const login = document.getElementById("login");
    login.classList.add("fade-out");

    setTimeout(() => {
        login.classList.add("hidden");
        document.getElementById("loading").classList.remove("hidden");

        setTimeout(() => {
            document.getElementById("loading").classList.add("hidden");
            const dash = document.getElementById("dashboard");
            dash.classList.remove("hidden");
            dash.classList.add("fade-in");
        }, 800);
    }, 400);
}

// 2. UNIFIED MODAL SYSTEM (Opens Category, History, Sales, etc.)
function toggleModal(id, show) {
    const overlay = document.getElementById("modalOverlay");
    const modal = document.getElementById(id);

    if (show) {
        overlay.classList.remove("hidden");
        overlay.classList.add("flex");
        modal.classList.remove("hidden");
    } else {
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

function openEditList(id) {
    const dialog = document.getElementById('id');
    dialog.classList.remove("hidden");
    dialog.classList.add("flex");
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