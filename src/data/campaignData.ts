export interface Campaign {
  id: string;
  name: string;
  platform: 'facebook' | 'instagram';
  status: 'active' | 'paused' | 'ended';
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  spend: number;
  revenue: number;
  roi: number;
  startDate: string;
  endDate: string | null;
}

export interface DailyMetric {
  date: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  facebookClicks: number;
  instagramClicks: number;
}

export const campaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Sale 2024',
    platform: 'facebook',
    status: 'active',
    impressions: 245892,
    clicks: 8456,
    ctr: 3.44,
    conversions: 423,
    spend: 2450,
    revenue: 12650,
    roi: 416,
    startDate: '2024-06-01',
    endDate: null,
  },
  {
    id: '2',
    name: 'Brand Awareness Q4',
    platform: 'instagram',
    status: 'active',
    impressions: 567234,
    clicks: 15234,
    ctr: 2.69,
    conversions: 287,
    spend: 4200,
    revenue: 8900,
    roi: 112,
    startDate: '2024-10-01',
    endDate: null,
  },
  {
    id: '3',
    name: 'Product Launch - Eco Line',
    platform: 'facebook',
    status: 'active',
    impressions: 189456,
    clicks: 6789,
    ctr: 3.58,
    conversions: 534,
    spend: 3100,
    revenue: 15200,
    roi: 390,
    startDate: '2024-11-15',
    endDate: null,
  },
  {
    id: '4',
    name: 'Holiday Promo',
    platform: 'instagram',
    status: 'paused',
    impressions: 432567,
    clicks: 12890,
    ctr: 2.98,
    conversions: 645,
    spend: 5600,
    revenue: 19450,
    roi: 247,
    startDate: '2024-12-01',
    endDate: null,
  },
  {
    id: '5',
    name: 'Flash Sale Weekend',
    platform: 'facebook',
    status: 'ended',
    impressions: 98765,
    clicks: 4532,
    ctr: 4.59,
    conversions: 312,
    spend: 1800,
    revenue: 9360,
    roi: 420,
    startDate: '2024-11-22',
    endDate: '2024-11-24',
  },
  {
    id: '6',
    name: 'Influencer Collab',
    platform: 'instagram',
    status: 'active',
    impressions: 789012,
    clicks: 23456,
    ctr: 2.97,
    conversions: 789,
    spend: 8900,
    revenue: 23670,
    roi: 166,
    startDate: '2024-09-01',
    endDate: null,
  },
];

export const dailyMetrics: DailyMetric[] = [
  { date: 'Dec 1', impressions: 45000, clicks: 1350, conversions: 67, spend: 450, facebookClicks: 780, instagramClicks: 570 },
  { date: 'Dec 2', impressions: 52000, clicks: 1560, conversions: 78, spend: 520, facebookClicks: 890, instagramClicks: 670 },
  { date: 'Dec 3', impressions: 48000, clicks: 1440, conversions: 72, spend: 480, facebookClicks: 820, instagramClicks: 620 },
  { date: 'Dec 4', impressions: 61000, clicks: 1830, conversions: 91, spend: 610, facebookClicks: 1050, instagramClicks: 780 },
  { date: 'Dec 5', impressions: 58000, clicks: 1740, conversions: 87, spend: 580, facebookClicks: 1000, instagramClicks: 740 },
  { date: 'Dec 6', impressions: 72000, clicks: 2160, conversions: 108, spend: 720, facebookClicks: 1240, instagramClicks: 920 },
  { date: 'Dec 7', impressions: 85000, clicks: 2550, conversions: 127, spend: 850, facebookClicks: 1470, instagramClicks: 1080 },
  { date: 'Dec 8', impressions: 78000, clicks: 2340, conversions: 117, spend: 780, facebookClicks: 1350, instagramClicks: 990 },
  { date: 'Dec 9', impressions: 69000, clicks: 2070, conversions: 103, spend: 690, facebookClicks: 1190, instagramClicks: 880 },
  { date: 'Dec 10', impressions: 82000, clicks: 2460, conversions: 123, spend: 820, facebookClicks: 1420, instagramClicks: 1040 },
  { date: 'Dec 11', impressions: 91000, clicks: 2730, conversions: 136, spend: 910, facebookClicks: 1570, instagramClicks: 1160 },
  { date: 'Dec 12', impressions: 95000, clicks: 2850, conversions: 142, spend: 950, facebookClicks: 1640, instagramClicks: 1210 },
  { date: 'Dec 13', impressions: 88000, clicks: 2640, conversions: 132, spend: 880, facebookClicks: 1520, instagramClicks: 1120 },
  { date: 'Dec 14', impressions: 102000, clicks: 3060, conversions: 153, spend: 1020, facebookClicks: 1760, instagramClicks: 1300 },
];

export const getTotalMetrics = () => {
  const totals = campaigns.reduce(
    (acc, campaign) => ({
      impressions: acc.impressions + campaign.impressions,
      clicks: acc.clicks + campaign.clicks,
      conversions: acc.conversions + campaign.conversions,
      spend: acc.spend + campaign.spend,
      revenue: acc.revenue + campaign.revenue,
    }),
    { impressions: 0, clicks: 0, conversions: 0, spend: 0, revenue: 0 }
  );

  const ctr = (totals.clicks / totals.impressions) * 100;
  const roi = ((totals.revenue - totals.spend) / totals.spend) * 100;

  return { ...totals, ctr, roi };
};

export const getPlatformMetrics = () => {
  const facebook = campaigns.filter((c) => c.platform === 'facebook');
  const instagram = campaigns.filter((c) => c.platform === 'instagram');

  const aggregate = (arr: Campaign[]) =>
    arr.reduce(
      (acc, c) => ({
        impressions: acc.impressions + c.impressions,
        clicks: acc.clicks + c.clicks,
        conversions: acc.conversions + c.conversions,
        spend: acc.spend + c.spend,
        revenue: acc.revenue + c.revenue,
      }),
      { impressions: 0, clicks: 0, conversions: 0, spend: 0, revenue: 0 }
    );

  return {
    facebook: aggregate(facebook),
    instagram: aggregate(instagram),
  };
};
