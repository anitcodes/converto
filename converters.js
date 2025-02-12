// Conversion factors for different units
const conversionFactors = {
    unit: {
        meter: 1,
        kilometer: 0.001,
        mile: 0.000621371,
        yard: 1.09361,
        foot: 3.28084
    },
    energy: {
        joule: 1,
        calorie: 0.239006,
        kwh: 2.7778e-7
    },
    speed: {
        "m/s": 1,
        "km/h": 3.6,
        "mph": 2.23694
    },
    time: {
        second: 1,
        minute: 1 / 60,
        hour: 1 / 3600,
        day: 1 / 86400
    },
    data: {
        byte: 1,
        kilobyte: 1 / 1024,
        megabyte: 1 / (1024 ** 2),
        gigabyte: 1 / (1024 ** 3),
        terabyte: 1 / (1024 ** 4)
    }
};

// Function to perform the conversion
function convert(value, fromUnit, toUnit, type) {
    if (!value || isNaN(value)) {
        return "Enter a valid number";
    }
    if (!conversionFactors[type][fromUnit] || !conversionFactors[type][toUnit]) {
        return "Invalid Conversion";
    }
    return (value * (conversionFactors[type][toUnit] / conversionFactors[type][fromUnit])).toFixed(4);
}

// Function to update result
function updateResult(inputId, fromId, toId, resultId, type) {
    const value = parseFloat(document.getElementById(inputId).value);
    const from = document.getElementById(fromId).value;
    const to = document.getElementById(toId).value;
    document.getElementById(resultId).innerText = convert(value, from, to, type);
}

// Event listeners for real-time conversion
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("unitInput").addEventListener("input", () => updateResult("unitInput", "unitFrom", "unitTo", "unitResult", "unit"));
    document.getElementById("energyInput").addEventListener("input", () => updateResult("energyInput", "energyFrom", "energyTo", "energyResult", "energy"));
    document.getElementById("speedInput").addEventListener("input", () => updateResult("speedInput", "speedFrom", "speedTo", "speedResult", "speed"));
    document.getElementById("timeInput").addEventListener("input", () => updateResult("timeInput", "timeFrom", "timeTo", "timeResult", "time"));
    document.getElementById("dataInput").addEventListener("input", () => updateResult("dataInput", "dataFrom", "dataTo", "dataResult", "data"));
});

// Fetch real-time currency data
async function convertCurrency() {
    const value = parseFloat(document.getElementById("currencyInput").value);
    const from = document.getElementById("currencyFrom").value;
    const to = document.getElementById("currencyTo").value;

    if (!value || isNaN(value)) {
        document.getElementById("currencyResult").innerText = "Enter a valid amount";
        return;
    }

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const data = await response.json();
        const rate = data.rates[to];

        if (rate) {
            document.getElementById("currencyResult").innerText = (value * rate).toFixed(2);
        } else {
            document.getElementById("currencyResult").innerText = "Conversion rate not available.";
        }
    } catch (error) {
        document.getElementById("currencyResult").innerText = "Error fetching exchange rates.";
    }
}
