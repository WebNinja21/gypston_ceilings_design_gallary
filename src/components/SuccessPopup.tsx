import React from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { Clock } from 'lucide-react';

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessPopup: React.FC<SuccessPopupProps> = ({ isOpen, onClose }) => {
  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000); // Auto close after 4 seconds
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto text-center">
        <div className="flex flex-col items-center space-y-6 py-8">
          {/* Enhanced Animated Clock with GIF-like effect */}
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center animate-pulse">
              <Clock className="w-12 h-12 text-white animate-spin" style={{
                animation: 'spin 2s linear infinite'
              }} />
            </div>
            {/* Multiple rotating rings for GIF-like effect */}
            <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-spin" style={{
              animation: 'spin 3s linear infinite'
            }}></div>
            <div className="absolute inset-2 rounded-full border-2 border-purple-300 animate-spin" style={{
              animation: 'spin 2s linear infinite reverse'
            }}></div>
            <div className="absolute inset-4 rounded-full border border-blue-400 animate-spin" style={{
              animation: 'spin 1.5s linear infinite'
            }}></div>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-2xl text-primary animate-bounce">Thank You!</h2>
            <p className="text-lg text-muted-foreground">
              We will reach you as soon as possible within 24 hours
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-blue-50 px-4 py-2 rounded-full">
            <Clock className="w-4 h-4 animate-pulse" />
            <span>Response Time: Within 24 Hours</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};