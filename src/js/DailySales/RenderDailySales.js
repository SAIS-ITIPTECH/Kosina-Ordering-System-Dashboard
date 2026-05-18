import { ColumnElements } from "../Parents/ColumnElements.js";

export class RenderDailySales extends ColumnElements {
    constructor(container, sal) {
        super(container, null, sal.daily_sale_id);
        this.date = sal.date;
        this.totalSales = sal.total_sales;
        this.totalIncome = sal.total_income;
    }

    render() {
        this.renderAll(`
        <td class="py-5 px-6 font-mono text-xs text-gray-400">${this.id}</td>
        <td class="py-5 px-6 font-semibold text-gray-800">${this.date}</td>
        <td class="py-5 px-6     font-bold text-center text-gray-700">${this.totalSales}</td>
        <td class="py-5 px-6 font-black text-[#76a609]">${this.totalIncome.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })}</td>
    `, "hover:bg-gray-50/50 transition-colors duration-150");
    }
}
