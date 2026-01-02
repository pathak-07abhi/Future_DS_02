import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { getPlatformMetrics } from '@/data/campaignData';

const COLORS = ['hsl(221, 44%, 41%)', 'hsl(340, 75%, 54%)'];

export const SpendDistribution = () => {
  const platformMetrics = getPlatformMetrics();
  
  const data = [
    { name: 'Facebook', value: platformMetrics.facebook.spend, color: COLORS[0] },
    { name: 'Instagram', value: platformMetrics.instagram.spend, color: COLORS[1] },
  ];

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="metric-card p-5 h-full opacity-0 animate-fade-in" style={{ animationDelay: '350ms' }}>
      <div className="mb-4">
        <h3 className="text-base font-semibold text-foreground">Spend Distribution</h3>
        <p className="text-xs text-muted-foreground">By platform</p>
      </div>

      <div className="h-[200px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(222, 47%, 10%)',
                border: '1px solid hsl(222, 30%, 18%)',
                borderRadius: '8px',
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Spend']}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">${(total / 1000).toFixed(1)}k</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-6 mt-4">
        {data.map((item, i) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
            <span className="text-xs text-muted-foreground">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
