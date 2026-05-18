import { ColumnElements } from "../Parents/ColumnElements.js";

export class RenderProducts extends ColumnElements {
    constructor(container, pro) {
        super(container, pro.name, pro.product_id, 'products');
        this.categoryId = pro.category_id;
        this.price = pro.price;
        this.available = Boolean(pro.available);
        this.imageUrl = pro.display_url ?? '';
        this.imgId = pro.image_id;
    }

    render() {
        this.renderAll(`
            <td class="py-5 px-6">
                <img class="productImg shrink-0 w-9 h-9 rounded-full bg-gray-50 object-cover ${this.imageUrl ? '' : 'hidden'}" src="${this.imageUrl}" id="${this.id}Img" alt="${this.imgId || 'product'}">
                ${!this.imageUrl ? '<div class="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-[10px] text-gray-400 font-mono">No Img</div>' : ''}
            </td>
            <td class="py-5 px-6 font-bold text-sm text-gray-400 uppercase">${this.categoryId}</td>
            <td class="py-5 px-6 font-mono text-sm">${this.id}</td>
            <td class="py-5 px-6 text-sm font-black uppercase">${this.name}</td>
            <td class="py-5 px-6 font-black text-[#76a609]">${this.price.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })}</td>
            <td class="py-5 px-6"><span class="px-3 py-1 bg-[#f4f9e6] text-[#76a609] rounded-full text-[10px] font-black uppercase">${String(this.available).toUpperCase()}</span></td>
            <td class="py-5 px-6 whitespace-nowrap text-xs font-bold tracking-wider">
                <div class="flex items-center gap-4">
                    <button onclick="openEditProduct('edit', '${this.id}')" 
                            class="editButton text-[#7cb316] hover:underline uppercase" 
                            value="${this.id}">
                        Edit
                    </button>
                    <button onclick="openDeleteProduct('${this.id}')" 
                            class="deleteButton text-red-500 hover:underline uppercase" 
                            value="${this.id}">
                        Delete
                    </button>
                </div>
            </td>
        `);
    }
}