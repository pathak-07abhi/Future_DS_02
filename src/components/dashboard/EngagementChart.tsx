import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { dailyMetrics } from '@/data/campaignData';

export const EngagementChart = () => {
  return (
    <div className="metric-card p-5 h-full opacity-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Engagement Overview
          </h3>
          <p className="text-xs text-muted-foreground">
            Daily clicks and conversions
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            <span className="text-muted-foreground">Clicks</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-success" />
            <span className="text-muted-foreground">Conversions</span>
          </div>
        </div>
      </div>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={dailyMetrics}
            margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(190, 95%, 50%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(190, 95%, 50%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
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
              labelStyle={{ color: 'hsl(210, 40%, 98%)' }}
            />
            <Area
              type="monotone"
              dataKey="clicks"
              stroke="hsl(190, 95%, 50%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorClicks)"
            />
            <Area
              type="monotone"
              dataKey="conversions"
              stroke="hsl(142, 71%, 45%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorConversions)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
