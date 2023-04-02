import airports from "../airports.json";

function App() {
  const data = airports.map((i) => {
    return {
      name: i.name,
      code: i.city_code,
      lat: i.coordinates.lat,
      lng: i.coordinates.lon,
    };
  });
  console.log(data);
  return <div>asda</div>;
}

export default App;
