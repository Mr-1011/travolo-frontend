
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';

type PhotoUploadProps = {
  photos: string[];
  onPhotoUpload: (photos: string[]) => void;
};

const PhotoUpload: React.FC<PhotoUploadProps> = ({ photos, onPhotoUpload }) => {
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
      file.type === 'image/jpeg' || file.type === 'image/png'
    ).slice(0, 3); // Limit to 3 photos
    
    if (validFiles.length === 0) return;
    
    const newPhotos = [...photos];
    
    validFiles.forEach(file => {
      if (newPhotos.length < 3) { // Ensure we don't exceed 3 photos
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newPhotos.push(e.target.result as string);
            if (validFiles[validFiles.length - 1] === file) {
              onPhotoUpload([...newPhotos]);
            }
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };
  
  const removePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    onPhotoUpload(newPhotos);
  };
  
  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-2">Share photos from a vacation you loved</h3>
      <p className="text-gray-600 mb-6">
        Upload 1–3 photos to help us understand your preferences better.
        This step is optional but gives the most personalized recommendations.
      </p>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? 'border-travel-teal bg-travel-teal/5' : 'border-gray-300'
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
            accept="image/jpeg, image/png"
            multiple
            id="photo-upload"
            className="hidden"
            onChange={handleFileInput}
            disabled={photos.length >= 3}
          />
          
          <Button 
            asChild
            className={photos.length >= 3 ? "opacity-50 cursor-not-allowed" : ""}
            disabled={photos.length >= 3}
          >
            <label htmlFor="photo-upload" className="cursor-pointer">
              Browse Files
            </label>
          </Button>
          
          {photos.length >= 3 && (
            <p className="mt-2 text-amber-600 text-sm">Maximum 3 photos allowed.</p>
          )}
        </div>
      </div>
      
      {photos.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium mb-3">Uploaded Photos ({photos.length}/3):</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden h-48">
                <img 
                  src={photo}
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
