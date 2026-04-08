const apiWeather = "https://api.open-meteo.com/v1/forecast";
const apiAir = "https://api.openaq.org/v3/locations";
const OPENAQ_API_KEY = "e3b342756b9c4295a0b45455c54c22e94662abab57a2bd016e1a92c83bf97ae5";

const btn = document.getElementById("loadBtn");
const input = document.getElementById("cityInput");
let chart;

const datalist = document.getElementById("cityList");
Object.keys(cities).forEach(city => {
  const option = document.createElement("option");
  option.value = city;
  datalist.appendChild(option);
});
const cities = {
  // Największe miasta
  "Warszawa":        { lat: 52.23, lon: 21.01 },
  "Kraków":          { lat: 50.06, lon: 19.94 },
  "Łódź":            { lat: 51.77, lon: 19.46 },
  "Wrocław":         { lat: 51.11, lon: 17.03 },
  "Poznań":          { lat: 52.40, lon: 16.92 },
  "Gdańsk":          { lat: 54.35, lon: 18.65 },
  "Szczecin":        { lat: 53.43, lon: 14.55 },
  "Bydgoszcz":       { lat: 53.12, lon: 18.00 },
  "Lublin":          { lat: 51.25, lon: 22.57 },
  "Katowice":        { lat: 50.26, lon: 19.02 },
  "Białystok":       { lat: 53.13, lon: 23.16 },
  "Gdynia":          { lat: 54.52, lon: 18.53 },
  "Częstochowa":     { lat: 50.81, lon: 19.12 },
  "Radom":           { lat: 51.40, lon: 21.15 },
  "Sosnowiec":       { lat: 50.29, lon: 19.10 },
  "Toruń":           { lat: 53.01, lon: 18.61 },
  "Kielce":          { lat: 50.87, lon: 20.63 },
  "Rzeszów":         { lat: 50.04, lon: 22.00 },
  "Gliwice":         { lat: 50.29, lon: 18.67 },
  "Zabrze":          { lat: 50.32, lon: 18.79 },
  "Olsztyn":         { lat: 53.78, lon: 20.49 },
  "Bielsko-Biała":   { lat: 49.82, lon: 19.05 },
  "Bytom":           { lat: 50.35, lon: 18.92 },
  "Zielona_Góra":    { lat: 51.94, lon: 15.51 },
  "Rybnik":          { lat: 50.10, lon: 18.55 },
  "Ruda_Śląska":     { lat: 50.26, lon: 18.86 },
  "Opole":           { lat: 50.67, lon: 17.93 },
  "Tychy":           { lat: 50.13, lon: 18.99 },
  "Gorzów_Wielkopolski": { lat: 52.73, lon: 15.24 },
  "Dąbrowa_Górnicza":{ lat: 50.32, lon: 19.19 },
  "Płock":           { lat: 52.55, lon: 19.71 },
  "Elbląg":          { lat: 54.16, lon: 19.40 },
  "Wałbrzych":       { lat: 50.77, lon: 16.28 },
  "Włocławek":       { lat: 52.65, lon: 19.07 },
  "Tarnów":          { lat: 50.01, lon: 20.99 },
  "Chorzów":         { lat: 50.30, lon: 18.95 },
  "Koszalin":        { lat: 54.19, lon: 16.17 },
  "Kalisz":          { lat: 51.76, lon: 18.09 },
  "Legnica":         { lat: 51.21, lon: 16.16 },
  "Grudziądz":       { lat: 53.48, lon: 18.75 },
  "Jaworzno":        { lat: 50.20, lon: 19.27 },
  "Słupsk":          { lat: 54.46, lon: 17.03 },
  "Jastrzębie_Zdrój":{ lat: 49.95, lon: 18.58 },
  "Nowe_Tychy":      { lat: 50.13, lon: 18.99 },
  "Siedlce":         { lat: 52.17, lon: 22.29 },
  "Mysłowice":       { lat: 50.21, lon: 19.17 },
  "Konin":           { lat: 52.23, lon: 18.25 },
  "Piła":            { lat: 53.15, lon: 16.74 },
  "Inowrocław":      { lat: 52.80, lon: 18.26 },
  "Ostrów_Wielkopolski": { lat: 51.65, lon: 17.82 },
  "Ostrowiec_Świętokrzyski": { lat: 50.93, lon: 21.38 },
  "Stargard":        { lat: 53.34, lon: 15.05 },
  "Piotrków_Trybunalski": { lat: 51.40, lon: 19.70 },
  "Lubin":           { lat: 51.40, lon: 16.20 },
  "Gniezno":         { lat: 52.54, lon: 17.60 },
  "Zgorzelec":       { lat: 51.15, lon: 15.01 },
  "Świdnica":        { lat: 50.85, lon: 16.49 },
  "Przemyśl":        { lat: 49.78, lon: 22.77 },
  "Zamość":          { lat: 50.72, lon: 23.25 },
  "Nowy_Sącz":       { lat: 49.62, lon: 20.69 },
  "Jelenia_Góra":    { lat: 50.90, lon: 15.73 },
  "Łomża":           { lat: 53.18, lon: 22.06 },
  "Kędzierzyn_Koźle":{ lat: 50.34, lon: 18.21 },
  "Pabianice":       { lat: 51.66, lon: 19.35 },
  "Nowy_Targ":       { lat: 49.48, lon: 20.03 },
  "Suwałki":         { lat: 54.10, lon: 22.93 },
  "Chełm":           { lat: 51.13, lon: 23.47 },
  "Mielec":          { lat: 50.29, lon: 21.43 },
  "Stalowa_Wola":    { lat: 50.58, lon: 22.05 },
  "Tczew":           { lat: 54.09, lon: 18.78 },
  "Leszno":          { lat: 51.84, lon: 16.58 },
  "Ostrołęka":       { lat: 53.08, lon: 21.57 }
};

