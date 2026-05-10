import { ColumnElements } from "../Parents/ColumnElements.js";

export class RenderDetails extends ColumnElements{
    constructor(container, det){
        super(container, det.name, det.detail_id);
        this.orderId = det.order_id;
        this.productId = det.product_id;
        this.quantity = det.quantity;
    }

    render(){
        this.renderAll(`
            <td class="py-6 font-bold">${this.orderId}</td>
            <td class="py-6 font-mono text-xs text-gray-400">${this.id}</td>
            <td class="py-6 font-mono text-xs text-gray-400">${this.productId}</td>
            <td class="py-6 font-black text-xl">${this.name}</td>
            <td class="py-6 font-black text-xl">${this.quantity}</td>
        `, "py-6 border-b border-gray-50");
    }
}
