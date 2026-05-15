import { ColumnElements } from "../Parents/ColumnElements.js";

export class RenderHistory extends ColumnElements{
    constructor(container, his){
        super(container, null, his.order_id);
        this.date = his.order_date;
        this.totalPrice = his.total_price;
        this.paymentMethod = his.payment_method;
        this.paid = (his.paid === 1) ? "PAID" : "UNPAID";
        this.dailySaleId = his.daily_sale_id;
        this.served = (his.served === 1) ? "SERVED" : "UNSERVED";
    }

    render(){
        this.renderAll(`
            <td class="py-6 font-mono text-xs">${this.dailySaleId}</td>
            <td class="py-6 font-bold">${this.id}</td>
            <td class="py-6 text-gray-400">${this.date}</td>
            <td class="py-6 font-black text-[#76a609]">${this.totalPrice.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })}</td>
            <td class="py-6 font-bold uppercase text-[10px]">${this.paymentMethod}</td>
            <td class="py-6"><button onclick="openPaid(['${this.id}', this])" class="text-blue-500 font-black text-[10px] uppercase">${this.paid}</button></td>
            <td class="py-6 font-bold uppercase text-[10px]">${this.served}</td>
        `, "hover:bg-gray-50 transition-colors");
    }
}
