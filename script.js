document.addEventListener("DOMContentLoaded", function () {
    const itemInput = document.getElementById("itemInput");
    const addItemButton = document.getElementById("addItem");
    const shoppingList = document.getElementById("shoppingList");
    const markAllButton = document.getElementById("markAll");
    const unmarkAllButton = document.getElementById("unmarkAll");
    const clearListButton = document.getElementById("clearList");

    // Function to update the date and time
    function updateDateTime() {
        const datetimeElement = document.getElementById("datetime");
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const formattedDateTime = now.toLocaleDateString('en-US', options);
        datetimeElement.textContent = formattedDateTime;
    }
    updateDateTime();

    setInterval(updateDateTime, 1000);

    // Function to add a new item to the list
    function addItem() {
        const itemText = itemInput.value.trim();
        if (itemText !== "") {
            if (isItemInList(itemText)) {
                alert("Item already in the list!");
            } else {
                const listItem = createListItem(itemText);
                shoppingList.appendChild(listItem);
                itemInput.value = "";
            }
        } else {
            alert("Please enter a valid item!");
        }
    }

    // Function to create a new list item
    function createListItem(itemText) {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                listItem.style.textDecoration = "line-through";
                listItem.style.backgroundColor = "#d3e0dc";
            } else {
                listItem.style.textDecoration = "none";
                listItem.style.backgroundColor = "transparent";
            }
        });

        const removeButton = document.createElement("button");
        removeButton.className = "btn btn-danger remove-button";
        removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        removeButton.addEventListener("click", function () {
            shoppingList.removeChild(listItem);
        });

        listItem.appendChild(checkbox);
        const itemSpan = document.createElement("span");
        itemSpan.textContent = itemText;
        itemSpan.style.fontWeight = "bold";
        listItem.appendChild(itemSpan);
        listItem.appendChild(removeButton);

        return listItem;
    }

    // Function to toggle all items as completed or not completed
    function toggleAllItems(completed) {
        const checkboxes = shoppingList.querySelectorAll("input[type='checkbox']");
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = completed;
            const listItem = checkbox.parentElement;
            if (completed) {
                listItem.style.textDecoration = "line-through";
                listItem.style.backgroundColor = "#d3e0dc";
            } else {
                listItem.style.textDecoration = "none";
                listItem.style.backgroundColor = "transparent";
            }
        });
    }

    // Function to check if an item is already in the list
    function isItemInList(itemText) {
        const items = shoppingList.getElementsByClassName("list-group-item");
        for (const item of items) {
            const itemSpan = item.getElementsByTagName("span")[0];
            if (itemSpan.textContent === itemText) {
                return true;
            }
        }
        return false;
    }

    // Event listeners for the add item and buttons
    itemInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addItem();
        }
    });

    addItemButton.addEventListener("click", function () {
        addItem();
    });

    markAllButton.addEventListener("click", function () {
        toggleAllItems(true);
    });

    unmarkAllButton.addEventListener("click", function () {
        toggleAllItems(false);
    });

    clearListButton.addEventListener("click", function () {
        shoppingList.innerHTML = '';
    });
});
