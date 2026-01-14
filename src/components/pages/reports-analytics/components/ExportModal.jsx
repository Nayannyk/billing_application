import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportModal = ({ isOpen, onClose, onExport }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeDetails, setIncludeDetails] = useState(true);

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'excel', label: 'Excel Spreadsheet' },
    { value: 'csv', label: 'CSV File' }
  ];

  const handleExport = () => {
    onExport({
      format: exportFormat,
      includeCharts,
      includeDetails
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[300]"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
        <div className="bg-card rounded-lg shadow-warm-xl w-full max-w-md animate-slide-down">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10">
                <Icon name="Download" size={20} color="var(--color-primary)" strokeWidth={2} />
              </div>
              <h2 className="text-xl font-heading font-semibold text-foreground">
                Export Report
              </h2>
            </div>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition-smooth"
            >
              <Icon name="X" size={20} className="text-muted-foreground" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <Select
              label="Export Format"
              description="Choose the file format for your report"
              options={formatOptions}
              value={exportFormat}
              onChange={setExportFormat}
            />

            <div className="space-y-3">
              <p className="text-sm font-body font-medium text-foreground">Include in Export</p>
              <Checkbox
                label="Charts and Graphs"
                description="Include visual data representations"
                checked={includeCharts}
                onChange={(e) => setIncludeCharts(e?.target?.checked)}
              />
              <Checkbox
                label="Detailed Transactions"
                description="Include complete transaction listings"
                checked={includeDetails}
                onChange={(e) => setIncludeDetails(e?.target?.checked)}
              />
            </div>

            <div className="p-4 bg-muted/50 rounded-md">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <p className="text-xs caption text-muted-foreground">
                  The exported report will include data from your selected date range and filters. 
                  Large reports may take a few moments to generate.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              variant="default" 
              iconName="Download" 
              iconPosition="left"
              onClick={handleExport}
            >
              Export Report
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExportModal;
