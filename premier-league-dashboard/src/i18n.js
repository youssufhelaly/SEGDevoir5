import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Premier League Dashboard": "Premier League Dashboard",
      "Select Season": "Select Season",
      "Goals by Team (this season)": "Goals by Team (this season)",
      "Points by Team (this season)": "Points by Team (this season)",
      "Goals": "Goals",
      "Points": "Points"
    }
  },
  fr: {
    translation: {
      "Premier League Dashboard": "Tableau de bord Premier League",
      "Select Season": "Choisir la saison",
      "Goals by Team (this season)": "Buts par équipe (cette saison)",
      "Points by Team (this season)": "Points par équipe (cette saison)",
      "Goals": "Buts",
      "Points": "Points"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;