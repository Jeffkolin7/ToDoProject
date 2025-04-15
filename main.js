const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

function addTask() {
    if (inputBox.value === '') {
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
        listContainer.innerHTML = '';
        saveData();
        console.log("✅ All tasks deleted by admin.");
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
    changeBack: function() {
        document.body.style.backgroundImage = "url('latest.jpeg ')";
        document.body.style.backgroundSize = "cover"; // Optional but nice
        document.body.style.backgroundRepeat = "no-repeat";
        console.log("🎨 Background image changed by admin.");
    }    
};

showData();