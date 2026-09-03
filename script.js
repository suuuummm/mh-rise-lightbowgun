const roadmap = [

    {
        mr: "MR3",
        weapon: "レウスライト"
    },

    {
        mr: "MR4",
        weapon: "ナルガライト"
    },

    {
        mr: "MR5",
        weapon: "ゴアライト"
    },

    {
        mr: "MR10",
        weapon: "最終装備候補"
    },

    {
        mr: "MR100",
        weapon: "完成装備"
    }
];

const weapons = [
    {
        name: "レウスライト",
        mr: 3,
        ammo: "貫通弾",
        monster: "リオレウス",
        completed: false,

        materials: [
            {
                name: "火竜の重殻",
                required: 5
            },
            {
                name: "火竜の上鱗",
                required: 8
            }
        ]
    },

    {
        name: "ナルガライト",
        mr: 4,
        ammo: "貫通弾",
        monster: "ナルガクルガ",
        completed: false,

        materials: [
            {
                name: "迅竜の厚鱗",
                required: 6
            }
        ]
    }
];

const container =
    document.getElementById("weaponContainer");

function renderWeapons(selectedMR) {

    container.innerHTML = "";

    weapons
        .filter(weapon => weapon.mr <= selectedMR)
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

renderWeapons(3);

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
