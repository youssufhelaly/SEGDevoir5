import React from 'react';
import {
  ResponsiveContainer,
  BarChart, Bar,
  LineChart, Line,
  XAxis, YAxis,
  CartesianGrid, Tooltip, Legend
} from 'recharts';
import { useTranslation } from 'react-i18next';

const ChartComponent = ({ lineData, barData }) => {
  const { t } = useTranslation();
  return (
    <section className="charts">
      <div className="chart-container">
        <h2 className="chart-title">{t('Goals by Team (this season)')}</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={lineData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="team"
              tick={{ fontSize: 12 }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="goals"
              name={t('Goals')}
              fill="#4caf50"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h2 className="chart-title">{t('Points by Team (this season)')}</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={barData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="team"
              tick={{ fontSize: 12 }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="points"
              name={t('Points')}
              stroke="#2196f3"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default ChartComponent;