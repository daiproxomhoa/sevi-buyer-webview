import React, { useEffect, useMemo } from "react";

function App() {
  const test = useMemo(() => 1, []);

  useEffect(() => {
    test.toExponential();
  }, [test]);

  return <div></div>;
}

export default App;
