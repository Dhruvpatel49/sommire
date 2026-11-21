import React, { useRef, useState } from 'react';
import UploadFormInput from './UploadFormInput';
import { z } from 'zod';
import { toast } from 'sonner';
import { summaryApi } from '../../api/summaryApi';
import { useNavigate } from 'react-router-dom';

const fileSchema = z.object({
  file: z
    .custom((val) => typeof val === 'object' && val !== null && 'size' in val && 'type' in val, {
      message: 'Please upload a valid PDF file',
    })
    .refine((file) => file.size <= 20 * 1024 * 1024, 'File size must be less than 20MB')
    .refine((file) => file.type === 'application/pdf', 'File must be a PDF document'),
});

const UploadForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error('Please select a PDF file');
      return;
    }

    try {
      setIsLoading(true);

      const validation = fileSchema.safeParse({ file: selectedFile });
      if (!validation.success) {
        const errorMsg =
          validation.error.flatten().fieldErrors.file?.[0] || 'Invalid file';
        toast.error('Validation Error', {
          description: errorMsg,
          icon: '🚨',
        });
        setIsLoading(false);
        return;
      }

      toast('Uploading your PDF...', {
        icon: '🔄',
        description: 'Uploading to secure Cloudinary storage...',
      });

      const formData = new FormData();
      formData.append('file', selectedFile);

      toast('Processing your PDF with AI...', {
        icon: '📃',
        description: 'Hang tight! Google Gemini is analyzing your document...',
      });

      const response = await summaryApi.uploadAndGenerate(formData);

      if (response?.success && response?.data) {
        const savedSummary = response.data;
        toast.success('Summary Generated!', {
          icon: '✅',
          description: 'Your PDF has been successfully summarized and saved.',
        });

        formRef.current?.reset();
        setSelectedFile(null);

        const summaryId = savedSummary.id || savedSummary._id;
        navigate(`/summaries/${summaryId}`);
      } else {
        throw new Error(response?.message || 'Failed to generate summary');
      }
    } catch (error) {
      console.error('Error during upload & summarization:', error);
      toast.error('Something went wrong', {
        description: error.message || 'Failed to process PDF. Please check server and try again.',
        icon: '🚨',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto">
      <UploadFormInput
        ref={formRef}
        isLoading={isLoading}
        selectedFile={selectedFile}
        onFileChange={handleFileChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UploadForm;
