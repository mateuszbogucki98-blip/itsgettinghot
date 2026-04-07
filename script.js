const apiWeather = "https://api.open-meteo.com/v1/forecast";
const apiAir = "https://api.openaq.org/v2/latest";
const OPENAQ_API_KEY = "e3b342756b9c4295a0b45455c54c22e94662abab57a2bd016e1a92c83bf97ae5"; //

const btn = document.getElementById("loadBtn");
const input = document.getElementById("cityInput");
let chart;

const cities = {
  Warszawa: { lat: 52.23, lon: 21.01 },
  Kraków:   { lat: 50.06, lon: 19.94 },
  Gdańsk:   { lat: 54.35, lon: 18.65 },
  Wrocław:  { lat: 51.11, lon: 17.03 },
  Poznań:   { lat: 52.40, lon: 16.92 }
};

btn.addEventListener("click", async () => {
  const city = input.value.trim();
  if (!city || !cities[city]) {
    alert("Wpisz jedno z miast: Warszawa, Kraków, Gdańsk, Wrocław, Poznań");
    return;
  }

  const { lat, lon } = cities[city];

  const weatherUrl = `${apiWeather}?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,sunshine_duration&timezone=auto`;
  const airUrl = `${apiAir}?country=PL&limit=1&parameter=pm25`;

  try {
    const weatherResp = await fetch(weatherUrl);
    if (!weatherResp.ok) throw new Error("Nie udało się pobrać danych pogodowych");
    const weather = await weatherResp.json();

    let air = { results: [] };
    try {
      const airResp = await fetch(airUrl, {
  headers: {
    "e3b342756b9c4295a0b45455c54c22e94662abab57a2bd016e1a92c83bf97ae5": OPENAQ_API_KEY
  }
});
if (airResp.ok) air = await airResp.json();
    } catch {
      console.warn("Nie udało się pobrać danych z OpenAQ");
    }

    const days  = weather.daily.time;
    const temps = weather.daily.temperature_2m_max;
    const altTemps = temps.map(t => parseFloat((t * 0.9).toFixed(1)));
    const oldPred  = temps.map((t, i) => parseFloat((t - Math.sin(i) * 1.2).toFixed(1)));

    const avgTemp = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1);

    document.getElementById("avgTemp").textContent = avgTemp;
    document.getElementById("sunshine").textContent = (
      weather.daily.sunshine_duration.reduce((a, b) => a + b, 0) / 3600 / temps.length
    ).toFixed(1);

    const pm = air.results?.[0]?.measurements?.find(m => m.parameter === "pm25");
    document.getElementById("air").textContent = pm ? pm.value.toFixed(1) : "brak danych";

    drawChart(days, temps, altTemps, oldPred);
  } catch (err) {
    console.error(err);
    alert("Błąd podczas pobierania danych. Sprawdź konsolę.");
  }
});

function drawChart(labels, temps, altTemps, oldPred) {
  const ctx = document.getElementById("tempChart").getContext("2d");
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Rzeczywiste temperatury",
          data: temps,
          borderColor: "#e63946",
          backgroundColor: "rgba(230,57,70,0.1)",
          fill: true,
          tension: 0.3
        },
        {
          label: "Scenariusz 50% CO₂",
          data: altTemps,
          borderColor: "#457b9d",
          backgroundColor: "rgba(69,123,157,0.1)",
          fill: true,
          tension: 0.3
        },
        {
          label: "Stare przewidywania",
          data: oldPred,
          borderColor: "#f4a261",
          backgroundColor: "rgba(244,162,97,0.1)",
          fill: true,
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      animation: {
        duration: 2000,
        easing: "easeOutQuart"
      },
      scales: {
        y: { title: { display: true, text: "°C" } },
        x: { title: { display: true, text: "Dzień" } }
      },
      plugins: {
        legend: { position: "bottom" }
      }
    }
  });
}
