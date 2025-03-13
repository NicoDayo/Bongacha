function Gacha(pulls = 1) {
    const rates = {
        "5★": 3,  // Bombergirls (excluding Shiro, Oren, Momoko, Emera)
        "4★": 7,  // Outfits or BGM
        "3★": 15, // Alt skills
        "2★": 30, // Accessories
        "1★": 45  // Chat voices
    };

    const fiveStarBombergirls = [
        "Kuro", "Urushi", "Papuru", "Aqua", "Shiori", "Sepia", "Tsugaru", "Grim",
        "Grey", "Asagi", "Pastel", "Pine", "Shiron", "Tekka", "Olive", "Prune",
        "Platina", "Chigusa", "Silva", "Melon", "Dark", "Chiama", "Brass", "Blueberry", 
        "Suisui", "Hiiro"
    ];

    let results = [];

    for (let i = 0; i < pulls; i++) {
        let roll = Math.random() * 100;
        let cumulative = 0;
        let rarity = "1★";

        for (let [star, chance] of Object.entries(rates)) {
            cumulative += chance;
            if (roll < cumulative) {
                rarity = star;
                break;
            }
        }

        if (rarity === "5★") {
            let selected = fiveStarBombergirls[Math.floor(Math.random() * fiveStarBombergirls.length)];
            results.push({ rarity, name: selected, img: `img/${selected.toLowerCase()}.png` });
        } else {
            results.push({ rarity, name: "" });
        }
    }

    // Guarantee at least one 3★ or higher in a 10-pull
    if (pulls === 10 && !results.some(r => r.rarity === "3★" || r.rarity === "4★" || r.rarity === "5★")) {
        results[9] = { rarity: "3★", name: "" };
    }

    displayResults(results);
}

function displayResults(results) {
    let resultContainer = document.getElementById("results");
    resultContainer.innerHTML = "";

    results.forEach((result, index) => {
        let div = document.createElement("div");
        div.classList.add("result-item", `rarity-${result.rarity.charAt(0)}`);
        div.style.animationDelay = `${index * 0.1}s`;

        let text = document.createElement("p");
        text.innerText = result.rarity.replace("1★", "★")
                                      .replace("2★", "★★")
                                      .replace("3★", "★★★")
                                      .replace("4★", "★★★★")
                                      .replace("5★", "★★★★★");

        if (result.name) {
            let img = document.createElement("img");
            img.src = result.img;
            img.alt = result.name;
            div.appendChild(img);
            text.innerText += ` - ${result.name}`;
        }

        div.appendChild(text);
        resultContainer.appendChild(div);
    });
}
