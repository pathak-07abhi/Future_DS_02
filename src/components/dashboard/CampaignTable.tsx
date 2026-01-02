import { campaigns } from '@/data/campaignData';
import { Facebook, Instagram, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const formatNumber = (num: number) =>
  new Intl.NumberFormat('en-US', { notation: 'compact' }).format(num);

const formatCurrency = (num: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
  }).format(num);

export const CampaignTable = () => {
  return (
    <div className="metric-card p-5 opacity-0 animate-fade-in" style={{ animationDelay: '600ms' }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Campaign Performance
          </h3>
          <p className="text-xs text-muted-foreground">
            All campaigns overview
          </p>
        </div>
      </div>

      <div className="overflow-x-auto -mx-5 px-5">
        <table className="data-table text-sm">
          <thead>
            <tr>
              <th className="text-xs py-2">Campaign</th>
              <th className="text-xs py-2">Platform</th>
              <th className="text-xs py-2">Status</th>
              <th className="text-xs py-2 text-right">Impressions</th>
              <th className="text-xs py-2 text-right">Clicks</th>
              <th className="text-xs py-2 text-right">CTR</th>
              <th className="text-xs py-2 text-right">Conv.</th>
              <th className="text-xs py-2 text-right">Spend</th>
              <th className="text-xs py-2 text-right">ROI</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id}>
                <td className="py-3">
                  <span className="font-medium text-foreground text-sm">
                    {campaign.name}
                  </span>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-1.5">
                    {campaign.platform === 'facebook' ? (
                      <Facebook className="w-3.5 h-3.5 text-facebook" />
                    ) : (
                      <Instagram className="w-3.5 h-3.5 text-instagram" />
                    )}
                  </div>
                </td>
                <td className="py-3">
                  <span
                    className={cn(
                      'status-badge text-xs',
                      campaign.status === 'active' && 'status-active',
                      campaign.status === 'paused' && 'status-paused',
                      campaign.status === 'ended' && 'status-ended'
                    )}
                  >
                    <span
                      className={cn(
                        'w-1.5 h-1.5 rounded-full',
                        campaign.status === 'active' && 'bg-success',
                        campaign.status === 'paused' && 'bg-warning',
                        campaign.status === 'ended' && 'bg-muted-foreground'
                      )}
                    />
                    {campaign.status}
                  </span>
                </td>
                <td className="text-right text-muted-foreground py-3 text-sm">
                  {formatNumber(campaign.impressions)}
                </td>
                <td className="text-right text-muted-foreground py-3 text-sm">
                  {formatNumber(campaign.clicks)}
                </td>
                <td className="text-right py-3">
                  <span
                    className={cn(
                      'font-medium text-sm',
                      campaign.ctr >= 3 ? 'text-success' : 'text-muted-foreground'
                    )}
                  >
                    {campaign.ctr.toFixed(2)}%
                  </span>
                </td>
                <td className="text-right text-muted-foreground py-3 text-sm">
                  {formatNumber(campaign.conversions)}
                </td>
                <td className="text-right text-muted-foreground py-3 text-sm">
                  {formatCurrency(campaign.spend)}
                </td>
                <td className="text-right py-3">
                  <div
                    className={cn(
                      'flex items-center justify-end gap-1 font-medium text-sm',
                      campaign.roi >= 200 ? 'text-success' : campaign.roi >= 100 ? 'text-warning' : 'text-destructive'
                    )}
                  >
                    {campaign.roi >= 200 ? (
                      <TrendingUp className="w-3.5 h-3.5" />
                    ) : campaign.roi < 100 ? (
                      <TrendingDown className="w-3.5 h-3.5" />
                    ) : null}
                    {campaign.roi.toFixed(0)}%
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
