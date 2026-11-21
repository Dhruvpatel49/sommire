import React from 'react';
import { FileText, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-white/50 backdrop-blur-sm mt-auto py-8">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-rose-500" />
          <span className="font-bold text-gray-800">Sommaire</span>
          <span>© {new Date().getFullYear()} All rights reserved.</span>
        </div>

        <div className="flex items-center gap-1.5 text-gray-500">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline" />
          <span>for students, researchers & professionals.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
