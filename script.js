function showCat(type) {

    const detailBox = document.getElementById("catDetail");

    if (type === "munchkin") {

        document.getElementById("modalBody")
            .innerHTML = `

        <img src="images/munchkin.jpg" alt="マンチカン">

            <h2>🐱 マンチカン</h2>
            <p>
                原産国：アメリカ<br>
                性格：人懐っこい<br>
                寿命：12〜15年<br>
                特徴：短い脚が魅力
            </p>

            <p>
            ⭐可愛さ：★★★★★<br>
            🏠飼いやすさ：★★★★☆
            </p>
        `;

        document.getElementById("modal")
            .style.display = "flex";
    }

    if (type === "scottish") {

        document.getElementById("modalBody")
            .innerHTML = `

        <img src="images/scottish.jpg" alt="スコティッシュフォールド">

            <h2>🐱 スコティッシュフォールド</h2>
            <p>
                原産国：スコットランド<br>
                性格：穏やか<br>
                寿命：11〜14年<br>
                特徴：折れ耳がチャームポイント
            </p>

            <p>
            ⭐可愛さ：★★★★★<br>
            🏠飼いやすさ：★★★★★
            </p>
        `;

        document.getElementById("modal")
            .style.display = "flex";
    }

    if (type === "ragdoll") {

        document.getElementById("modalBody")
            .innerHTML = `

        <img src="images/ragdoll.jpg" alt="ラグドール">

            <h2>🐱 ラグドール</h2>
            <p>
                原産国：アメリカ<br>
                性格：おっとり<br>
                寿命：12〜17年<br>
                特徴：ふわふわの長毛
            </p>

            <p>
            ⭐可愛さ：★★★★★<br>
            🏠飼いやすさ：★★★★☆
            </p>
        `;

        document.getElementById("modal")
            .style.display = "flex";
    }
}

function createSakura() {

    const sakura = document.createElement("div");

    sakura.classList.add("sakura");

    sakura.innerHTML = "🌸";

    sakura.style.left =
        Math.random() * window.innerWidth + "px";

    sakura.style.animationDuration =
        Math.random() * 5 + 5 + "s";

    document
        .getElementById("sakura-container")
        .appendChild(sakura);

    setTimeout(() => {
        sakura.remove();
    }, 10000);
}

setInterval(createSakura, 500);

function searchCats() {

    const keyword =
        document
            .getElementById("searchBox")
            .value
            .toLowerCase();

    const cards =
        document.querySelectorAll(".card");

    cards.forEach(card => {

        const catName =
            card.getAttribute("data-cat").toLowerCase();

        if (catName.includes(keyword)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });

}

function closeModal() {

    document.getElementById("modal")
        .style.display = "none";
}

function toggleFavorite(event, button) {

    event.stopPropagation();

    if (button.innerHTML === "🤍") {
        button.innerHTML = "💗";

    } else {
        button.innerHTML = "🤍";
    }
}

function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");
}

window.addEventListener("load", () => {
    setTimeout(() => {

        document
            .getElementById("loading-screen")
            .style.display = "none"
    }, 2000);
});

function drawFortune() {

    const cats = [
        "🐱　マンチカン",
        "🐱　ラグドール",
        "🐱　スコティッシュフォールド"
    ];

    const random =
        cats[Math.floor(Math.random() * cats.length)];

    document.getElementById("fortuneResult")
        .innerHTML =
        "今日のおすすめは <br><br>" + random;
}

function addItem(item) {

    document
        .getElementById("cafeArea")
        .innerHTML += item;
}
