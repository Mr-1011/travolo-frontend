import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X } from 'lucide-react';
import { analyzeImagePreferences } from '@/services/preferenceService';

type Photo = {
  file: File;
  url: string;
};

type PhotoUploadStepProps = {
  // Keep props simple for now, parent will manage state
  // photos: Photo[]; 
  // onPhotoChange: (photos: Photo[]) => void;
};

const PhotoUploadStep: React.FC<PhotoUploadStepProps> = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

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

    const spaceAvailable = 3 - photos.length;
    if (spaceAvailable <= 0) {
      setUploadStatus('You can upload a maximum of 3 photos.');
      return;
    }

    const filesToAdd = validFiles.slice(0, spaceAvailable);
    const newPhotosToProcess = filesToAdd.length;
    let processedCount = 0;
    const currentNewPhotos: Photo[] = [];

    filesToAdd.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          currentNewPhotos.push({
            file: file,
            url: e.target.result as string,
          });
          processedCount++;
          if (processedCount === newPhotosToProcess) {
            setPhotos(prevPhotos => [...prevPhotos, ...currentNewPhotos]);
            setUploadStatus(null);
          }
        }
      };
      reader.onerror = () => {
        console.error("Error reading file:", file.name);
        processedCount++;
        if (processedCount === newPhotosToProcess) {
          setPhotos(prevPhotos => [...prevPhotos, ...currentNewPhotos]);
        }
        setUploadStatus(`Error reading file: ${file.name}`);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
    if (newPhotos.length < 3) setUploadStatus(null);
  };

  const handleUpload = async () => {
    if (photos.length === 0) {
      setUploadStatus('Please upload at least one photo.');
      return;
    }

    setIsUploading(true);
    setUploadStatus('Uploading and analyzing...');

    try {
      const filesToUpload = photos.map(p => p.file);
      const result = await analyzeImagePreferences(filesToUpload);
      console.log('Backend Analysis:', result);
      setUploadStatus('Analysis complete! Preferences updated (simulated).');

    } catch (error) {
      console.error('Upload failed:', error);
      setUploadStatus(`Error: ${error instanceof Error ? error.message : 'Upload failed'}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-2">Upload a Photo from a Past Trip</h2>
      <p className="text-gray-600 mb-6">
        Help us understand your style by sharing a vacation photo you love.
        <br />
        <span className="text-sm">(Optional)</span>
      </p>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${isDragging ? 'border-[#3c83f6] bg-[#3c83f6]/5' : 'border-gray-300'
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
          <p className="text-xs text-gray-400 mt-2">Max 3 photos (JPG, PNG, WEBP)</p>
        </div>
      </div>

      {uploadStatus && (
        <p className={`mt-4 text-sm ${uploadStatus.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>
          {uploadStatus}
        </p>
      )}

      {photos.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium mb-3">Uploaded Photos ({photos.length}/3):</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden border border-gray-200">
                <div className="h-48">
                  <img
                    src={photo.url}
                    alt={`Uploaded ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white disabled:opacity-50"
                    onClick={() => removePhoto(index)}
                    disabled={isUploading}
                  >
                    <X size={16} className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button
              onClick={handleUpload}
              disabled={isUploading || photos.length === 0}
            >
              {isUploading ? 'Analyzing...' : 'Analyze Photos'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoUploadStep;
