import { ColumnElements } from "../Parents/ColumnElements.js";

export class RenderCategories extends ColumnElements {
    constructor(container, cat) {
        super(container, cat.name, cat.category_id, 'categories');
        this.index = cat.display_index;
    }

    render() {
        this.renderAll(`
        <td class="py-4 px-6 font-bold text-sm text-gray-400">${this.index}</td>

        <td class="py-4 px-6 font-bold text-sm text-gray-800 uppercase tracking-tight">${this.name}</td>

        <td class="py-4 px-6 text-gray-400 text-sm font-bold">${this.id}</td>

        <td class="py-4 px-6 whitespace-nowrap text-sm font-bold tracking-wider">
            <div class="flex items-center gap-4">
                <button data-target="addCat-screen" onclick="openEditCategory('edit', '${this.id}')" 
                        class="nav-btn editButton text-[#7cb316] hover:underline uppercase" 
                        value="${this.id}">
                    Edit
                </button>
                <button onclick="openDelete(['categories', '${this.id}'])" 
                        class="deleteButton text-red-500 hover:underline uppercase" 
                        value="${this.id}">
                    Delete
                </button>
            </div>
        </td>
    `, "text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100");
    }
}
