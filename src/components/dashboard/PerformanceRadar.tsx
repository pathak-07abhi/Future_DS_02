import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { getPlatformMetrics } from '@/data/campaignData';

export const PerformanceRadar = () => {
  const metrics = getPlatformMetrics();

  // Normalize values for radar chart (0-100 scale)
  const normalize = (value: number, max: number) => (value / max) * 100;

  const maxImpressions = Math.max(metrics.facebook.impressions, metrics.instagram.impressions);
  const maxClicks = Math.max(metrics.facebook.clicks, metrics.instagram.clicks);
  const maxConversions = Math.max(metrics.facebook.conversions, metrics.instagram.conversions);
  const maxSpend = Math.max(metrics.facebook.spend, metrics.instagram.spend);
  const maxRevenue = Math.max(metrics.facebook.revenue, metrics.instagram.revenue);

  const data = [
    {
      metric: 'Impressions',
      facebook: normalize(metrics.facebook.impressions, maxImpressions),
      instagram: normalize(metrics.instagram.impressions, maxImpressions),
    },
    {
      metric: 'Clicks',
      facebook: normalize(metrics.facebook.clicks, maxClicks),
      instagram: normalize(metrics.instagram.clicks, maxClicks),
    },
    {
      metric: 'Conversions',
      facebook: normalize(metrics.facebook.conversions, maxConversions),
      instagram: normalize(metrics.instagram.conversions, maxConversions),
    },
    {
      metric: 'Spend',
      facebook: normalize(metrics.facebook.spend, maxSpend),
      instagram: normalize(metrics.instagram.spend, maxSpend),
    },
    {
      metric: 'Revenue',
      facebook: normalize(metrics.facebook.revenue, maxRevenue),
      instagram: normalize(metrics.instagram.revenue, maxRevenue),
    },
  ];

  return (
    <div className="metric-card p-5 h-full opacity-0 animate-fade-in" style={{ animationDelay: '550ms' }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">Platform Analysis</h3>
          <p className="text-xs text-muted-foreground">Comparative metrics</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-facebook" />
            <span className="text-muted-foreground">FB</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-instagram" />
            <span className="text-muted-foreground">IG</span>
          </div>
        </div>
      </div>

      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
            <PolarGrid stroke="hsl(222, 30%, 18%)" />
            <PolarAngleAxis
              dataKey="metric"
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 10 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(222, 47%, 10%)',
                border: '1px solid hsl(222, 30%, 18%)',
                borderRadius: '8px',
              }}
              formatter={(value: number) => [`${value.toFixed(0)}%`, '']}
            />
            <Radar
              name="Facebook"
              dataKey="facebook"
              stroke="hsl(221, 44%, 41%)"
              fill="hsl(221, 44%, 41%)"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Radar
              name="Instagram"
              dataKey="instagram"
              stroke="hsl(340, 75%, 54%)"
              fill="hsl(340, 75%, 54%)"
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
