import { Campaign, getTotalMetrics } from '@/data/campaignData';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToCSV = (campaigns: Campaign[], filename: string = 'campaign-report') => {
  const headers = [
    'Campaign',
    'Platform',
    'Status',
    'Impressions',
    'Clicks',
    'CTR (%)',
    'Conversions',
    'Spend ($)',
    'Revenue ($)',
    'ROI (%)',
    'Start Date',
    'End Date',
  ];

  const rows = campaigns.map((c) => [
    c.name,
    c.platform,
    c.status,
    c.impressions,
    c.clicks,
    c.ctr.toFixed(2),
    c.conversions,
    c.spend.toFixed(2),
    c.revenue.toFixed(2),
    c.roi.toFixed(2),
    c.startDate,
    c.endDate || 'Ongoing',
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = (campaigns: Campaign[], filename: string = 'campaign-report') => {
  const doc = new jsPDF();
  const metrics = getTotalMetrics();
  
  // Title
  doc.setFontSize(20);
  doc.setTextColor(30, 41, 59);
  doc.text('Social Media Campaign Report', 14, 22);
  
  // Date
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(`Generated: ${new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}`, 14, 30);

  // Summary Section
  doc.setFontSize(14);
  doc.setTextColor(30, 41, 59);
  doc.text('Performance Summary', 14, 45);

  const summaryData = [
    ['Total Impressions', formatNumber(metrics.impressions)],
    ['Total Clicks', formatNumber(metrics.clicks)],
    ['Average CTR', `${metrics.ctr.toFixed(2)}%`],
    ['Total Conversions', formatNumber(metrics.conversions)],
    ['Total Spend', formatCurrency(metrics.spend)],
    ['Overall ROI', `${metrics.roi.toFixed(0)}%`],
  ];

  autoTable(doc, {
    startY: 50,
    head: [['Metric', 'Value']],
    body: summaryData,
    theme: 'striped',
    headStyles: { 
      fillColor: [14, 165, 233],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    styles: {
      fontSize: 10,
      cellPadding: 4,
    },
    columnStyles: {
      0: { fontStyle: 'bold' },
      1: { halign: 'right' },
    },
  });

  // Campaign Details Section
  const finalY = (doc as any).lastAutoTable.finalY || 100;
  
  doc.setFontSize(14);
  doc.setTextColor(30, 41, 59);
  doc.text('Campaign Details', 14, finalY + 15);

  const campaignData = campaigns.map((c) => [
    c.name,
    c.platform.charAt(0).toUpperCase() + c.platform.slice(1),
    c.status.charAt(0).toUpperCase() + c.status.slice(1),
    formatNumber(c.impressions),
    formatNumber(c.clicks),
    `${c.ctr.toFixed(2)}%`,
    formatNumber(c.conversions),
    formatCurrency(c.spend),
    `${c.roi.toFixed(0)}%`,
  ]);

  autoTable(doc, {
    startY: finalY + 20,
    head: [['Campaign', 'Platform', 'Status', 'Impressions', 'Clicks', 'CTR', 'Conv.', 'Spend', 'ROI']],
    body: campaignData,
    theme: 'striped',
    headStyles: { 
      fillColor: [14, 165, 233],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8,
    },
    styles: {
      fontSize: 8,
      cellPadding: 3,
    },
    columnStyles: {
      0: { cellWidth: 35 },
      3: { halign: 'right' },
      4: { halign: 'right' },
      5: { halign: 'right' },
      6: { halign: 'right' },
      7: { halign: 'right' },
      8: { halign: 'right' },
    },
  });

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  doc.save(`${filename}.pdf`);
};

const formatNumber = (num: number) =>
  new Intl.NumberFormat('en-US').format(num);

const formatCurrency = (num: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(num);
