import React, { useState, useRef, useEffect } from 'react';
import { 
  Video, 
  Camera, 
  UploadCloud, 
  X, 
  Play, 
  Square, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Film
} from 'lucide-react';

export interface RFQAttachment {
  id: string;
  name: string;
  type: 'image' | 'video';
  sizeFormatted: string;
  previewUrl: string;
  file?: File | Blob;
}

interface Props {
  attachments: RFQAttachment[];
  onChange: (attachments: RFQAttachment[]) => void;
  maxFiles?: number;
}

const VideoPhotoRFQ: React.FC<Props> = ({ attachments, onChange, maxFiles = 5 }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [recordTimeLeft, setRecordTimeLeft] = useState(30);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      stopCameraStream();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFiles = (incomingFiles: FileList | File[]) => {
    const list = Array.from(incomingFiles);
    const newItems: RFQAttachment[] = [];

    list.forEach((file) => {
      if (attachments.length + newItems.length >= maxFiles) return;

      const isVideo = file.type.startsWith('video/');
      const isImage = file.type.startsWith('image/');

      if (!isVideo && !isImage) return;

      const previewUrl = URL.createObjectURL(file);
      newItems.push({
        id: `att-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name: file.name,
        type: isVideo ? 'video' : 'image',
        sizeFormatted: formatFileSize(file.size),
        previewUrl,
        file
      });
    });

    if (newItems.length > 0) {
      onChange([...attachments, ...newItems]);
    }
  };

  const removeAttachment = (id: string) => {
    const target = attachments.find((a) => a.id === id);
    if (target?.previewUrl) {
      try {
        URL.revokeObjectURL(target.previewUrl);
      } catch (e) {
        // ignore
      }
    }
    onChange(attachments.filter((a) => a.id !== id));
  };

  const startCameraStream = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported by your browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: true
      });

      mediaStreamRef.current = stream;
      setIsCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError(err.message || 'Unable to access camera. Please allow permission or upload a video file instead.');
      setIsCameraActive(false);
    }
  };

  const stopCameraStream = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    setIsCameraActive(false);
    setIsRecording(false);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  };

  const startRecording = () => {
    if (!mediaStreamRef.current) return;

    recordedChunksRef.current = [];
    try {
      const mimeTypes = ['video/webm;codecs=vp9,opus', 'video/webm', 'video/mp4'];
      const supportedMime = mimeTypes.find(type => MediaRecorder.isTypeSupported(type)) || '';
      
      const options = supportedMime ? { mimeType: supportedMime } : undefined;
      const mediaRecorder = new MediaRecorder(mediaStreamRef.current, options);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: supportedMime || 'video/webm' });
        const previewUrl = URL.createObjectURL(blob);
        setRecordedVideoUrl(previewUrl);
      };

      mediaRecorder.start(250);
      setIsRecording(true);
      setRecordTimeLeft(30);

      timerIntervalRef.current = window.setInterval(() => {
        setRecordTimeLeft((prev) => {
          if (prev <= 1) {
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (e: any) {
      setCameraError('Recording failed: ' + e.message);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  };

  const keepRecordedVideo = () => {
    if (!recordedVideoUrl) return;
    const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
    const newAttachment: RFQAttachment = {
      id: `att-rec-${Date.now()}`,
      name: `Sample-Reference-Clip-${new Date().toISOString().slice(0, 10)}.webm`,
      type: 'video',
      sizeFormatted: formatFileSize(blob.size),
      previewUrl: recordedVideoUrl,
      file: blob
    };

    onChange([...attachments, newAttachment]);
    setRecordedVideoUrl(null);
    stopCameraStream();
  };

  const retakeVideo = () => {
    if (recordedVideoUrl) {
      URL.revokeObjectURL(recordedVideoUrl);
      setRecordedVideoUrl(null);
    }
    startCameraStream();
  };

  const cancelRecordingMode = () => {
    if (recordedVideoUrl) {
      URL.revokeObjectURL(recordedVideoUrl);
      setRecordedVideoUrl(null);
    }
    stopCameraStream();
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200/80 p-6 md:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0d7377]"></span>
            <h3 className="text-sm md:text-base font-black text-[#1e3a5f] uppercase tracking-wider">
              Sample Book Video & Photo RFQ
            </h3>
          </div>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Show us your existing fabric swatch book, binding style, or fabric layout for an exact match.
          </p>
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-gray-100 text-gray-600 rounded-full shrink-0 self-start sm:self-auto">
          {attachments.length} / {maxFiles} Files Attached
        </span>
      </div>

      {/* Camera Recording Viewfinder / Preview */}
      {isCameraActive || recordedVideoUrl ? (
        <div className="bg-gray-900 rounded-2xl p-4 text-white space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-ping' : 'bg-yellow-400'}`}></span>
              <span className="text-xs font-black uppercase tracking-wider">
                {isRecording ? `Recording Sample Reference (${recordTimeLeft}s left)` : recordedVideoUrl ? 'Preview Recorded Clip' : 'Ready to Record (Max 30s)'}
              </span>
            </div>
            <button
              onClick={cancelRecordingMode}
              className="text-gray-400 hover:text-white text-xs font-bold uppercase tracking-widest"
            >
              Cancel
            </button>
          </div>

          <div className="relative aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center">
            {recordedVideoUrl ? (
              <video
                src={recordedVideoUrl}
                controls
                className="w-full h-full object-contain"
                autoPlay
                playsInline
              />
            ) : (
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                muted
                playsInline
              />
            )}

            {isRecording && (
              <div className="absolute top-4 right-4 bg-red-600/90 text-white font-mono text-xs font-black px-3 py-1 rounded-full shadow-lg">
                00:{recordTimeLeft < 10 ? `0${recordTimeLeft}` : recordTimeLeft}
              </div>
            )}
          </div>

          {/* Recorder Controls */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {!recordedVideoUrl ? (
              <>
                {!isRecording ? (
                  <button
                    type="button"
                    onClick={startRecording}
                    className="bg-red-600 hover:bg-red-700 text-white font-black px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg transition-transform active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-white" /> Start 30s Recording
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={stopRecording}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-black px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg transition-transform active:scale-95"
                  >
                    <Square className="w-4 h-4 fill-white" /> Stop Recording
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={keepRecordedVideo}
                  className="bg-[#25D366] hover:bg-[#20ba59] text-white font-black px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg transition-transform active:scale-95"
                >
                  <CheckCircle className="w-4 h-4" /> Attach Clip to RFQ
                </button>
                <button
                  type="button"
                  onClick={retakeVideo}
                  className="bg-white/10 hover:bg-white/20 text-white font-black px-4 py-2.5 rounded-xl text-xs uppercase tracking-widest flex items-center gap-2 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" /> Retake
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        /* Drag & Drop Zone + Action Buttons */
        <div className="space-y-4">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files) {
                handleFiles(e.dataTransfer.files);
              }
            }}
            className={`border-2 border-dashed rounded-2xl p-6 md:p-8 text-center transition-all ${
              isDragging
                ? 'border-[#0d7377] bg-[#0d7377]/5 scale-[0.99]'
                : 'border-gray-200 bg-gray-50/70 hover:bg-gray-50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files) handleFiles(e.target.files);
              }}
            />

            <div className="max-w-md mx-auto space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[#0d7377]">
                <UploadCloud className="w-7 h-7" />
              </div>

              <div>
                <p className="text-sm font-bold text-[#1e3a5f]">
                  Drag & drop reference photos or short video clips here
                </p>
                <p className="text-[11px] text-gray-500 font-medium mt-1">
                  Supports MP4, MOV, WEBM, JPG, PNG, WEBP (Max 5 files, 50MB total)
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-[#1e3a5f] hover:bg-[#0d7377] text-white font-black text-[11px] uppercase tracking-widest px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" /> Browse Files
                </button>

                <button
                  type="button"
                  onClick={startCameraStream}
                  className="bg-white border-2 border-[#8B6F47] text-[#8B6F47] hover:bg-[#8B6F47] hover:text-white font-black text-[11px] uppercase tracking-widest px-5 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-2"
                >
                  <Video className="w-4 h-4" /> Record 30s Video
                </button>
              </div>
            </div>
          </div>

          {cameraError && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{cameraError}</span>
            </div>
          )}
        </div>
      )}

      {/* Attachment Previews */}
      {attachments.length > 0 && (
        <div className="space-y-3 pt-2">
          <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">Attached References</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {attachments.map((att) => (
              <div
                key={att.id}
                className="group relative bg-white border border-gray-200 rounded-2xl p-2.5 shadow-sm hover:shadow-md transition-all flex items-center gap-3 overflow-hidden"
              >
                <div className="w-14 h-14 rounded-xl bg-gray-100 shrink-0 overflow-hidden relative flex items-center justify-center">
                  {att.type === 'image' ? (
                    <img src={att.previewUrl} alt={att.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#1e3a5f] flex flex-col items-center justify-center text-white">
                      <Film className="w-5 h-5 text-[#8B6F47]" />
                      <span className="text-[8px] font-bold uppercase mt-0.5">Video</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 pr-6">
                  <p className="text-xs font-bold text-[#1e3a5f] truncate">{att.name}</p>
                  <p className="text-[10px] text-gray-400 font-semibold">{att.sizeFormatted} • {att.type}</p>
                </div>

                <button
                  type="button"
                  onClick={() => removeAttachment(att.id)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-400 flex items-center justify-center transition-colors"
                  aria-label="Remove attachment"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPhotoRFQ;
