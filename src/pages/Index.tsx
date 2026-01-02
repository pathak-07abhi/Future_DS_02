import { Header } from '@/components/dashboard/Header';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { EngagementChart } from '@/components/dashboard/EngagementChart';
import { PlatformComparison } from '@/components/dashboard/PlatformComparison';
import { SpendDistribution } from '@/components/dashboard/SpendDistribution';
import { ROITrend } from '@/components/dashboard/ROITrend';
import { ConversionFunnel } from '@/components/dashboard/ConversionFunnel';
import { TopCampaigns } from '@/components/dashboard/TopCampaigns';
import { PerformanceRadar } from '@/components/dashboard/PerformanceRadar';
import { CampaignTable } from '@/components/dashboard/CampaignTable';
import { getTotalMetrics } from '@/data/campaignData';
import {
  Eye,
  MousePointerClick,
  Target,
  DollarSign,
  TrendingUp,
  Percent,
} from 'lucide-react';

const formatNumber = (num: number) =>
  new Intl.NumberFormat('en-US', { notation: 'compact' }).format(num);

const formatCurrency = (num: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
  }).format(num);

const Index = () => {
  const metrics = getTotalMetrics();

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 lg:p-6 max-w-[1920px] mx-auto">
        <Header />

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <MetricCard
            title="Impressions"
            value={formatNumber(metrics.impressions)}
            change={12.5}
            icon={Eye}
            iconColor="text-primary"
            delay={0}
          />
          <MetricCard
            title="Clicks"
            value={formatNumber(metrics.clicks)}
            change={8.3}
            icon={MousePointerClick}
            iconColor="text-accent"
            delay={50}
          />
          <MetricCard
            title="CTR"
            value={`${metrics.ctr.toFixed(2)}%`}
            change={-2.1}
            icon={Percent}
            iconColor="text-warning"
            delay={100}
          />
          <MetricCard
            title="Conversions"
            value={formatNumber(metrics.conversions)}
            change={15.7}
            icon={Target}
            iconColor="text-success"
            delay={150}
          />
          <MetricCard
            title="Total Spend"
            value={formatCurrency(metrics.spend)}
            change={5.2}
            icon={DollarSign}
            iconColor="text-destructive"
            delay={200}
          />
          <MetricCard
            title="ROI"
            value={`${metrics.roi.toFixed(0)}%`}
            change={22.4}
            icon={TrendingUp}
            iconColor="text-success"
            delay={250}
          />
        </div>

        {/* Row 1: Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
          <div className="lg:col-span-2">
            <EngagementChart />
          </div>
          <div>
            <SpendDistribution />
          </div>
          <div>
            <ConversionFunnel />
          </div>
        </div>

        {/* Row 2: More Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <PlatformComparison />
          <ROITrend />
          <PerformanceRadar />
          <TopCampaigns />
        </div>

        {/* Row 3: Campaign Table */}
        <CampaignTable />
      </div>
    </div>
  );
};

export default Index;
