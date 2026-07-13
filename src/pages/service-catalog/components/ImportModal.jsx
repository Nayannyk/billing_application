import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const parseCSV = (text) => {
  const lines = text.split('\n').filter(line => line.trim());
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  const nameIdx = headers.findIndex(h => h.includes('name') || h.includes('service'));
  const catIdx = headers.findIndex(h => h.includes('category') || h.includes('group'));
  const durIdx = headers.findIndex(h => h.includes('duration') || h.includes('min'));
  const priceIdx = headers.findIndex(h => h.includes('price') || h.includes('rate') || h.includes('amount'));
  const descIdx = headers.findIndex(h => h.includes('description') || h.includes('desc'));

  if (nameIdx === -1 || priceIdx === -1) return [];

  return lines.slice(1).map(line => {
    const cols = line.split(',').map(c => c.trim().replace(/^"|"$/g, ''));
    return {
      name: cols[nameIdx] || '',
      category: cols[catIdx] || 'Uncategorized',
      duration: parseInt(cols[durIdx]) || 30,
      price: parseFloat(cols[priceIdx]) || 0,
      description: descIdx !== -1 ? (cols[descIdx] || '') : '',
    };
  }).filter(s => s.name && s.price > 0);
};

const ImportModal = ({ isOpen, onClose, onImport }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [importing, setImporting] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');

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
      processFile(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      processFile(e?.target?.files?.[0]);
    }
  };

  const processFile = (f) => {
    setError('');
    setPreview(null);

    if (f?.name?.endsWith('.xlsx') || f?.name?.endsWith('.xls')) {
      setFile(f);
      setError('Excel files require a library to parse. Please save your file as CSV and try again.');
      return;
    }

    if (!f?.name?.endsWith('.csv')) {
      setError('Please upload a CSV file (.csv)');
      return;
    }

    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e?.target?.result;
      const services = parseCSV(text);
      if (services.length === 0) {
        setError('No valid services found. Ensure your CSV has columns: Name, Category, Duration, Price');
      } else {
        setPreview(services);
      }
    };
    reader.readAsText(f);
  };

  const handleImport = () => {
    if (!preview || preview.length === 0) return;
    
    setImporting(true);
    setTimeout(() => {
      onImport(preview);
      setImporting(false);
      setFile(null);
      setPreview(null);
      setError('');
      onClose();
    }, 500);
  };

  const handleClose = () => {
    setFile(null);
    setPreview(null);
    setError('');
    onClose();
  };

  const downloadTemplate = () => {
    const csvContent = "Service Name,Category,Duration (min),Price,Description\nHaircut,Haircuts & Styling,30,149,Professional haircut\nHair Color,Hair Coloring,60,399,Full hair coloring service";
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
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[300]" onClick={handleClose} />
      <div className="fixed inset-0 z-[301] flex items-center justify-center p-4">
        <div className="bg-card rounded-md shadow-warm-xl w-full max-w-lg">
          <div className="border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Import Services from CSV
            </h2>
            <button
              onClick={handleClose}
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
                    <li>CSV format (.csv)</li>
                    <li>Required columns: Service Name, Price</li>
                    <li>Optional columns: Category, Duration, Description</li>
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
                accept=".csv"
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
                        setPreview(null);
                        setError('');
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
                      CSV files only (.csv)
                    </div>
                  </>
                )}
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 bg-error/10 rounded-md">
                <Icon name="AlertCircle" size={18} className="text-error mt-0.5 flex-shrink-0" />
                <p className="text-sm caption text-error">{error}</p>
              </div>
            )}

            {preview && preview.length > 0 && (
              <div className="bg-success/5 border border-success/20 rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="CheckCircle" size={18} className="text-success" />
                  <span className="text-sm font-medium text-success">{preview.length} services ready to import</span>
                </div>
                <div className="max-h-40 overflow-y-auto space-y-1">
                  {preview.slice(0, 10).map((s, i) => (
                    <div key={i} className="text-xs text-muted-foreground flex justify-between">
                      <span>{s.name}</span>
                      <span>₹{s.price}</span>
                    </div>
                  ))}
                  {preview.length > 10 && (
                    <div className="text-xs text-muted-foreground">...and {preview.length - 10} more</div>
                  )}
                </div>
              </div>
            )}

            <button
              onClick={downloadTemplate}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md border border-border hover:bg-muted transition-smooth"
            >
              <Icon name="Download" size={18} />
              <span className="font-body font-medium">Download CSV Template</span>
            </button>

            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
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
                disabled={!preview || preview.length === 0}
                loading={importing}
                fullWidth
              >
                Import {preview ? `${preview.length} Services` : 'Services'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportModal;
