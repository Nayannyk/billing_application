import React, { useState, useCallback } from 'react';
import Header from '../../components/ui/Header';
import PageTitle from '../../components/ui/PageTitle';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = React.createRef();

  const user = { name: 'Sudama Mankar', email: 'sudama@hairverse.in', role: 'Manager' };

  const handleUpload = useCallback((e) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map((file) => ({
      id: URL.createObjectURL(file),
      name: file.name,
      src: URL.createObjectURL(file)
    }));
    setImages((prev) => [...prev, ...newImages]);
    e.target.value = '';
  }, []);

  const handleRemove = useCallback((id, e) => {
    e.stopPropagation();
    URL.revokeObjectURL(id);
    setImages((prev) => prev.filter((img) => img.id !== id));
    if (selectedImage === id) setSelectedImage(null);
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={() => {}} />
      <div className="pt-20">
        <PageTitle />
        <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8">
          {selectedImage && (
            <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
              <img src={selectedImage} alt="Gallery" className="max-w-full max-h-full object-contain" />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center text-xl hover:bg-white/30"
              >
                ✕
              </button>
            </div>
          )}

          <div className="mb-6 flex items-center gap-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth text-sm font-body font-medium flex items-center gap-2"
            >
              <span className="text-lg leading-none">+</span>
              Add Photos
            </button>
            {images.length > 0 && (
              <span className="text-sm caption text-muted-foreground">
                {images.length} {images.length === 1 ? 'photo' : 'photos'}
              </span>
            )}
          </div>

          {images.length === 0 ? (
            <div className="text-center py-20">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-muted mx-auto mb-4">
                <span className="text-3xl text-muted-foreground">🖼</span>
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                No photos yet
              </h3>
              <p className="caption text-muted-foreground mb-6">
                Click "Add Photos" to upload images
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  onClick={() => setSelectedImage(img.src)}
                  className="aspect-square rounded-lg overflow-hidden bg-card border border-border cursor-pointer hover:shadow-warm-md transition-smooth group relative"
                >
                  <img
                    src={img.src}
                    alt={img.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    loading="lazy"
                  />
                  <button
                    onClick={(e) => handleRemove(img.id, e)}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 hover:bg-destructive transition-smooth"
                    title="Delete"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
