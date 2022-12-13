export function makeList(listData) {
    let listContainer = document.createElement('div'),

    // Make the list
    listElement = document.createElement('ul'),

    // Set up a loop that goes through the items in listItems one at a time
    numberOfListItems = listData.length,
    listItem,
    i;

    // Add it to the page
    document.getElementsByTagName('body')[0].appendChild(listContainer);
    listContainer.appendChild(listElement);

    for (i = 0; i < numberOfListItems; ++i) {
        // Create an item for each one
        listItem = document.createElement('li');

        // Add the item text
        listItem.innerHTML = listData[i];

        // Add listItem to the listElement
        listElement.appendChild(listItem);
    }
}

export function CheckList(listData) {
    let listContainer = document.createElement('form'),
    options = document.createElement('label'),
    dd = document.createElement('select'),
    delete_ = document.createElement('option'),
    update = document.createElement('option'),
    expand = document.createElement('option'),
    numberOfListItems = listData.length,
    i;

    listContainer.className = "form2";

    // Add it to the page
    document.getElementsByTagName('body')[0].appendChild(listContainer);
    options.htmlFor = "action";
    listContainer.appendChild(options);
    options.appendChild(document.createTextNode("Expand, Update, or Delete:"));
    listContainer.appendChild(dd);
    delete_.value = "Delete";
    delete_.innerHTML = "Delete";
    dd.appendChild(delete_);
    update.value = "Update";
    update.innerHTML = "Update";
    dd.appendChild(update);
    expand.value = "Expand";
    expand.innerHTML = "Expand";
    dd.appendChild(expand);

    for (i = 0; i < numberOfListItems; ++i) {
        var checkBox = document.createElement("input");
        var label = document.createElement("label");
        checkBox.name="mycheckboxes";
        checkBox.type = "checkbox";
        checkBox.value = listData[i];
        listContainer.appendChild(checkBox);
        listContainer.appendChild(label);
        label.appendChild(document.createTextNode(listData[i]));
    }
    checkBox.type="submit";
    checkBox.value ="submit";
    listContainer.appendChild(checkBox);
}