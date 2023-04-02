import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("/api/user").then(async (_res) => {
      console.log({ _res });
    });
  }, []);
  return <div>asda</div>;
}

export default App;
