import i18next from "i18next";
import React from "react";
import translations from "../../i18n";

const i18nContext = React.createContext();

export class I18nProvider extends React.PureComponent {
  state = { t: key => key };

  componentDidMount() {
    this.i18n = i18next.createInstance({
      lng: this.props.lang,
      resources: {
        'en-US': { translation: require("../../i18n/en-US.json") },
        'pl-PL': { translation: require("../../i18n/pl-PL.json") }
      }
    }, this.handleLangChange.bind(this));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lang === this.props.lang) {
      return;
    }

    this.i18n.changeLanguage(this.props.lang, this.handleLangChange.bind(this));
  }

  handleLangChange(error, t) {
    console.log('LANGE CHANGEEE', t('language'))
    if (error) {
      return console.error(error);
    }

    this.setState({ t });
  }

  render() {
    console.log(this.state.t('language'))
    return <i18nContext.Provider value={this.state.t}>{this.props.children}</i18nContext.Provider>;
  }
}

export default i18nContext.Consumer;