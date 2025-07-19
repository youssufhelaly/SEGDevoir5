import React, { useState, useEffect } from 'react';
import './App.css';
import './i18n';
import { useTranslation } from 'react-i18next';
import Papa from 'papaparse';
import ChartComponent from './components/ChartComponent';

function App() {
  const { t, i18n } = useTranslation();
  const [season, setSeason] = useState('2020');
  const [seasonsList, setSeasonsList] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    Papa.parse(process.env.PUBLIC_URL + '/data/final_dataset.csv', {
      header: true,
      download: true,
      skipEmptyLines: true,
      transformHeader: h => h.trim(),
      complete: ({ data: rawRows }) => {
        const rows = rawRows
          .filter(r => typeof r.Date === 'string' && r.Date.includes('/'))
          .map(r => {
            const [d, m, y] = r.Date.split('/');
            const year = y.length === 2 ? 2000 + +y : +y;
            return { ...r, Season: String(year) };
          });

        const seasons = Array.from(new Set(rows.map(r => r.Season))).sort();
        setSeasonsList(seasons);
        if (!seasons.includes(season)) setSeason(seasons[0]);

        const filtered = rows.filter(r => r.Season === season);

        // Bar chart: Goals by team (this season)
        const goalsByTeam = {};
        filtered.forEach(r => {
          goalsByTeam[r.HomeTeam] = (goalsByTeam[r.HomeTeam] || 0) + (+r.FTHG || 0);
          goalsByTeam[r.AwayTeam] = (goalsByTeam[r.AwayTeam] || 0) + (+r.FTAG || 0);
        });
        setLineData(Object.entries(goalsByTeam).map(([team, goals]) => ({ team, goals })));

        // Line chart: Points by team (this season)
        const pointsByTeam = {};
        filtered.forEach(r => {
          pointsByTeam[r.HomeTeam] = (pointsByTeam[r.HomeTeam] || 0) +
            (r.FTR === 'H' ? 3 : r.FTR === 'D' ? 1 : 0);
          pointsByTeam[r.AwayTeam] = (pointsByTeam[r.AwayTeam] || 0) +
            (r.FTR === 'A' ? 3 : r.FTR === 'D' ? 1 : 0);
        });
        setBarData(
          Object.entries(pointsByTeam)
            .map(([team, points]) => ({ team, points }))
            .sort((a, b) => b.points - a.points)
        );
      }
    });
  }, [season]);

  return (
    <div className="App">
      <header className="app-header">
        <h1 className="title">{t('Premier League Dashboard')}</h1>
        <div className="controls">
          <button className="lang-btn" onClick={() => i18n.changeLanguage('en')}>EN</button>
          <button className="lang-btn" onClick={() => i18n.changeLanguage('fr')}>FR</button>
          <label htmlFor="season-select" className="select-label">{t('Select Season')}:</label>
          <select
            id="season-select"
            value={season}
            onChange={e => setSeason(e.target.value)}
            className="season-select"
          >
            {seasonsList.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </header>

      <main>
        <ChartComponent lineData={lineData} barData={barData} />
      </main>
    </div>
  );
}

export default App;