function populateUFs() {
    const ufSelect = document.querySelector('select[name=uf]');

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res =>  res.json())
        .then(states => {

            for(const state of states) {               
                ufSelect.innerHTML += `<option value="${state.id}">${state.sigla}</option>`;
            }

        })
}

populateUFs();


function getCities(event) {
    const citySelect = document.querySelector('select[name=city]');
    const stateInput = document.querySelector("input[name=state]");
    
    
    
    const ufValue = event.target.value;
    
    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;
    
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = `<option value="">Selecione a cidade</option>`;
    citySelect.disabled = true;

    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for(const city of cities){
                citySelect.innerHTML += `<option value ="${city.nome}">${city.nome}</option>`;
            }
        });

        citySelect.disabled = false;
        
}

document
    .querySelector('select[name=uf]')
    .addEventListener("change", getCities)




    //itens de coleta
    // pegar todas as li`s
    const itemsToCollect = document.querySelectorAll(".items-grid li");

    for(const item of itemsToCollect){
        item.addEventListener("click", handleSelectedItem)
    }

    const itemsInput = document.querySelector("[name=items]");

    let selectedItems = [];

    function handleSelectedItem(event) {
        const itemLi = event.target;
        
        //add or remove a class with js
        itemLi.classList.toggle("selected");

        const itemId = itemLi.dataset.id;




        // check if exist items selected
        // get the itms selected

        const alreadySelected = selectedItems.findIndex(item => item === itemId) //return true  or false

        // if has selected, remove the selection

        if( alreadySelected >= 0) {
            // remove from selection
            const filteredItems = selectedItems.filter(item => item !== itemId) //remove if diferente of false
            selectedItems = filteredItems;
        }
        // else has selected, add the selection
        
        else {
            selectedItems.push(itemId);
        }

        // update the hidden field with the selected items
        
        
        itemsInput.value = selectedItems;
    }