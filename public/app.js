const $ = document.querySelector.bind(document);
const app = $('#app');

const nameForm = $('form');
const usersList = $('#users-list');
const refreshBtn = $('#refresh');

refreshBtn.addEventListener('click', () => {
    usersList.innerHTML = '';
    getUsers();
})

const getUsers = async function () {
    const res = await fetch('/users/');
    const users  = await res.json();
    if(users.length > 0 || users !== undefined) {
        users.map(user => {
            const li = document.createElement('li');
            li.innerText = `${user.id} - ${user.name}`;
            usersList.appendChild(li);
        })
    }
}

getUsers();

nameForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = $('#name').value;
    await fetch('/users/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    });
    const confirmationComponent = `
        <h1>Thanks for submitting your name, ${name}</h1>
        <button id="reset">Reset</button>
    `;
    const addUserTab = document.querySelector('.tab-content[data-tab="2"]');
    addUserTab.innerHTML = confirmationComponent;
    const resetBtn = $('#reset');
    resetBtn.addEventListener('click', () => {
        addUserTab.innerHTML = '';
        addUserTab.appendChild(nameForm);
    });
});

const tabs = document.querySelectorAll('.nav-link');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');
        const tabContent = document.querySelector(`.tab-content[data-tab="${tabId}"]`);
        tabs.forEach(tab => tab.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.tab-content').forEach(tabContent => tabContent.classList.add('hidden'));
        tabContent.classList.remove('hidden');
    });
});