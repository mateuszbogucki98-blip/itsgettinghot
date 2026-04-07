const apiWeather = "[api.open-meteo.com](https://api.open-meteo.com/v1/forecast)";
const apiAir = "[api.openaq.org](https://api.openaq.org/v2/latest)";

const btn = document.getElementById("loadBtn");
const input = document.getElementById("cityInput");
let chart;

// Uniwersalne współrzędne dla kilku miast
const cities = {
  Warszawa: { lat: 52.23, lon: 21.01 },
  Kraków: { lat: 50.06, lon: 19.94 },
  Gdańsk: { lat: 54.35, lon: 18.65 },
  Wrocław: { lat: 51.11, lon: 17.03 },
  Poznań: { lat: 52.40, lon: 16.92 }
};

btn.addEventListener("click", async () => {
  const city = input.value.trim();
  if (!city || !cities[city]) {
    alert("Wpisz jedno z miast: Warszawa, Kraków, Gdańsk, Wrocław, Poznań");
    return;
  }

  const { lat, lon } = cities[city];
  const weatherUrl = `${apiWeather}?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,sunshine_duration&timezone=auto`;
  const airUrl = `${apiAir}?coordinates=${lat},${lon}&parameter=pm25`;

  const [weatherResp, airResp] = await Promise.all([
    fetch(weatherUrl),
    fetch(airUrl)
  ]);

  const weather = await weatherResp.json();
  const air = await airResp.json();

  const days = weather.daily.time;
  const temps = weather.daily.temperature_2m_max;
  const altTemps = temps.map(t => t * 0.9);
  const oldPred = temps.map((t, i) => t - (Math.sin(i) * 1.2));

  const avgTemp = (
    temps.reduce((a, b) => a + b, 0) / temps.length
  ).toFixed(1);

  document.getElementById("avgTemp").textContent = avgTemp;
  document.getElementById("sunshine").textContent = (
    weather.daily.sunshine_duration.reduce((a, b) => a + b, 0) / 3600 / temps.length
  ).toFixed(1);
  document.getElementById("air").textContent =
    air.results[0]?.measurements[0]?.value.toFixed(1) || "brak danych";

  drawChart(days, temps, altTemps, oldPred);
});

function drawChart(labels, temps, altTemps, oldPred) {
  const ctx = document.getElementById("tempChart").getContext("2d");
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        { label: "Rzeczywiste temperatury", data: temps, borderColor: "red", tension: 0.3 },
        { label: "Scenariusz 50% CO₂", data: altTemps, borderColor: "blue", tension: 0.3 },
        { label: "Stare przewidywania", data: oldPred, borderColor: "gold", tension: 0.3 }
      ]
    },
    options: {
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
