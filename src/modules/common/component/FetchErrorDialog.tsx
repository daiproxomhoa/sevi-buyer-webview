import { Button, Dialog, DialogContent } from "@material-ui/core";
import React, { PureComponent } from "react";
import { FormattedMessage } from "react-intl";
interface Props {
  msgId?: string;
  onClose(): void;
}

class FetchErrorDialog extends PureComponent<Props> {
  render() {
    const { msgId } = this.props;
    return (
      <Dialog open={!!msgId} maxWidth="sm" style={{ zIndex: 999999 }}>
        <DialogContent
          style={{
            padding: "0 32px",
            display: "flex",
            alignContent: "center",
            justifyContent: "space-around",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "16px",
              textAlign: "center",
            }}
          >
            <div>{msgId && <FormattedMessage id={msgId} />}</div>
            <Button
              style={{
                padding: "1px 0",
                width: "90px",
                height: "30px",
                boxShadow: "none",
                marginTop: "20px",
              }}
              color="primary"
              variant="contained"
              size="small"
              onClick={this.props.onClose}
            >
              <FormattedMessage id="retry" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

export default FetchErrorDialog;
