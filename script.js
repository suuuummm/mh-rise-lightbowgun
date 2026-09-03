let weapons = [];

const roadmap = [

    {
        mr: "MR3",
        weapon: "夜行弩【鵂ノ眼】"
    },

    {
        mr: "MR4",
        weapon: "ゴルム・アサルト改"
    },

    {
        mr: "MR5",
        weapon: "夜行弩【鵂ノ眼】改"
    },

    {
        mr: "MR100",
        weapon: "葬銀のクーゲル"
    }
];

const container =
    document.getElementById("weaponContainer");

function renderWeapons(selectedMR) {



    container.innerHTML = "";

    weapons
        .filter(weapon => Number(weapon.mr) === Number(selectedMR))
        .forEach(weapon => {

            let materialsHTML = "";

            weapon.materials.forEach(material => {

                const key =
                    weapon.name + material.name;

                const count =
                    Number(localStorage.getItem(key))
                    || 0;

                const percent =
                    (count / material.required) * 100;

                materialsHTML += `

                <div class="progress-bar">

                <div class="progress-fill"

                style="width:${percent}%">
                </div>

                </div>

                <p>${percent.toFixed(0)}%</p>
            <div class="material">

            ${material.name}
            ${count}/${material.required}

            <br>

            入手先:
            ${material.source}

            <br>

            ランク:
            ${material.rank}

            <br>

            報酬:
            ${material.break}

            <br>

            入手率:
            ${material.rate}

            <button
            onclick="increase('${key}')">
            +
            </button>

            <button
            onclick="decrease('${key}')">
            -
            </button>

            </div>
            `;
            });

            container.innerHTML += `
        <div class="weapon-card">

        <h3>${weapon.name}</h3>

        <p>必要MR:${weapon.mr}</p>

        <p>弾種:${weapon.ammo}</p>

        <p>
            今倒すべきモンスター:
            <strong>${weapon.monster}
                </strong>
                </p>

                <label>
                <input
                type="checkbox"
                class="completed">

                作成済み

                </label>

                <h4>必要素材</h4>

                ${materialsHTML}

                </div>
                `;
        });
}

function increase(key) {

    let count =
        Number(localStorage.getItem(key)) || 0;

    count++;

    localStorage.setItem(key, count);

    refresh();
}

function decrease(key) {

    let count =
        Number(localStorage.getItem(key)) || 0;

    if (count > 0) {
        count--;
    }

    localStorage.setItem(key, count);

    refresh();
}

function refresh() {

    const mr = Number(
        document.getElementById("mrSelect").value
    );
    renderWeapons(mr);
}

document
    .getElementById("mrSelect")
    .addEventListener("change", refresh);

console.log("script.js 読み込み成功");

const roadmapContainer =
    document.getElementById("roadmap");

roadmap.forEach(step => {

    roadmapContainer.innerHTML += `

    <div class="roadmap-step">

    <h3>${step.mr}</h3>

    <p>↓</p>

    <p>${step.weapon}</p>

    </div>
    `;
});

fetch("data/weapons.json")
    .then(response => response.json())
    .then(data => {

        weapons = data;

        renderWeapons(3);
    });

function searchMonster() {

    const keyword =
        document.getElementById("monsterSearch").value.trim();

    const foundWeapons =
        weapons.filter(weapon =>
            weapon.monster.toLowerCase().includes(keyword.toLowerCase())
        );

    console.log(keyword);
    console.log(foundWeapons);

    container.innerHTML = "";

    if (foundWeapons.length === 0) {

        container.innerHTML =
            "<p>モンスターが見つかりません</p>";

        return;
    }

    foundWeapons.forEach(weapon => {

        let materialsHTML = "";

        weapon.materials.forEach(material => {

            const key =
                weapon.name + material.name;

            const count =
                Number(localStorage.getItem(key))
                || 0;

            const percent =
                material.required
                    ? (count / material.required) * 100
                    : 0;


            const remaining = material.required - count;

            const dropRate = Number((material.rate || "100%").replace("%", ""));

            materialsHTML += `
                <div class="progress-bar">

                    <div class="progress-fill"
                         style="width:${percent}%">
                    </div>

                </div>

                <p>${percent.toFixed(0)}%</p>

                <div class="material">

                    ${material.name}
                    ${count}/${material.required}

                    <br>

                    入手先：
                    ${material.source}

                    <button
                        onclick="increase('${key}')">
                        +
                    </button>

                    <button
                        onclick="decrease('${key}')">
                        -
                    </button>

                </div>
            `;
        });

        container.innerHTML += `
            <div class="weapon-card">

                <h3>${weapon.name}</h3>

                <p>必要MR:${weapon.mr}</p>

                <p>弾種:${weapon.ammo}</p>

                <p>
                    今倒すべきモンスター：
                    <strong>${weapon.monster}</strong>
                </p>

                <h4>必要素材</h4>

                ${materialsHTML}

            </div>
        `;
    });
}


document
    .getElementById("monsterSearch")
    .addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            searchMonster();
        }
    });

document
    .getElementById("monsterSearch")
    .addEventListener("input", function () {

        if (this.value === "") {

            refresh();
        }
    });
