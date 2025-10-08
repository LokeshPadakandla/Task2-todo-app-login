// === LOGIN & SIGNUP FUNCTIONALITY ===
const loginPage = document.getElementById("loginPage");
const signupPage = document.getElementById("signupPage");
const todoPage = document.getElementById("todoPage");

document.getElementById("showSignup").onclick = () => {
  loginPage.style.display = "none";
  signupPage.style.display = "block";
};

document.getElementById("showLogin").onclick = () => {
  signupPage.style.display = "none";
  loginPage.style.display = "block";
};

// === SIGNUP BUTTON CLICK ===
document.getElementById("signupBtn").onclick = () => {
  const newUsername = document.getElementById("newUsername").value.trim();
  const newPassword = document.getElementById("newPassword").value.trim();
  const signupMsg = document.getElementById("signupMsg");

  if (newUsername === "" || newPassword === "") {
    signupMsg.textContent = "⚠️ Please fill all fields!";
    signupMsg.style.color = "red";
    return;
  }

  // Email format validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(newUsername)) {
    signupMsg.textContent = "⚠️ Please enter a valid email!";
    signupMsg.style.color = "red";
    return;
  }

  localStorage.setItem("username", newUsername);
  localStorage.setItem("password", newPassword);

  signupMsg.textContent = "✅ Signup successful! Please login.";
  signupMsg.style.color = "green";

  setTimeout(() => {
    signupPage.style.display = "none";
    loginPage.style.display = "block";
  }, 1200);
};

// === LOGIN BUTTON CLICK ===
document.getElementById("loginBtn").onclick = () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const loginMsg = document.getElementById("loginMsg");
  const savedUser = localStorage.getItem("username");
  const savedPass = localStorage.getItem("password");

  if (username === "" || password === "") {
    loginMsg.textContent = "⚠️ Please enter email and password!";
    loginMsg.style.color = "red";
    return;
  }

  // Email format validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(username)) {
    loginMsg.textContent = "⚠️ Please enter a valid email!";
    loginMsg.style.color = "red";
    return;
  }

  if (username === savedUser && password === savedPass) {
    loginPage.style.display = "none";
    todoPage.style.display = "block";
    loadTasks();
    loginMsg.textContent = "";
  } else {
    loginMsg.textContent = "❌ Invalid email or password!";
    loginMsg.style.color = "red";
  }
};

// === LOGOUT FUNCTION ===
document.getElementById("logoutBtn").onclick = () => {
  todoPage.style.display = "none";
  loginPage.style.display = "block";
};

// === TO-DO LIST FUNCTIONALITY ===
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.innerHTML = "";
  savedTasks.forEach(task => addTaskToUI(task.text, task.completed));
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector(".task-text").textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTaskToUI(taskText, completed = false) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = taskText;
  span.className = "task-text";
  if (completed) li.classList.add("completed");

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✅";
  completeBtn.className = "complete-btn";
  completeBtn.onclick = () => {
    li.classList.toggle("completed");
    saveTasks();
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  li.appendChild(span);
  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Add new task
addBtn.onclick = () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return alert("⚠️ Please enter a task!");
  addTaskToUI(taskText);
  taskInput.value = "";
  saveTasks();
};

// Search tasks
searchInput.onkeyup = () => {
  const filter = searchInput.value.toLowerCase();
  document.querySelectorAll("#taskList li").forEach(li => {
    const text = li.querySelector(".task-text").textContent.toLowerCase();
    li.style.display = text.includes(filter) ? "flex" : "none";
  });
};

// === AUTO FILL EMAIL ON PAGE LOAD ===
window.onload = () => {
  const savedUser = localStorage.getItem("username");
  if (savedUser) {
    document.getElementById("username").value = savedUser;
  }
};





