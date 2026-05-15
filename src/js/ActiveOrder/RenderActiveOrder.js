import { ColumnElements } from "../Parents/ColumnElements.js";

export class RenderActiveOrder extends ColumnElements{
    constructor(container, id, orders){
        super(container, null, id);
        this.orders = orders;
    }

    render(){
        let ordersHtml = `
            <tr>
                <td>NAME</td>
                <td>Quantity</td>
            </tr>
        `
        this.orders.forEach(element => {
            ordersHtml += `
                <tr>
                    <td>${element.name}</td>
                    <td>${element.quantity}</td>
                </tr>
            `
        });

        const activeOrder = document.createElement("table")
        activeOrder.innerHTML = `
            <thead>
                <tr>
                    <th>${this.id}</th>
                </tr>
            </thead>
            <tbody id="saleColumns">
                ${ordersHtml}
                <tr>
                    <td>
                        <button onclick="openServed('${this.id}')">COMPLETE ORDER</button>
                    </td>
                </tr>
            </tbody>
        `
        this.renderAll(activeOrder, null, true);
    }
}