btn.addEventListener("click", async () => {
  const city = input.value.trim();
  if (!city || !cities[city]) {
    alert("Wpisz jedno z miast: Warszawa, Kraków, Gdańsk, Wrocław, Poznań");
    return;
  }

  const { lat, lon } = cities[city];
  const weatherUrl = `${apiWeather}?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,sunshine_duration&timezone=auto`;
  const airUrl = `${apiAir}?coordinates=${lat},${lon}&radius=50000&parameters_id=2&limit=1`;

  try {
    const weatherResp = await fetch(weatherUrl);
    if (!weatherResp.ok) throw new Error("Nie udało się pobrać danych pogodowych");
    const weather = await weatherResp.json();

    let pm25Value = null;
try {
  const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(airUrl)}`;
  console.log("Fetching:", proxyUrl);
  const airResp = await fetch(proxyUrl, {
    headers: { "X-API-Key": "e3b342756b9c4295a0b45455c54c22e94662abab57a2bd016e1a92c83bf97ae5" }
  });
  console.log("Air status:", airResp.status);
  const air = await airResp.json();
  console.log("Air result:", JSON.stringify(air));
  const sensor = air.results?.[0]?.sensors?.find(s => s.name.toLowerCase().includes("pm25"));
  console.log("Sensor:", sensor);
  if (sensor?.id) {
    const sensorUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.openaq.org/v3/sensors/${sensor.id}/latest`)}`;
    const sensorResp = await fetch(sensorUrl, {
      headers: { "X-API-Key": "e3b342756b9c4295a0b45455c54c22e94662abab57a2bd016e1a92c83bf97ae5" }
    });
    console.log("Sensor status:", sensorResp.status);
    const sensorData = await sensorResp.json();
    console.log("Sensor data:", JSON.stringify(sensorData));
    pm25Value = sensorData.results?.[0]?.value ?? null;
  }
} catch(e) {
  console.error("OpenAQ error:", e);
}

    const days    = weather.daily.time;
    const temps   = weather.daily.temperature_2m_max;
    const altTemps = temps.map(t => parseFloat((t * 0.9).toFixed(1)));
    const oldPred  = temps.map((t, i) => parseFloat((t - Math.sin(i) * 1.2).toFixed(1)));
    const avgTemp  = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1);

    document.getElementById("avgTemp").textContent = avgTemp;
    document.getElementById("sunshine").textContent = (
      weather.daily.sunshine_duration.reduce((a, b) => a + b, 0) / 3600 / temps.length
    ).toFixed(1);
    document.getElementById("air").textContent = pm25Value !== null ? pm25Value.toFixed(1) : "brak danych";

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
    tension: 0  //
  },
  {
    label: "Scenariusz 50% CO₂",
    data: altTemps,
    borderColor: "#457b9d",
    backgroundColor: "rgba(69,123,157,0.1)",
    fill: true,
    tension: 0  //
  },
  {
    label: "Stare przewidywania",
    data: oldPred,
    borderColor: "#f4a261",
    backgroundColor: "rgba(244,162,97,0.1)",
    fill: true,
    tension: 0  //
  }
]
    },
    options: {
      responsive: true,
      animation: {
        duration: 500,
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
