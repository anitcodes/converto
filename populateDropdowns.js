const unitOptions = {
    unit: ["meter", "kilometer", "mile", "yard", "foot"],
    energy: ["joule", "calorie", "kwh"],
    speed: ["m/s", "km/h", "mph"],
    time: ["second", "minute", "hour", "day"],
    data: ["byte", "kilobyte", "megabyte", "gigabyte", "terabyte"]
};

// Populate dropdowns dynamically
function populateDropdowns(type, elementId1, elementId2) {
    const select1 = document.getElementById(elementId1);
    const select2 = document.getElementById(elementId2);
    select1.innerHTML = "";
    select2.innerHTML = "";

    unitOptions[type].forEach(unit => {
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");
        option1.value = option2.value = unit;
        option1.textContent = option2.textContent = unit;
        select1.appendChild(option1);
        select2.appendChild(option2);
    });

    select1.selectedIndex = 0;
    select2.selectedIndex = 1;
}

// Populate all dropdowns on page load
document.addEventListener("DOMContentLoaded", () => {
    populateDropdowns("unit", "unitFrom", "unitTo");
    populateDropdowns("energy", "energyFrom", "energyTo");
    populateDropdowns("speed", "speedFrom", "speedTo");
    populateDropdowns("time", "timeFrom", "timeTo");
    populateDropdowns("data", "dataFrom", "dataTo");

    // Fetch and populate currency dropdown
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            const currencyFrom = document.getElementById("currencyFrom");
            const currencyTo = document.getElementById("currencyTo");
            currencyFrom.innerHTML = "";
            currencyTo.innerHTML = "";

            currencies.forEach(currency => {
                const option1 = document.createElement("option");
                const option2 = document.createElement("option");
                option1.value = option2.value = currency;
                option1.textContent = option2.textContent = currency;
                currencyFrom.appendChild(option1);
                currencyTo.appendChild(option2);
            });

            currencyFrom.selectedIndex = 0;
            currencyTo.selectedIndex = 1;
        })
        .catch(error => console.error("Error fetching currency list:", error));
});
