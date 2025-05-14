import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X } from 'lucide-react';
import { analyzeImagePreferences } from '@/services/preferenceService';
import { Loader2 } from 'lucide-react';

// Expected return type from the analysis service
type BackendAnalysisResult = {
  imageAnalysis: Record<string, number>;
  imageSummary: string;
};

// Type for the data passed to the onAnalysisComplete callback
type AnalysisCompletePayload = {
  imageCount: number;
  analysisResult: BackendAnalysisResult | null; // Pass the whole analysis object or null on error
  adjustmentSuccessful: boolean;
};

// Type for a single photo object in the component state
type Photo = {
  file: File;
  url: string;
};

type PhotoUploadStepProps = {
  onAnalysisComplete: (payload: AnalysisCompletePayload) => void;
  onPhotoAdded: () => void;
  currentThemePreferences: Record<string, number>;
};

const PhotoUploadStep: React.FC<PhotoUploadStepProps> = ({ onAnalysisComplete, onPhotoAdded, currentThemePreferences }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);

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

    try {
      const filesToUpload = photos.map(p => p.file);
      // Call the service function, passing the theme preferences
      const analysisResult: BackendAnalysisResult = await analyzeImagePreferences(
        filesToUpload,
        currentThemePreferences
      );

      // Call the callback prop with the analysis summary and result object
      onAnalysisComplete({
        imageCount: photos.length,
        analysisResult: analysisResult, // Pass the received analysis
        adjustmentSuccessful: true // Assume success if API call succeeded
      });

      setIsAnalysisComplete(true);

    } catch (error) {
      console.error('Upload or analysis failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Upload or analysis failed';
      setUploadStatus(`Error: ${errorMessage}`);

      // Call the callback with null analysis result and adjustment unsuccessful
      onAnalysisComplete({
        imageCount: photos.length,
        analysisResult: null,
        adjustmentSuccessful: false
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-1">Upload a Travel Photo</h2>
      <p className="text-gray-600 mb-6">
        We'll analyze your photo to learn what you enjoy when traveling
        <br />
        <span className="text-sm text-gray-500">(The photo is processed but never stored)</span>
      </p>
      <div
        className={`relative border-2 border-dashed rounded-lg p-4 text-center ${isDragging ? 'border-[#3c83f6] bg-[#3c83f6]/5' : 'border-gray-300'
          }`}
        onDragOver={!isAnalysisComplete ? handleDragOver : undefined}
        onDragLeave={!isAnalysisComplete ? handleDragLeave : undefined}
        onDrop={!isAnalysisComplete ? handleDrop : undefined}
      >
        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/jpeg, image/png"
          multiple
          id="photo-upload"
          className="hidden"
          onChange={handleFileInput}
          disabled={isUploading || photos.length >= 3 || isAnalysisComplete}
        />

        {/* Loading Overlay */}
        {isUploading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10 rounded-lg">
            <Loader2 className="h-12 w-12 animate-spin text-[#3c83f6]" />
          </div>
        )}

        {photos.length === 0 ? (
          // Initial State: Empty Dropzone
          <div className="flex flex-col items-center py-4">
            <Upload size={40} className="text-gray-400 mb-2" />
            <p className="text-lg font-medium mb-1">Drag and drop your photos here</p>
            <p className="text-sm text-gray-500 mb-4">or click to browse files</p>
            <Button asChild className="bg-[#3c83f6] text-white w-full sm:w-auto">
              <label htmlFor="photo-upload" className="cursor-pointer">
                Browse Files
              </label>
            </Button>
          </div>
        ) : (
          // State with Uploaded Photos
          <div>
            <div className="flex justify-between items-center mb-8">
              <h4 className="font-medium text-left">Uploaded Photos ({photos.length}/3):</h4>
              {photos.length < 3 && !isAnalysisComplete && (
                <Button asChild variant="outline" className="absolute top-4 right-4">
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
                    draggable="false"
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

            </div>
          </div>
        )}

        {uploadStatus && (
          <p className={`mt-4 text-sm ${(uploadStatus.startsWith('Error') || uploadStatus.includes('failed')) ? 'text-red-600' : 'text-green-600'}`}>
            {uploadStatus}
          </p>
        )}

        {photos.length > 0 && (
          <div className="mt-6 text-center">
            <Button
              onClick={handleUpload}
              disabled={isUploading || photos.length === 0 || isAnalysisComplete}
              className="bg-[#3c83f6] text-white w-full sm:w-auto"
            >
              {isAnalysisComplete ? 'Analysis complete' : isUploading ? 'Analyzing...' : 'Analyze my Photos'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoUploadStep;
