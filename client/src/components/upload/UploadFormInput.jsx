import React, { forwardRef } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Loader2, UploadCloud } from 'lucide-react';
import { cn } from '../../utils/utils';

const UploadFormInput = forwardRef(
  ({ onSubmit, isLoading, onFileChange, selectedFile }, ref) => {
    return (
      <form
        ref={ref}
        className="flex flex-col gap-6 w-full"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full bg-white p-3 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex-1 w-full">
            <Input
              type="file"
              name="file"
              id="file"
              accept="application/pdf"
              required
              onChange={onFileChange}
              className={cn(
                'cursor-pointer border-dashed border-2 border-rose-200 hover:border-rose-400 py-2 h-auto text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100',
                isLoading && 'opacity-50 cursor-not-allowed'
              )}
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || !selectedFile}
            className="w-full sm:w-auto bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white rounded-full px-6 py-2.5 shrink-0 shadow-md transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <UploadCloud className="w-4 h-4 mr-2" />
                <span>Upload your PDF</span>
              </>
            )}
          </Button>
        </div>
      </form>
    );
  }
);

UploadFormInput.displayName = 'UploadFormInput';

export default UploadFormInput;
