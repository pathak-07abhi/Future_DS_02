import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { dailyMetrics } from '@/data/campaignData';
import { Facebook, Instagram } from 'lucide-react';

export const PlatformComparison = () => {
  const data = dailyMetrics.slice(-7).map((d) => ({
    date: d.date,
    Facebook: d.facebookClicks,
    Instagram: d.instagramClicks,
  }));

  return (
    <div className="metric-card p-5 h-full opacity-0 animate-fade-in" style={{ animationDelay: '350ms' }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Platform Clicks
          </h3>
          <p className="text-xs text-muted-foreground">
            Last 7 days comparison
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <Facebook className="w-3.5 h-3.5 text-facebook" />
            <span className="text-muted-foreground">FB</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Instagram className="w-3.5 h-3.5 text-instagram" />
            <span className="text-muted-foreground">IG</span>
          </div>
        </div>
      </div>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
            barGap={2}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(222, 30%, 18%)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 10 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 10 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(222, 47%, 10%)',
                border: '1px solid hsl(222, 30%, 18%)',
                borderRadius: '8px',
              }}
              cursor={{ fill: 'hsl(222, 30%, 14%)' }}
            />
            <Bar dataKey="Facebook" radius={[3, 3, 0, 0]} maxBarSize={24}>
              {data.map((_, index) => (
                <Cell key={`fb-${index}`} fill="hsl(221, 44%, 41%)" />
              ))}
            </Bar>
            <Bar dataKey="Instagram" radius={[3, 3, 0, 0]} maxBarSize={24}>
              {data.map((_, index) => (
                <Cell key={`ig-${index}`} fill="hsl(340, 75%, 54%)" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
