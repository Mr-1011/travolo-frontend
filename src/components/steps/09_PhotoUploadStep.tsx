import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X } from 'lucide-react';
import { analyzeImagePreferences } from '@/services/preferenceService';
import { Loader2 } from 'lucide-react';

// Expected return type from the analysis service
type AnalysisResult = {
  adjustmentSuccessful: boolean;
};

// Type for a single photo object in the component state
type Photo = {
  file: File;
  url: string;
};

type PhotoUploadStepProps = {
  onAnalysisComplete: (analysis: { photoCount: number; adjustmentSuccessful: boolean }) => void;
  onPhotoAdded: () => void;
  currentThemePreferences: Record<string, number>;
};

const PhotoUploadStep: React.FC<PhotoUploadStepProps> = ({ onAnalysisComplete, onPhotoAdded, currentThemePreferences }) => {
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
          onPhotoAdded();
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
      // Call the service function, passing the theme preferences
      const result: unknown = await analyzeImagePreferences(
        filesToUpload,
        currentThemePreferences
      );
      console.log('Backend Analysis Result:', result);

      // Safely determine success status
      let success = false;
      if (
        typeof result === 'object' &&
        result !== null &&
        'adjustmentSuccessful' in result &&
        typeof result.adjustmentSuccessful === 'boolean'
      ) {
        success = result.adjustmentSuccessful;
      }

      // Call the callback prop with the analysis summary
      onAnalysisComplete({
        photoCount: photos.length,
        adjustmentSuccessful: success // Use the safely determined value
      });

      // Update UI based on success
      if (success) {
        setUploadStatus('Analysis complete! Your preferences have been updated based on the photos.');
      } else {
        setUploadStatus('Analysis complete, but preferences could not be automatically updated.');
      }

    } catch (error) {
      console.error('Upload or analysis failed:', error);
      setUploadStatus(`Error: ${error instanceof Error ? error.message : 'Upload failed'}`);
      onAnalysisComplete({
        photoCount: photos.length,
        adjustmentSuccessful: false
      });
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
        className={`relative border-2 border-dashed rounded-lg p-8 text-center ${isDragging ? 'border-[#3c83f6] bg-[#3c83f6]/5' : 'border-gray-300'
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/jpeg, image/png, image/webp"
          multiple
          id="photo-upload"
          className="hidden"
          onChange={handleFileInput}
          disabled={isUploading || photos.length >= 3}
        />

        {/* Loading Overlay */}
        {isUploading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10 rounded-lg">
            <Loader2 className="h-12 w-12 animate-spin text-[#3c83f6]" />
          </div>
        )}

        {photos.length === 0 ? (
          // Initial State: Empty Dropzone
          <div className="flex flex-col items-center">
            <Upload size={40} className="text-gray-400 mb-2" />
            <p className="text-lg font-medium mb-1">Drag and drop your photos here</p>
            <p className="text-sm text-gray-500 mb-4">or click to browse files</p>
            <Button asChild>
              <label htmlFor="photo-upload" className="cursor-pointer">
                Browse Files
              </label>
            </Button>
            <p className="text-xs text-gray-400 mt-2">Max 3 photos (JPG, PNG, WEBP)</p>
          </div>
        ) : (
          // State with Uploaded Photos
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-left">Uploaded Photos ({photos.length}/3):</h4>
              {photos.length < 3 && (
                <Button asChild variant="outline" size="sm" className="absolute top-4 right-4">
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    Add more
                  </label>
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {photos.map((photo, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden border border-gray-200 aspect-square">
                  <img
                    src={photo.url}
                    alt={`Uploaded ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 hover:bg-black/70 disabled:opacity-50"
                    onClick={() => removePhoto(index)}
                    disabled={isUploading}
                    aria-label={`Remove photo ${index + 1}`}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              {/* Optional: Placeholder for adding more via drag/drop directly */}
              {photos.length < 3 && (
                <label
                  htmlFor="photo-upload"
                  className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg aspect-square text-gray-400 hover:border-gray-400 hover:text-gray-500 cursor-pointer"
                >
                  <Upload size={24} />
                  <span className="text-xs mt-1 text-center">Add more</span>
                </label>
              )}
            </div>
          </div>
        )}
      </div>

      {uploadStatus && (
        <p className={`mt-4 text-sm ${uploadStatus.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>
          {uploadStatus}
        </p>
      )}

      {photos.length > 0 && (
        <div className="mt-6 text-center">
          <Button
            onClick={handleUpload}
            disabled={isUploading || photos.length === 0}
          >
            {isUploading ? 'Analyzing...' : 'Analyze Photos'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PhotoUploadStep;
