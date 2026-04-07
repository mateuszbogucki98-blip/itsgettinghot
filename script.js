const apiWeather = "https://api.open-meteo.com/v1/forecast";
const apiAir = "https://api.openaq.org/v3/locations";
const OPENAQ_API_KEY = "e3b342756b9c4295a0b45455c54c22e94662abab57a2bd016e1a92c83bf97ae5";

const btn = document.getElementById("loadBtn");
const input = document.getElementById("cityInput");
let chart;

cconst cities = {
  // Największe miasta
  Warszawa:        { lat: 52.23, lon: 21.01 },
  Kraków:          { lat: 50.06, lon: 19.94 },
  Łódź:            { lat: 51.77, lon: 19.46 },
  Wrocław:         { lat: 51.11, lon: 17.03 },
  Poznań:          { lat: 52.40, lon: 16.92 },
  Gdańsk:          { lat: 54.35, lon: 18.65 },
  Szczecin:        { lat: 53.43, lon: 14.55 },
  Bydgoszcz:       { lat: 53.12, lon: 18.00 },
  Lublin:          { lat: 51.25, lon: 22.57 },
  Katowice:        { lat: 50.26, lon: 19.02 },
  Białystok:       { lat: 53.13, lon: 23.16 },
  Gdynia:          { lat: 54.52, lon: 18.53 },
  Częstochowa:     { lat: 50.81, lon: 19.12 },
  Radom:           { lat: 51.40, lon: 21.15 },
  Sosnowiec:       { lat: 50.29, lon: 19.10 },
  Toruń:           { lat: 53.01, lon: 18.61 },
  Kielce:          { lat: 50.87, lon: 20.63 },
  Rzeszów:         { lat: 50.04, lon: 22.00 },
  Gliwice:         { lat: 50.29, lon: 18.67 },
  Zabrze:          { lat: 50.32, lon: 18.79 },
  Olsztyn:         { lat: 53.78, lon: 20.49 },
  Bielsko-Biała:   { lat: 49.82, lon: 19.05 },
  Bytom:           { lat: 50.35, lon: 18.92 },
  Zielona_Góra:    { lat: 51.94, lon: 15.51 },
  Rybnik:          { lat: 50.10, lon: 18.55 },
  Ruda_Śląska:     { lat: 50.26, lon: 18.86 },
  Opole:           { lat: 50.67, lon: 17.93 },
  Tychy:           { lat: 50.13, lon: 18.99 },
  Gorzów_Wielkopolski: { lat: 52.73, lon: 15.24 },
  Dąbrowa_Górnicza:{ lat: 50.32, lon: 19.19 },
  Płock:           { lat: 52.55, lon: 19.71 },
  Elbląg:          { lat: 54.16, lon: 19.40 },
  Wałbrzych:       { lat: 50.77, lon: 16.28 },
  Włocławek:       { lat: 52.65, lon: 19.07 },
  Tarnów:          { lat: 50.01, lon: 20.99 },
  Chorzów:         { lat: 50.30, lon: 18.95 },
  Koszalin:        { lat: 54.19, lon: 16.17 },
  Kalisz:          { lat: 51.76, lon: 18.09 },
  Legnica:         { lat: 51.21, lon: 16.16 },
  Grudziądz:       { lat: 53.48, lon: 18.75 },
  Jaworzno:        { lat: 50.20, lon: 19.27 },
  Słupsk:          { lat: 54.46, lon: 17.03 },
  Jastrzębie_Zdrój:{ lat: 49.95, lon: 18.58 },
  Nowe_Tychy:      { lat: 50.13, lon: 18.99 },
  Siedlce:         { lat: 52.17, lon: 22.29 },
  Mysłowice:       { lat: 50.21, lon: 19.17 },
  Konin:           { lat: 52.23, lon: 18.25 },
  Piła:            { lat: 53.15, lon: 16.74 },
  Inowrocław:      { lat: 52.80, lon: 18.26 },
  Ostrów_Wielkopolski: { lat: 51.65, lon: 17.82 },
  Ostrowiec_Świętokrzyski: { lat: 50.93, lon: 21.38 },
  Stargard:        { lat: 53.34, lon: 15.05 },
  Piotrków_Trybunalski: { lat: 51.40, lon: 19.70 },
  Lubin:           { lat: 51.40, lon: 16.20 },
  Gniezno:         { lat: 52.54, lon: 17.60 },
  Zgorzelec:       { lat: 51.15, lon: 15.01 },
  Świdnica:        { lat: 50.85, lon: 16.49 },
  Przemyśl:        { lat: 49.78, lon: 22.77 },
  Zamość:          { lat: 50.72, lon: 23.25 },
  Nowy_Sącz:       { lat: 49.62, lon: 20.69 },
  Jelenia_Góra:    { lat: 50.90, lon: 15.73 },
  Łomża:           { lat: 53.18, lon: 22.06 },
  Kędzierzyn_Koźle:{ lat: 50.34, lon: 18.21 },
  Pabianice:       { lat: 51.66, lon: 19.35 },
  Nowy_Targ:       { lat: 49.48, lon: 20.03 },
  Suwałki:         { lat: 54.10, lon: 22.93 },
  Chełm:           { lat: 51.13, lon: 23.47 },
  Mielec:          { lat: 50.29, lon: 21.43 },
  Stalowa_Wola:    { lat: 50.58, lon: 22.05 },
  Tczew:           { lat: 54.09, lon: 18.78 },
  Leszno:          { lat: 51.84, lon: 16.58 },
  Ostrołęka:       { lat: 53.08, lon: 21.57 },
  Biała_Podlaska:  { lat: 52.03, lon: 23.15 },
  Skierniewice:    { lat: 51.96, lon: 20.16 },
  Starachowice:    { lat: 51.03, lon: 21.07 },
  Tomaszów_Mazowiecki: { lat: 51.53, lon: 20.01 },
  Sopot:           { lat: 54.44, lon: 18.56 },
  Pruszków:        { lat: 52.17, lon: 20.80 },
  Legionowo:       { lat: 52.40, lon: 20.93 },
  Wołomin:         { lat: 52.35, lon: 21.24 },
  Otwock:          { lat: 52.11, lon: 21.26 },
  Nowy_Dwór_Mazowiecki: { lat: 52.43, lon: 20.70 },
  Mińsk_Mazowiecki:{ lat: 52.18, lon: 21.56 },
  Żyrardów:        { lat: 52.05, lon: 20.44 },
  Piaseczno:       { lat: 52.08, lon: 21.02 },
  Sochaczew:       { lat: 52.23, lon: 20.24 },
  Grodzisk_Mazowiecki: { lat: 52.11, lon: 20.63 },
  Pułtusk:         { lat: 52.71, lon: 21.08 },
  Nałęczów:        { lat: 51.28, lon: 22.21 },
  Kazimierz_Dolny: { lat: 51.32, lon: 21.95 },
  Zakopane:        { lat: 49.30, lon: 19.95 },
  Karpacz:         { lat: 50.78, lon: 15.74 },
  Szklarska_Poręba:{ lat: 50.83, lon: 15.52 },
  Kudowa_Zdrój:    { lat: 50.43, lon: 16.25 },
  Świnoujście:     { lat: 53.91, lon: 14.25 },
  Międzyzdroje:    { lat: 53.93, lon: 14.45 },
  Kołobrzeg:       { lat: 54.17, lon: 15.58 },
  Darłowo:         { lat: 54.42, lon: 16.41 },
  Ustka:           { lat: 54.58, lon: 16.86 },
  Łeba:            { lat: 54.76, lon: 17.55 },
  Hel:             { lat: 54.61, lon: 18.80 },
  Władysławowo:    { lat: 54.79, lon: 18.41 },
  Malbork:         { lat: 54.04, lon: 19.03 },
  Kwidzyn:         { lat: 53.73, lon: 18.93 },
  Iława:           { lat: 53.60, lon: 19.57 },
  Ostróda:         { lat: 53.70, lon: 19.97 },
  Giżycko:         { lat: 54.04, lon: 21.76 },
  Mrągowo:         { lat: 53.86, lon: 21.30 },
  Pisz:            { lat: 53.63, lon: 21.81 },
  Augustów:        { lat: 53.84, lon: 22.98 },
  Hajnówka:        { lat: 52.74, lon: 23.58 },
  Białowieża:      { lat: 52.70, lon: 23.87 },
  Sanok:           { lat: 49.56, lon: 22.20 },
  Lesko:           { lat: 49.47, lon: 22.33 },
  Ustrzyki_Dolne:  { lat: 49.43, lon: 22.58 },
  Krosno:          { lat: 49.69, lon: 21.77 },
  Jasło:           { lat: 49.75, lon: 21.47 },
  Dębica:          { lat: 50.05, lon: 21.41 },
  Tarnobrzeg:      { lat: 50.57, lon: 21.68 },
  Sandomierz:      { lat: 50.68, lon: 21.75 },
  Busko_Zdrój:     { lat: 50.47, lon: 20.72 },
  Pińczów:         { lat: 50.52, lon: 20.53 },
  Jędrzejów:       { lat: 50.64, lon: 20.30 },
  Końskie:         { lat: 51.19, lon: 20.41 },
  Skarżysko_Kamienna: { lat: 51.12, lon: 20.87 },
  Radomsko:        { lat: 51.07, lon: 19.45 },
  Bełchatów:       { lat: 51.36, lon: 19.37 },
  Wieluń:          { lat: 51.22, lon: 18.57 },
  Sieradz:         { lat: 51.60, lon: 18.73 },
  Zduńska_Wola:    { lat: 51.60, lon: 18.93 },
  Kutno:           { lat: 52.23, lon: 19.36 },
  Łęczyca:         { lat: 52.06, lon: 19.20 },
  Zgierz:          { lat: 51.85, lon: 19.41 },
  Pabianice:       { lat: 51.66, lon: 19.36 },
  Aleksandrów_Łódzki: { lat: 51.82, lon: 19.30 },
  Głowno:          { lat: 51.96, lon: 19.72 },
  Brzeziny:        { lat: 51.80, lon: 19.76 },
  Łowicz:          { lat: 52.10, lon: 19.94 },
  Rawa_Mazowiecka: { lat: 51.76, lon: 20.25 },
  Opoczno:         { lat: 51.38, lon: 20.29 },
  Końskie:         { lat: 51.19, lon: 20.41 },
  Szydłowiec:      { lat: 51.23, lon: 20.86 },
  Zwoleń:          { lat: 51.36, lon: 21.59 },
  Kozienice:       { lat: 51.58, lon: 21.56 },
  Puławy:          { lat: 51.42, lon: 21.97 },
  Świdnik:         { lat: 51.22, lon: 22.69 },
  Kraśnik:         { lat: 50.92, lon: 22.22 },
  Biłgoraj:        { lat: 50.54, lon: 22.72 },
  Hrubieszów:      { lat: 50.81, lon: 23.89 },
  Tomaszów_Lubelski: { lat: 50.45, lon: 23.42 },
  Zwierzyniec:     { lat: 50.61, lon: 22.97 },
  Nisko:           { lat: 50.52, lon: 22.14 },
  Leżajsk:         { lat: 50.26, lon: 22.42 },
  Łańcut:          { lat: 50.07, lon: 22.23 },
  Jarosław:        { lat: 49.96, lon: 22.68 },
  Przeworsk:       { lat: 49.99, lon: 22.50 },
  Lubaczów:        { lat: 50.16, lon: 23.12 },
  Tomaszów_Lubelski: { lat: 50.45, lon: 23.42 },
  Gorlice:         { lat: 49.65, lon: 21.16 },
  Limanowa:        { lat: 49.70, lon: 20.43 },
  Myślenice:       { lat: 49.83, lon: 19.94 },
  Wadowice:        { lat: 49.88, lon: 19.50 },
  Oświęcim:        { lat: 50.03, lon: 19.21 },
  Chrzanów:        { lat: 50.14, lon: 19.40 },
  Olkusz:          { lat: 50.28, lon: 19.56 },
  Miechów:         { lat: 50.36, lon: 20.07 },
  Proszowice:      { lat: 50.19, lon: 20.29 },
  Wieliczka:       { lat: 49.99, lon: 20.07 },
  Bochnia:         { lat: 49.97, lon: 20.43 },
  Brzesko:         { lat: 49.97, lon: 20.61 },
  Dąbrowa_Tarnowska: { lat: 50.17, lon: 20.99 },
  Mielec:          { lat: 50.29, lon: 21.43 },
  Ropczyce:        { lat: 50.05, lon: 21.62 },
  Kolbuszowa:      { lat: 50.24, lon: 21.78 },
  Strzyżów:        { lat: 49.87, lon: 21.79 },
  Brzozów:         { lat: 49.70, lon: 22.01 },
  Rymanów:         { lat: 49.57, lon: 21.87 },
  Zagórz:          { lat: 49.51, lon: 22.27 },
  Wetlina:         { lat: 49.14, lon: 22.27 },
  Cisna:           { lat: 49.23, lon: 22.33 },
  Solina:          { lat: 49.37, lon: 22.46 },
  Polańczyk:       { lat: 49.38, lon: 22.39 },
  Łańcut:          { lat: 50.07, lon: 22.23 },
  Głogów:          { lat: 51.66, lon: 16.08 },
  Polkowice:       { lat: 51.50, lon: 16.07 },
  Bolesławiec:     { lat: 51.26, lon: 15.57 },
  Kamienna_Góra:   { lat: 50.78, lon: 16.03 },
  Dzierżoniów:     { lat: 50.73, lon: 16.65 },
  Ząbkowice_Śląskie: { lat: 50.59, lon: 16.81 },
  Kłodzko:         { lat: 50.44, lon: 16.66 },
  Nowa_Ruda:       { lat: 50.58, lon: 16.50 },
  Bystrzyca_Kłodzka: { lat: 50.30, lon: 16.65 },
  Lądek_Zdrój:     { lat: 50.34, lon: 16.88 },
  Stronie_Śląskie: { lat: 50.29, lon: 16.88 },
  Nysa:            { lat: 50.47, lon: 17.33 },
  Brzeg:           { lat: 50.86, lon: 17.47 },
  Namysłów:        { lat: 51.08, lon: 17.72 },
  Kluczbork:       { lat: 51.00, lon: 18.22 },
  Olesno:          { lat: 50.88, lon: 18.42 },
  Strzelce_Opolskie: { lat: 50.51, lon: 18.31 },
  Prudnik:         { lat: 50.32, lon: 17.58 },
  Głubczyce:       { lat: 50.20, lon: 17.83 },
  Racibórz:        { lat: 50.09, lon: 18.22 },
  Wodzisław_Śląski:{ lat: 50.00, lon: 18.46 },
  Żory:            { lat: 50.03, lon: 18.70 },
  Pszczyna:        { lat: 49.98, lon: 18.95 },
  Cieszyn:         { lat: 49.75, lon: 18.63 },
  Wisła:           { lat: 49.65, lon: 18.87 },
  Ustroń:          { lat: 49.72, lon: 18.81 },
  Szczyrk:         { lat: 49.72, lon: 19.03 },
  Zawiercie:       { lat: 50.49, lon: 19.42 },
  Myszków:         { lat: 50.57, lon: 19.32 },
  Częstochowa:     { lat: 50.81, lon: 19.12 },
  Kłobuck:         { lat: 50.91, lon: 18.93 },
  Lubliniec:       { lat: 50.67, lon: 18.69 },
  Tarnowskie_Góry: { lat: 50.44, lon: 18.86 },
  Piekary_Śląskie: { lat: 50.38, lon: 18.95 },
  Siemianowice_Śląskie: { lat: 50.33, lon: 19.02 },
  Świętochłowice:  { lat: 50.29, lon: 18.92 },
  Knurów:          { lat: 50.22, lon: 18.68 },
  Mikołów:         { lat: 50.17, lon: 18.90 },
  Orzesze:         { lat: 50.12, lon: 18.77 },
  Lędziny:         { lat: 50.14, lon: 19.05 },
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
    tension: 0  // 👈 changed
  },
  {
    label: "Scenariusz 50% CO₂",
    data: altTemps,
    borderColor: "#457b9d",
    backgroundColor: "rgba(69,123,157,0.1)",
    fill: true,
    tension: 0  // 👈 changed
  },
  {
    label: "Stare przewidywania",
    data: oldPred,
    borderColor: "#f4a261",
    backgroundColor: "rgba(244,162,97,0.1)",
    fill: true,
    tension: 0  // 👈 changed
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
