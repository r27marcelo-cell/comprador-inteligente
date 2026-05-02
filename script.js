const state = {
    token: localStorage.getItem("token") || null
};

const els = {};

function cache() {
    [
        "auth-screen",
        "search-screen",
        "login-form",
        "signup-form",
        "login-email",
        "login-password",
        "signup-name",
        "signup-email",
        "signup-password",
        "signup-confirm",
        "search-input",
        "products-list",
        "results",
        "login-btn",
        "signup-btn",
        "search-btn",
        "logout-btn"
    ].forEach(id => {
        els[id] = document.getElementById(id);
    });
}

const mock = [
    { name: "Smartphone", price: 400 },
    { name: "Fone Bluetooth", price: 30 },
    { name: "Notebook Gamer", price: 900 },
    { name: "Armário de Roupa", price: 120 },
    { name: "Guarda-Fato", price: 250 }
];

document.addEventListener("DOMContentLoaded", () => {
    cache();
    events();
    authCheck();
});

function authCheck() {
    if (state.token) {
        els["auth-screen"].classList.add("hidden");
        els["search-screen"].classList.remove("hidden");
    } else {
        els["auth-screen"].classList.remove("hidden");
        els["search-screen"].classList.add("hidden");
    }
}

function events() {

    document.getElementById("login-form").addEventListener("submit", e => {
        e.preventDefault();
        state.token = "demo";
        localStorage.setItem("token", state.token);
        authCheck();
    });

    document.getElementById("signup-form").addEventListener("submit", e => {
        e.preventDefault();
        state.token = "demo";
        localStorage.setItem("token", state.token);
        authCheck();
    });

    document.getElementById("logout-btn").addEventListener("click", () => {
        state.token = null;
        localStorage.removeItem("token");
        authCheck();
    });

    document.getElementById("search-btn").addEventListener("click", search);

    document.querySelectorAll(".switch-link").forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.dataset.target;

            document.querySelectorAll(".auth-form")
                .forEach(f => f.classList.remove("active"));

            document.getElementById(`${target}-form`)
                .classList.add("active");
        });
    });
}

function search() {
    const q = els["search-input"].value.toLowerCase();

    const res = mock.filter(p =>
        p.name.toLowerCase().includes(q)
    );

    render(res);
}

function render(list) {
    els["products-list"].innerHTML = "";

    list.forEach(p => {
        const div = document.createElement("div");
        div.textContent = `${p.name} - $${p.price}`;
        els["products-list"].appendChild(div);
    });

    els["results"].classList.remove("hidden");
     }
