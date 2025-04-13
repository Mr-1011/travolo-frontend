
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X } from 'lucide-react';

type Photo = {
  url: string;
  caption: string;
};

type PhotoUploadStepProps = {
  photos: Photo[];
  onPhotoChange: (photos: Photo[]) => void;
};

const PhotoUploadStep: React.FC<PhotoUploadStepProps> = ({ photos, onPhotoChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };
  
  const handleFiles = (files: FileList) => {
    const validFiles = Array.from(files).filter(file => 
      file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp'
    );
    
    if (validFiles.length === 0) return;
    
    const newPhotos = [...photos];
    
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          newPhotos.push({ url: e.target.result as string, caption: '' });
          if (validFiles[validFiles.length - 1] === file) {
            onPhotoChange([...newPhotos]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };
  
  const removePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    onPhotoChange(newPhotos);
  };
  
  const updateCaption = (index: number, caption: string) => {
    const newPhotos = [...photos];
    newPhotos[index] = { ...newPhotos[index], caption };
    onPhotoChange(newPhotos);
  };
  
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-2">Upload a Photo from a Past Trip</h2>
      <p className="text-gray-600 mb-6">
        Help us understand your style by sharing a vacation photo you love.
        <br/>
        <span className="text-sm">(Optional)</span>
      </p>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? 'border-[#3c83f6] bg-[#3c83f6]/5' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center">
          <Upload size={40} className="text-gray-400 mb-2" />
          <p className="text-lg font-medium mb-1">Drag and drop your photos here</p>
          <p className="text-sm text-gray-500 mb-4">or click to browse files</p>
          
          <input
            type="file"
            accept="image/jpeg, image/png, image/webp"
            multiple
            id="photo-upload"
            className="hidden"
            onChange={handleFileInput}
          />
          
          <Button asChild>
            <label htmlFor="photo-upload" className="cursor-pointer">
              Browse Files
            </label>
          </Button>
        </div>
      </div>
      
      {photos.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium mb-3">Uploaded Photos:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden border border-gray-200">
                <div className="h-48">
                  <img 
                    src={photo.url}
                    alt={`Uploaded ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white"
                    onClick={() => removePhoto(index)}
                  >
                    <X size={16} className="text-red-500" />
                  </button>
                </div>
                <div className="p-3">
                  <Input
                    placeholder="Where was this taken?"
                    value={photo.caption}
                    onChange={(e) => updateCaption(index, e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoUploadStep;
