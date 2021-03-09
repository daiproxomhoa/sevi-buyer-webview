import { ButtonBase } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

interface Props {
  num: number;
  onResend(): void;
  onCompleted(): void;
}

export const CountDown = (props: Props) => {
  const { onResend, onCompleted } = props;
  const [seconds, setSeconds] = useState(props.num);

  useEffect(() => {
    if (!seconds) {
      onCompleted();
      return;
    }

    const intervalId = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds, onCompleted]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Typography variant="body2" color="textSecondary">
        <FormattedMessage id="auth.YouNoReceiveCode" />
        &nbsp;
      </Typography>

      <ButtonBase disableRipple disabled={!!seconds} onClick={onResend}>
        <Typography variant="body2" style={{ fontWeight: 500 }} color="primary">
          <FormattedMessage id="auth.resend" />
          &nbsp;
          {!!seconds && <>({seconds}s)</>}
        </Typography>
      </ButtonBase>
    </div>
  );
};
