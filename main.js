const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

inputBox.addEventListener('keypress', function(event){
    if (inputBox.value.length >= 30){
        alert("Max Char Reached");
        return;
    } 
    if (event.key === "Enter"){
        addTask();
    }
})

function addTask() {
    if (inputBox.value === '') {
        alert("Please Put Your Text");
    } else if (inputBox.value === ' '){
        alert("Please Put Your Text");
    }
    else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement('span'); 
        span.innerHTML = '\u00d7';
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
}

listContainer.addEventListener('click', function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.classList.add("checkedbye");
        setTimeout(() => {
            e.target.parentElement.remove("span");
            saveData();
        }, 500);
        saveData();
    }
})

function saveData() {
    localStorage.setItem('data', listContainer.innerHTML);
}

function showData() {
    listContainer.innerHTML = localStorage.getItem("data");
}
// ADMIN COMMANDS
window.admin = {
    delete: function () {
        let items = document.querySelectorAll('#list-container li');
        if (items.length === 0) {
            console.log("⚠️ No tasks to delete.");
            return;
        }
        items.forEach((item, index) => {
            item.classList.add('checkedbye');
            setTimeout(() => {
                item.remove();
                saveData();
                if (index === index.length - 1){
                    saveData();
                    console.log("✅ All tasks deleted by admin.");
                }
            }, 500)
        })
    },
    add: function (task) {
        if (!task) return console.warn("⚠️ You must provide a task!");
        let li = document.createElement('li');
        li.innerHTML = task;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span);
        saveData();
        console.log(`📝 Task "${task}" added by admin.`);
    },
    list: function () {
        let tasks = [...listContainer.children].map(li => li.textContent.replace('×', '').trim());
        console.log("📋 Current Tasks:", tasks);
        return tasks;
    },
    checkAll: function () {
        const items = document.querySelectorAll('#list-container li');
        items.forEach(item => {
            item.classList.add('checked');
        });
        saveData();
        console.log("✅ All tasks marked as completed.");
    },
    changeBack: function () {
        document.body.style.backgroundImage = "url('latest.jpeg ')";
        document.body.style.backgroundSize = "cover"; // Optional but nice
        document.body.style.backgroundRepeat = "no-repeat";
        console.log("🎨 Background image changed by admin.");
    },
    Remove: function(a){
        if (!a){
            console.log("⚠️ You must provide a task to remove!");
            return;
        }

        const items = document.querySelectorAll("#list-container li");
        let found = false;

        items.forEach((item) => {
            const itemText = item.textContent.replace('\u00d7', '').trim();
            if (itemText.toLowerCase() === a.toLowerCase()){
                item.classList.add('checkedbye');
                setTimeout(() => {
                    item.remove();
                    saveData();
                    console.log(`🗑️ Task "${a}" removed by admin.`);
                }, 500);
                found = true;
            }
        })
    } 
};

showData();