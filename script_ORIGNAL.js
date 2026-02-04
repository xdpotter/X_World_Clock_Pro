// 🌍 1. Country list with time zones
const countryList = {
    "Afghanistan": "Asia/Kabul", "Albania": "Europe/Tirane", "Algeria": "Africa/Algiers",
    "Andorra": "Europe/Andorra", "Angola": "Africa/Luanda", "Argentina": "America/Argentina/Buenos_Aires",
    "Armenia": "Asia/Yerevan", "Australia": "Australia/Sydney", "Austria": "Europe/Vienna",
    "Azerbaijan": "Asia/Baku", "Bahamas": "America/Nassau", "Bahrain": "Asia/Bahrain",
    "Bangladesh": "Asia/Dhaka", "Belarus": "Europe/Minsk", "Belgium": "Europe/Brussels",
    "Belize": "America/Belize", "Benin": "Africa/Porto-Novo", "Bhutan": "Asia/Thimphu",
    "Bolivia": "America/La_Paz", "Bosnia": "Europe/Sarajevo", "Botswana": "Africa/Gaborone",
    "Brazil": "America/Sao_Paulo", "Brunei": "Asia/Brunei", "Bulgaria": "Europe/Sofia",
    "Cambodia": "Asia/Phnom_Penh", "Cameroon": "Africa/Douala", "Canada": "America/Toronto",
    "Chile": "America/Santiago", "China": "Asia/Shanghai", "Colombia": "America/Bogota",
    "Costa Rica": "America/Costa_Rica", "Croatia": "Europe/Zagreb", "Cuba": "America/Havana",
    "Cyprus": "Asia/Nicosia", "Czech Republic": "Europe/Prague", "Denmark": "Europe/Copenhagen",
    "Egypt": "Africa/Cairo", "Estonia": "Europe/Tallinn", "Ethiopia": "Africa/Addis_Ababa",
    "Finland": "Europe/Helsinki", "France": "Europe/Paris", "Germany": "Europe/Berlin",
    "Ghana": "Africa/Accra", "Greece": "Europe/Athens", "Hong Kong": "Asia/Hong_Kong",
    "Hungary": "Europe/Budapest", "Iceland": "Atlantic/Reykjavik", "India": "Asia/Kolkata",
    "Indonesia": "Asia/Jakarta", "Iran": "Asia/Tehran", "Iraq": "Asia/Baghdad",
    "Ireland": "Europe/Dublin", "Israel": "Asia/Jerusalem", "Italy": "Europe/Rome",
    "Japan": "Asia/Tokyo", "Jordan": "Asia/Amman", "Kazakhstan": "Asia/Almaty",
    "Kenya": "Africa/Nairobi", "Kuwait": "Asia/Kuwait", "Kyrgyzstan": "Asia/Bishkek",
    "Laos": "Asia/Vientiane", "Latvia": "Europe/Riga", "Lebanon": "Asia/Beirut",
    "Libya": "Africa/Tripoli", "Lithuania": "Europe/Vilnius", "Luxembourg": "Europe/Luxembourg",
    "Malaysia": "Asia/Kuala_Lumpur", "Maldives": "Indian/Maldives", "Mexico": "America/Mexico_City",
    "Mongolia": "Asia/Ulaanbaatar", "Morocco": "Africa/Casablanca", "Myanmar": "Asia/Yangon",
    "Nepal": "Asia/Kathmandu", "Netherlands": "Europe/Amsterdam", "New Zealand": "Pacific/Auckland",
    "Nigeria": "Africa/Lagos", "North Korea": "Asia/Pyongyang", "Norway": "Europe/Oslo",
    "Oman": "Asia/Muscat", "Pakistan": "Asia/Karachi", "Philippines": "Asia/Manila",
    "Poland": "Europe/Warsaw", "Portugal": "Europe/Lisbon", "Qatar": "Asia/Qatar",
    "Romania": "Europe/Bucharest", "Russia": "Europe/Moscow", "Saudi Arabia": "Asia/Riyadh",
    "Singapore": "Asia/Singapore", "South Africa": "Africa/Johannesburg", "South Korea": "Asia/Seoul",
    "Spain": "Europe/Madrid", "Sri Lanka": "Asia/Colombo", "Sweden": "Europe/Stockholm",
    "Switzerland": "Europe/Zurich", "Thailand": "Asia/Bangkok", "Turkey": "Europe/Istanbul",
    "Ukraine": "Europe/Kiev", "UAE": "Asia/Dubai", "UK": "Europe/London", "USA": "America/New_York",
    "Vietnam": "Asia/Ho_Chi_Minh"
};

