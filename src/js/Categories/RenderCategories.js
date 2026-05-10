import { ColumnElements } from "../Parents/ColumnElements.js";

export class RenderCategories extends ColumnElements{
    constructor(container, cat){
        super(container, cat.name, cat.category_id, 'categories');
        this.index = cat.display_index;
    }

    render(){      
        this.renderAll(`
            <td class="py-8 px-6 font-bold text-gray-400">${this.index}</td>
            <td class="py-8 px-6 font-black text-xl uppercase tracking-tight">${this.name}</td>
            <td class="py-8 px-6 font-mono text-[#76a609] font-bold">${this.id}</td>
            <td class="py-8 px-6">
                <div class="flex justify-center gap-3">
                    <button onclick="openEditCategory('edit', '${this.id}')" class="editButton px-6 py-3 bg-[#f4f9e6] text-[#76a609] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#76a609] hover:text-white transition-all" value="${this.id}">Edit</button>
                    <button onclick="openDelete('categories', '${this.id}')" class="deleteButton px-6 py-3 bg-red-50 text-red-500 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all" value="${this.id}">Delete</button>
                </div>
            </td>
        `, "text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100");  
    }
}
