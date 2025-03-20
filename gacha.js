let ticketAmount = 0;

function Gacha(pulls = 1) {
    const gachaVideoContainer = document.getElementById("gachaVideoContainer");
    const gachaVideo = document.getElementById("gachaVideo");
    const gachaAudio = document.getElementById("gachaAudio");

    document.getElementById("results").style.display = "none";

    gachaVideoContainer.style.display = "flex";
    gachaVideo.currentTime = 0;
    gachaAudio.currentTime = 0;
    gachaVideo.play();
    gachaAudio.play();

    gachaVideo.onended = function() {
        gachaVideoContainer.style.display = "none";
        showGachaResults(pulls);
    };
}

function showGachaResults(pulls) {
    const rates = {
        "5★": 3,
        "4★": 7,
        "3★": 15,
        "2★": 30,
        "1★": 45
    };

    const bongas = [
        "Kuro", "Urushi", "Aqua", "Shiori", "Sepia", "Tsugaru", "Grim",
        "Grey", "Asagi", "Pastel", "Pine", "Shiron", "Tekka", "Olive", "Prune",
        "Platina", "Chigusa", "Silva", "Melon", "Dark", "Chiamo", "Brass", "Blueberry", 
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
            let selected = bongas[Math.floor(Math.random() * bongas.length)];
            results.push({ rarity, name: selected, img: `img/${selected.toLowerCase()}.png` });
        } else {
            results.push({ rarity, name: "" });
        }
    }

    if (pulls === 10 && !results.some(r => r.rarity === "3★" || r.rarity === "4★" || r.rarity === "5★")) {
        results[9] = { rarity: "3★", name: "" };
    }
    updateTickets(pulls);
    displayResults(results);
}

function updateTickets(pulls) {
    ticketAmount += (pulls === 10) ? 100 : 10;
    document.getElementById("ticketAmount").innerText = `Tickets Used: ${ticketAmount}`;
}

function displayResults(results) {
    let resultContainer = document.getElementById("results");
    resultContainer.innerHTML = "";
    resultContainer.style.display = "grid";
    
    resultContainer.className = results.length === 1 ? "results single" : "results ten";

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
            text.innerText += `  ${result.name}`;
        }

        div.appendChild(text);
        resultContainer.appendChild(div);
    });

    resultContainer.style.display = "grid";
}

document.addEventListener("DOMContentLoaded", function () {
    const pine = document.querySelector(".pine");

    if (pine) {
        pine.addEventListener("click", function () {
            pine.classList.remove("clicked");
            void pine.offsetWidth;
            pine.classList.add("clicked");
        });
    }
});

function toggleRates() {
    const menu = document.getElementById("pullRatesMenu");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}