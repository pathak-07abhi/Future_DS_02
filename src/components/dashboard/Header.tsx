import { Calendar, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExportMenu } from './ExportMenu';

export const Header = () => {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-foreground">
          Performance Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Social Media Campaign Analytics
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-2 text-xs">
          <Calendar className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Dec 1 - Dec 14, 2024</span>
          <span className="sm:hidden">Date</span>
        </Button>
        <ExportMenu />
        <Button variant="outline" size="icon" className="shrink-0 h-9 w-9">
          <RefreshCw className="w-3.5 h-3.5" />
        </Button>
      </div>
    </header>
  );
};
