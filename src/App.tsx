import React, { useEffect, useMemo } from "react";
import { FormattedMessage } from "react-intl";

interface Props {}

const App: React.FC<Props> = () => {
  const test = useMemo(() => 1, []);

  useEffect(() => {
    test.toExponential();
  }, [test]);

  return (
    <div>
      <FormattedMessage id="test" />
    </div>
  );
};

export default App;
