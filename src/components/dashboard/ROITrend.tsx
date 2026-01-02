import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const roiData = [
  { date: 'Week 1', facebook: 180, instagram: 120 },
  { date: 'Week 2', facebook: 220, instagram: 150 },
  { date: 'Week 3', facebook: 280, instagram: 180 },
  { date: 'Week 4', facebook: 350, instagram: 210 },
  { date: 'Week 5', facebook: 390, instagram: 240 },
  { date: 'Week 6', facebook: 420, instagram: 166 },
];

export const ROITrend = () => {
  return (
    <div className="metric-card p-5 h-full opacity-0 animate-fade-in" style={{ animationDelay: '400ms' }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">ROI Trend</h3>
          <p className="text-xs text-muted-foreground">Weekly performance</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-facebook" />
            <span className="text-muted-foreground">Facebook</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-instagram" />
            <span className="text-muted-foreground">Instagram</span>
          </div>
        </div>
      </div>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={roiData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" vertical={false} />
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
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(222, 47%, 10%)',
                border: '1px solid hsl(222, 30%, 18%)',
                borderRadius: '8px',
              }}
              formatter={(value: number) => [`${value}%`, 'ROI']}
            />
            <Line
              type="monotone"
              dataKey="facebook"
              stroke="hsl(221, 44%, 41%)"
              strokeWidth={2}
              dot={{ fill: 'hsl(221, 44%, 41%)', strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="instagram"
              stroke="hsl(340, 75%, 54%)"
              strokeWidth={2}
              dot={{ fill: 'hsl(340, 75%, 54%)', strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
