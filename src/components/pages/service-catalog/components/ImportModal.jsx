import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ImportModal = ({ isOpen, onClose, onImport }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [importing, setImporting] = useState(false);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      const droppedFile = e?.dataTransfer?.files?.[0];
      if (droppedFile?.name?.endsWith('.xlsx') || droppedFile?.name?.endsWith('.xls')) {
        setFile(droppedFile);
      }
    }
  };

  const handleFileChange = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      setFile(e?.target?.files?.[0]);
    }
  };

  const handleImport = async () => {
    if (!file) return;
    
    setImporting(true);
    setTimeout(() => {
      const mockServices = [
        { name: 'Premium Haircut', category: 'Hair Care', duration: 60, price: 55.00 },
        { name: 'Hair Coloring', category: 'Hair Care', duration: 120, price: 95.00 },
        { name: 'Manicure Deluxe', category: 'Nail Services', duration: 45, price: 35.00 }
      ];
      onImport(mockServices);
      setImporting(false);
      setFile(null);
      onClose();
    }, 2000);
  };

  const downloadTemplate = () => {
    const csvContent = "Service Name,Category,Duration (min),Price (USD),Description\nWomen's Haircut,Hair Care,45,45.00,Standard haircut for women\nMen's Haircut,Hair Care,30,25.00,Standard haircut for men";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'service_template.csv';
    a?.click();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[300]" onClick={onClose} />
      <div className="fixed inset-0 z-[301] flex items-center justify-center p-4">
        <div className="bg-card rounded-md shadow-warm-xl w-full max-w-lg">
          <div className="border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Import Services from Excel
            </h2>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-muted transition-smooth"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-muted/50 rounded-md p-4 border border-border">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <div className="caption text-foreground">
                  <p className="font-medium mb-1">File Requirements:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Excel format (.xlsx or .xls)</li>
                    <li>Required columns: Service Name, Category, Duration, Price</li>
                    <li>Maximum 500 services per import</li>
                  </ul>
                </div>
              </div>
            </div>

            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`
                relative border-2 border-dashed rounded-md p-8 text-center transition-smooth
                ${dragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
              `}
            >
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center justify-center w-16 h-16 rounded-md bg-primary/10">
                  <Icon name="Upload" size={32} color="var(--color-primary)" />
                </div>
                
                {file ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-foreground font-body font-medium">
                      <Icon name="FileSpreadsheet" size={20} className="text-success" />
                      {file?.name}
                    </div>
                    <button
                      onClick={(e) => {
                        e?.stopPropagation();
                        setFile(null);
                      }}
                      className="caption text-error hover:underline"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="font-body text-foreground">
                      <span className="font-medium text-primary">Click to upload</span> or drag and drop
                    </div>
                    <div className="caption text-muted-foreground">
                      Excel files only (.xlsx, .xls)
                    </div>
                  </>
                )}
              </div>
            </div>

            <button
              onClick={downloadTemplate}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md border border-border hover:bg-muted transition-smooth"
            >
              <Icon name="Download" size={18} />
              <span className="font-body font-medium">Download Template</span>
            </button>

            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                fullWidth
                disabled={importing}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="default"
                iconName="Upload"
                iconPosition="left"
                onClick={handleImport}
                disabled={!file}
                loading={importing}
                fullWidth
              >
                Import Services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportModal;
