import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  iconColor?: string;
  delay?: number;
}

export const MetricCard = ({
  title,
  value,
  change,
  icon: Icon,
  iconColor = 'text-primary',
  delay = 0,
}: MetricCardProps) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div
      className="metric-card p-4 opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-3">
        <div
          className={cn(
            'p-2 rounded-lg',
            iconColor === 'text-primary' && 'bg-primary/10',
            iconColor === 'text-success' && 'bg-success/10',
            iconColor === 'text-warning' && 'bg-warning/10',
            iconColor === 'text-accent' && 'bg-accent/10',
            iconColor === 'text-destructive' && 'bg-destructive/10'
          )}
        >
          <Icon className={cn('w-4 h-4', iconColor)} />
        </div>
        {change !== undefined && (
          <div
            className={cn(
              'flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full',
              isPositive && 'text-success bg-success/10',
              isNegative && 'text-destructive bg-destructive/10',
              !isPositive && !isNegative && 'text-muted-foreground bg-muted'
            )}
          >
            {isPositive && '+'}
            {change.toFixed(1)}%
          </div>
        )}
      </div>

      <div className="space-y-0.5">
        <p className="text-2xl font-bold tracking-tight text-foreground">
          {value}
        </p>
        <p className="text-muted-foreground text-xs font-medium">{title}</p>
      </div>
    </div>
  );
};
