// MODIFY BASE CLASS

class EditPanel{
    constructor(container, type, inputsId){
        this.modificationType = type;
        this.container = container;
        this.inputsId = inputsId
    }

    createInputFields(inputHtml, title, target = null, type){
        modifyPanel.innerHTML = this.modifyScreenTemplate(title);
        document.getElementById('inputContainers').innerHTML = inputHtml;
    }

    createButtons(target, model, inputDomElements){
        document.getElementById('confirm').onclick = () =>{
            
            modifyPanel.classList.toggle('hide');
            const modify = new model(inputDomElements);
             
            if (this.modificationType === "add") {
                modify.posttoDB();
            } else {
                modify.updateDb(target);
            }
        }

        document.getElementById('cancel').onclick = () =>{
            modifyPanel.classList.toggle('hide');
        }
    }

    displayCurrentValue(inputId, target, type){
        const row = document.getElementById(target);
        const cells = row.cells;

        let index = 0;
        Object.values(inputId).forEach(input => {
            if(type == "products" && index == 1) { return; }
            input.value = cells[index].innerHTML;
            index++;
        });
    }

    modifyScreenTemplate(title ="ADD SOMETHING"){           
        return `    
            <header>${title}</header>
            <section id="inputContainers"></section>
            <section id="confirmButtons">
                <button id="confirm">CONFIRM</button>
                <button id="cancel">CANCEL</button>
            </section>
        `
    }
}
