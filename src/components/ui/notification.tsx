import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Loader2 } from 'lucide-react';

interface NotificationProps {
  isOpen: boolean;
  status: 'success' | 'error' | 'loading';
  message: string;
  onClose: () => void;
}

export const Notification = ({ isOpen, status, message, onClose }: NotificationProps) => {
  const bgColor = {
    success: 'bg-green-50 dark:bg-green-900/20',
    error: 'bg-red-50 dark:bg-red-900/20',
    loading: 'bg-blue-50 dark:bg-blue-900/20'
  }[status];

  const borderColor = {
    success: 'border-green-500/20',
    error: 'border-red-500/20',
    loading: 'border-blue-500/20'
  }[status];

  const iconColor = {
    success: 'text-green-500',
    error: 'text-red-500',
    loading: 'text-blue-500'
  }[status];

  const Icon = {
    success: Check,
    error: X,
    loading: Loader2
  }[status];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 25
            }}
            className={`
              ${bgColor}
              ${borderColor}
              pointer-events-auto
              rounded-xl
              border
              shadow-lg
              backdrop-blur-sm
              p-6
              flex
              items-center
              gap-4
              min-w-[320px]
              max-w-md
            `}
          >
            <div className={`${iconColor} rounded-full p-1`}>
              {status === 'loading' ? (
                <Icon className="h-6 w-6 animate-spin" />
              ) : (
                <Icon className="h-6 w-6" />
              )}
            </div>
            
            <p className="flex-1 text-sm font-medium text-gray-900 dark:text-gray-100">
              {message}
            </p>

            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Notification;