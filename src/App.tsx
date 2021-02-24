import React, { useEffect, useMemo } from "react";

function App() {
  const test = useMemo(() => 1, []);

  useEffect(() => {
    test.toExponential();
  }, []);

  return <div></div>;
}

export default App;
