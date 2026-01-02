import { getTotalMetrics } from '@/data/campaignData';

export const ConversionFunnel = () => {
  const metrics = getTotalMetrics();

  const funnel = [
    { label: 'Impressions', value: metrics.impressions, color: 'bg-primary' },
    { label: 'Clicks', value: metrics.clicks, color: 'bg-accent' },
    { label: 'Conversions', value: metrics.conversions, color: 'bg-success' },
  ];

  const maxValue = funnel[0].value;

  return (
    <div className="metric-card p-5 h-full opacity-0 animate-fade-in" style={{ animationDelay: '450ms' }}>
      <div className="mb-4">
        <h3 className="text-base font-semibold text-foreground">Conversion Funnel</h3>
        <p className="text-xs text-muted-foreground">User journey overview</p>
      </div>

      <div className="space-y-4">
        {funnel.map((stage, index) => {
          const width = (stage.value / maxValue) * 100;
          const rate = index > 0 ? ((stage.value / funnel[index - 1].value) * 100).toFixed(1) : null;

          return (
            <div key={stage.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{stage.label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">
                    {stage.value.toLocaleString()}
                  </span>
                  {rate && (
                    <span className="text-muted-foreground">({rate}%)</span>
                  )}
                </div>
              </div>
              <div className="h-8 bg-secondary/50 rounded-lg overflow-hidden">
                <div
                  className={`h-full ${stage.color} rounded-lg transition-all duration-700`}
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Overall CVR</span>
          <span className="font-semibold text-success">
            {((metrics.conversions / metrics.impressions) * 100).toFixed(3)}%
          </span>
        </div>
      </div>
    </div>
  );
};
