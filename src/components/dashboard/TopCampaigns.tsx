import { campaigns } from '@/data/campaignData';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export const TopCampaigns = () => {
  const sorted = [...campaigns].sort((a, b) => b.roi - a.roi).slice(0, 4);

  return (
    <div className="metric-card p-5 h-full opacity-0 animate-fade-in" style={{ animationDelay: '500ms' }}>
      <div className="mb-4">
        <h3 className="text-base font-semibold text-foreground">Top Performers</h3>
        <p className="text-xs text-muted-foreground">By ROI</p>
      </div>

      <div className="space-y-3">
        {sorted.map((campaign, index) => (
          <div
            key={campaign.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {campaign.name}
              </p>
              <p className="text-xs text-muted-foreground capitalize">
                {campaign.platform}
              </p>
            </div>
            <div
              className={cn(
                'flex items-center gap-1 text-sm font-semibold',
                campaign.roi >= 300 ? 'text-success' : campaign.roi >= 150 ? 'text-warning' : 'text-muted-foreground'
              )}
            >
              {campaign.roi >= 200 ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : campaign.roi < 150 ? (
                <TrendingDown className="w-3.5 h-3.5" />
              ) : (
                <Minus className="w-3.5 h-3.5" />
              )}
              {campaign.roi}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
