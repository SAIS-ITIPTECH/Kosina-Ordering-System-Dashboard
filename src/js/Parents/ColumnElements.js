export class ColumnElements {
    constructor(container, name, id, type) {
        this.type = type;
        this.name = name;
        this.id = id;
        this.container = container;
        this.deleteButtons = [];
    }

    renderAll(th, clss, live = false) {
        if (live) {
            this.container.appendChild(th)
        } else {
            const row = document.createElement('tr');
            row.id = this.id;
            row.className = (clss)
            row.innerHTML= th;
            this.container.appendChild(row);
        }   
    }
}
