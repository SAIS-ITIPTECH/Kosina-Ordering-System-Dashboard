import { ColumnElements } from "../Parents/ColumnElements.js";

export class RenderDetails extends ColumnElements {
    constructor(container, det) {
        super(container, det.name, det.detail_id);
        this.orderId = det.order_id;
        this.productId = det.product_id;
        this.quantity = det.quantity;
    }

    render() {
        this.renderAll(`
        <td class="py-5 px-6 font-mono text-sm text-gray-500">${this.productId}</td>
        
        <td class="py-5 px-6 font-semibold text-gray-800">${this.name}</td>
        
        <td class="py-5 px-6 font-bold text-gray-900 text-center">${this.quantity}</td>
        
        <td class="py-5 px-6 font-mono text-sm font-medium text-gray-600">${this.orderId}</td>
        
        <td class="py-5 px-6 font-mono text-sm font-medium text-gray-600">${this.id}</td>
    `, "hover:bg-gray-50 transition-colors");
    }
}
