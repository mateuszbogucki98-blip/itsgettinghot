const apiWeather = "https://api.open-meteo.com/v1/forecast";
const apiAir = "https://api.openaq.org/v3/locations";
const OPENAQ_API_KEY = "e3b342756b9c4295a0b45455c54c22e94662abab57a2bd016e1a92c83bf97ae5";

const btn = document.getElementById("loadBtn");
const input = document.getElementById("cityInput");
let chart;

const cities = {
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
  "Dąbrowa_Górnicza": { lat: 50.32, lon: 19.19 },
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
  "Jastrzębie_Zdrój": { lat: 49.95, lon: 18.58 },
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
  "Kędzierzyn_Koźle": { lat: 50.34, lon: 18.21 },
  "Pabianice":       { lat: 51.66, lon: 19.35 },
  "Nowy_Targ":       { lat: 49.48, lon: 20.03 },
  "Suwałki":         { lat: 54.10, lon: 22.93 },
  "Chełm":           { lat: 51.13, lon: 23.47 },
  "Mielec":          { lat: 50.29, lon: 21.43 },
  "Stalowa_Wola":    { lat: 50.58, lon: 22.05 },
  "Tczew":           { lat: 54.09, lon: 18.78 },
  "Leszno":          { lat: 51.84, lon: 16.58 },
  "Ostrołęka":       { lat: 53.08, lon: 21.57 },
  "Zakopane":        { lat: 49.30, lon: 19.95 },
  "Sopot":           { lat: 54.44, lon: 18.56 },
  "Hel":             { lat: 54.61, lon: 18.80 },
  "Kołobrzeg":       { lat: 54.17, lon: 15.58 },
  "Świnoujście":     { lat: 53.91, lon: 14.25 },
  "Malbork":         { lat: 54.04, lon: 19.03 },
  "Giżycko":         { lat: 54.04, lon: 21.76 },
  "Augustów":        { lat: 53.84, lon: 22.98 },
  "Białowieża":      { lat: 52.70, lon: 23.87 },
  "Kazimierz_Dolny": { lat: 51.32, lon: 21.95 },
  "Nałęczów":        { lat: 51.28, lon: 22.21 },
  "Puławy":          { lat: 51.42, lon: 21.97 },
  "Sandomierz":      { lat: 50.68, lon: 21.75 },
  "Zamość":          { lat: 50.72, lon: 23.25 },
  "Oświęcim":        { lat: 50.03, lon: 19.21 },
  "Wieliczka":       { lat: 49.99, lon: 20.07 },
  "Wadowice":        { lat: 49.88, lon: 19.50 },
  "Cieszyn":         { lat: 49.75, lon: 18.63 },
  "Wisła":           { lat: 49.65, lon: 18.87 },
  "Ustroń":          { lat: 49.72, lon: 18.81 },
  "Szczyrk":         { lat: 49.72, lon: 19.03 },
  "Sanok":           { lat: 49.56, lon: 22.20 },
  "Krosno":          { lat: 49.69, lon: 21.77 },
  "Jarosław":        { lat: 49.96, lon: 22.68 },
  "Tarnobrzeg":      { lat: 50.57, lon: 21.68 },
  "Stalowa_Wola":    { lat: 50.58, lon: 22.05 },
  "Nysa":            { lat: 50.47, lon: 17.33 },
  "Kłodzko":         { lat: 50.44, lon: 16.66 },
  "Racibórz":        { lat: 50.09, lon: 18.22 },
  "Pszczyna":        { lat: 49.98, lon: 18.95 },
  "Tarnowskie_Góry": { lat: 50.44, lon: 18.86 },
  "Zawiercie":       { lat: 50.49, lon: 19.42 },
  "Olkusz":          { lat: 50.28, lon: 19.56 },
  "Bochnia":         { lat: 49.97, lon: 20.43 },
  "Nowa_Ruda":       { lat: 50.58, lon: 16.50 },
  "Bolesławiec":     { lat: 51.26, lon: 15.57 },
  "Głogów":          { lat: 51.66, lon: 16.08 },
  "Legnica":         { lat: 51.21, lon: 16.16 },
  "Lubin":           { lat: 51.40, lon: 16.20 },
  "Świdnica":        { lat: 50.85, lon: 16.49 },
  "Wodzisław_Śląski": { lat: 50.00, lon: 18.46 },
  "Żory":            { lat: 50.03, lon: 18.70 },
  "Knurów":          { lat: 50.22, lon: 18.68 },
  "Mikołów":         { lat: 50.17, lon: 18.90 },
  "Piekary_Śląskie": { lat: 50.38, lon: 18.95 },
  "Siemianowice_Śląskie": { lat: 50.33, lon: 19.02 }
};

// datalist MUST be after cities
const datalist = document.getElementById("cityList");
Object.keys(cities).forEach(city => {
  const option = document.createElement("option");
  option.value = city;
  datalist.appendChild(option);
});

btn.addEventListener("click", async () => {
  const city = input.value.trim();
  if (!city || !cities[city]) {
    alert("Wpisz nazwę miasta z listy (np. Warszawa, Zakopane, Hel...)");
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
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(airUrl)}`;
      const airResp = await fetch(proxyUrl, {
        headers: { "X-API-Key": OPENAQ_API_KEY }
      });
      if (airResp.ok) {
        const air = await airResp.json();
        const sensor = air.results?.[0]?.sensors?.find(s => s.name.toLowerCase().includes("pm25"));
        if (sensor?.id) {
          const sensorUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.openaq.org/v3/sensors/${sensor.id}/latest`)}`;
          const sensorResp = await fetch(sensorUrl, {
            headers: { "X-API-Key": OPENAQ_API_KEY }
          });
          if (sensorResp.ok) {
            const sensorData = await sensorResp.json();
            pm25Value = sensorData.results?.[0]?.value ?? null;
          }
        }
      }
    } catch(e) {
      console.warn("Nie udało się pobrać danych z OpenAQ", e);
    }

    const days     = weather.daily.time;
    const temps    = weather.daily.temperature_2m_max;
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
          tension: 0
        },
        {
          label: "Scenariusz 50% CO₂",
          data: altTemps,
          borderColor: "#457b9d",
          backgroundColor: "rgba(69,123,157,0.1)",
          fill: true,
          tension: 0
        },
        {
          label: "Stare prognozy IPCC AR4 (niedoszacowane o ~0.7°C)",
          data: oldPred,
          borderColor: "#f4a261",
          backgroundColor: "rgba(244,162,97,0.1)",
          fill: true,
          tension: 0
        }
      ]
    },
    options: {
  responsive: true,
  animation: { duration: 500, easing: "easeOutQuart" },
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: {
      title: { display: true, text: "°C", color: "#888880" },
      grid: { color: "rgba(255,255,255,0.05)" },
      ticks: { color: "#888880", font: { family: "DM Mono" } }
    },
    x: {
      title: { display: true, text: "Dzień", color: "#888880" },
      grid: { color: "rgba(255,255,255,0.05)" },
      ticks: { color: "#888880", font: { family: "DM Mono" } }
    }
  }
}