document.addEventListener("DOMContentLoaded", function () {
    const select = document.getElementById("countrySelect");
    const title = document.getElementById("currentCountry");
    const countryTime = document.getElementById("countryTime");
    const A = document.getElementById("countryA");
    const B = document.getElementById("countryB");
    const compareResult = document.getElementById("compareResult");

    // 🌍 2. Load options into dropdowns
    if (select) {
        for (let country in countryList) {
            let option = document.createElement("option");
            option.value = countryList[country];
            option.textContent = country;
            select.appendChild(option);
        }
    }

    if (A && B) {
        for (let c in countryList) {
            A.appendChild(new Option(c, countryList[c]));
            B.appendChild(new Option(c, countryList[c]));
        }
    }

    // 🌍 3. Main Clock Logic
    function updateCountryTime() {
        if (!select || !countryTime) return;
        const timezone = select.value;
        const now = new Date().toLocaleString("en-US", { timeZone: timezone });
        countryTime.innerText = now;

        // Update title if it's a specific country search
        if (title && timezone.includes("/")) {
            title.textContent = "Current Time in " + timezone.split("/")[1].replace("_", " ");
        }
    }

    // 🌍 4. Comparison Logic
    function updateCompare() {
        if (!A || !B || !compareResult) return;
        let tzA = A.value;
        let tzB = B.value;
        let timeA = new Date().toLocaleString("en-US", { timeZone: tzA });
        let timeB = new Date().toLocaleString("en-US", { timeZone: tzB });

        let now = new Date();
        let offsetA = new Date(now.toLocaleString("en-US", { timeZone: tzA }));
        let offsetB = new Date(now.toLocaleString("en-US", { timeZone: tzB }));
        let diffHrs = ((offsetA - offsetB) / 3600000).toFixed(1);

        compareResult.innerHTML = `
            <b>${A.selectedOptions[0].text}</b>: ${timeA}<br><br>
            <b>${B.selectedOptions[0].text}</b>: ${timeB}<br><br>
            <b>Time Difference: ${diffHrs} hours</b>
        `;
    }

    // 🌍 5. URL Parameter Handling (?tz=)
    const params = new URLSearchParams(window.location.search);
    const tzFromUrl = params.get("tz");
    if (tzFromUrl && select) {
        select.value = tzFromUrl;
    } else if (select) {
        select.value = "Asia/Kolkata";
    }

    // 🌍 6. Event Listeners & Intervals
    if (select) select.addEventListener("change", updateCountryTime);
    if (A) A.addEventListener("change", updateCompare);
    if (B) B.addEventListener("change", updateCompare);

    setInterval(updateCountryTime, 1000);
    setInterval(updateCompare, 1000);
    updateCountryTime();
    updateCompare();

    // ❄️ 7. Snow Effects
    initSnow();
});

// ❄️ Main Snow Generator
function initSnow() {
    const snowContainer = document.getElementById("snow");
    const footerSnow = document.querySelector(".footer-snow");

    // Header/Body Snow
    if (snowContainer) {
        setInterval(() => {
            const snowflake = document.createElement("div");
            snowflake.classList.add("snowflake");
            snowflake.innerHTML = "❄";
            snowflake.style.left = Math.random() * 100 + "%";
            snowflake.style.animationDuration = (Math.random() * 3 + 2) + "s";
            snowflake.style.fontSize = (Math.random() * 10 + 10) + "px";
            snowContainer.appendChild(snowflake);
            setTimeout(() => snowflake.remove(), 5000);
        }, 300);
    }

    // Footer Snow (Fixed amount)
    if (footerSnow) {
        for (let i = 0; i < 25; i++) {
            const snow = document.createElement("div");
            snow.className = "snowflake";
            snow.textContent = "❄";
            snow.style.left = Math.random() * 100 + "%";
            snow.style.fontSize = (10 + Math.random() * 8) + "px";
            snow.style.animationDuration = (3 + Math.random() * 4) + "s";
            footerSnow.appendChild(snow);
        }
    }
}

// Disable Right-Click
document.addEventListener('contextmenu', event => event.preventDefault());

// Disable F12, Ctrl+Shift+I, Ctrl+U
document.onkeydown = function(e) {
    if (e.keyCode == 123 || 
        (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) || 
        (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))) {
        return false;
    }
}