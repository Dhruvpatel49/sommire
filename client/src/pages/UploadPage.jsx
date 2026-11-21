import React from 'react';
import BgGradient from '../components/common/BgGradient';
import UploadHeader from '../components/upload/UploadHeader';
import UploadForm from '../components/upload/UploadForm';

const UploadPage = () => {
  return (
    <section className="relative min-h-[85vh] py-16 sm:py-24">
      <BgGradient />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <UploadHeader />
          <UploadForm />
        </div>
      </div>
    </section>
  );
};

export default UploadPage;
