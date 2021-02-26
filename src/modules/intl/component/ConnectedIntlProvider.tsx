import { IntlProvider } from "react-intl";
import { connect } from "react-redux";
import { AppState } from "../../../redux/reducer";
import { some } from "../../common/constants";
import json from "../translate.json";

function readFile(json: some) {
  const viMessages: Record<string, string> = {};
  const enMessages: Record<string, string> = {};

  Object.keys(json).forEach((key) => {
    viMessages[key] = json[key][0];
    enMessages[key] = json[key][1];
  });

  return { viMessages, enMessages };
}

const { viMessages, enMessages } = readFile(json);

function getMessages(locale: string) {
  if (locale === "en") {
    return enMessages;
  }
  return viMessages as Record<string, string>;
}

function mapStateToProps(state: AppState) {
  return {
    locale: state.intl.locale,
    messages: getMessages(state.intl.locale),
  };
}

export default connect(mapStateToProps)(IntlProvider);
