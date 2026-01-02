import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { campaigns } from '@/data/campaignData';
import { exportToCSV, exportToPDF } from '@/lib/exportUtils';
import { toast } from '@/hooks/use-toast';

export const ExportMenu = () => {
  const handleExportCSV = () => {
    try {
      exportToCSV(campaigns, 'campaign-report');
      toast({
        title: 'Export successful',
        description: 'Campaign data exported as CSV file.',
      });
    } catch (error) {
      toast({
        title: 'Export failed',
        description: 'There was an error exporting the data.',
        variant: 'destructive',
      });
    }
  };

  const handleExportPDF = () => {
    try {
      exportToPDF(campaigns, 'campaign-report');
      toast({
        title: 'Export successful',
        description: 'Campaign report exported as PDF file.',
      });
    } catch (error) {
      toast({
        title: 'Export failed',
        description: 'There was an error generating the PDF.',
        variant: 'destructive',
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" size="sm" className="gap-2">
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleExportCSV} className="gap-2 cursor-pointer">
          <FileSpreadsheet className="w-4 h-4 text-success" />
          <span>Export as CSV</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportPDF} className="gap-2 cursor-pointer">
          <FileText className="w-4 h-4 text-destructive" />
          <span>Export as PDF</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
