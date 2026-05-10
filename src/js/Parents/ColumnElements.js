export class ColumnElements {
    constructor(container, name, id, type) {
        this.type = type;
        this.name = name;
        this.id = id;
        this.container = container;
        this.deleteButtons = [];
    }

    renderAll(th, clss) {
        const row = document.createElement('tr');
        row.id = this.id;
        row.className = (clss)
        row.innerHTML= th;
        this.container.appendChild(row);
        // this.getDeleteButtons();
        // this.getEditButtons();
    }

    // getDeleteButtons(){
    //     const elements = document.getElementsByClassName('deleteButton');
    //     for(let el of elements){
    //         el.onclick = async () => {
    //             console.log("delete")
    //             await del.openPanel(el.value, this.type, this)
    //         }
    //         this.deleteButtons.push(el);
    //     }
    // }

    // getEditButtons(){
    //     const elements = document.getElementsByClassName('editButton');
    //     for(let el of elements){
    //         el.onclick = async () => {
    //             console.log("edit")
    //             if (modifyPanel.className == 'hide'){
    //                 let edit = this.chooseOptions(this.type);
    //                 edit.start(el.value);
    //             } 
    //             modifyPanel.classList.toggle('hide')
    //         } 
    //     }
    // }

    // chooseOptions(value) {
    //     const modifyPanel = modifyPanelMap[value];
    //     if (!modifyPanel) {
    //         window.alert(`No class for ${value} yet`);
    //         return null;
    //     }
    //     return new modifyPanel("edit");
    // }
}
