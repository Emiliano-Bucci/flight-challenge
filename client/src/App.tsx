import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("http://localhost:8000/api/airport/index.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        departure: "qweqw",
        // arrival: "qewqw",
      }),
    })
      .then(async (_res) => {
        const res = await _res.json();
        console.log({ res });
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);
  return <div>asda</div>;
}

export default App;
