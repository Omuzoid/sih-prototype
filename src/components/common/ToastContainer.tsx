import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useLM } from '../../context/LMContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useLM();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 space-y-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />,
          info: <Info className="w-5 h-5 text-blue-400 flex-shrink-0" />
        };

        const bgColors = {
          success: 'bg-slate-900 border-emerald-500/50 text-white',
          error: 'bg-slate-900 border-red-500/50 text-white',
          warning: 'bg-slate-900 border-amber-500/50 text-white',
          info: 'bg-slate-900 border-blue-500/50 text-white'
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-lg border shadow-xl flex items-start space-x-3 transition-all animate-in slide-in-from-bottom duration-300 ${bgColors[toast.type]}`}
          >
            {icons[toast.type]}
            <div className="flex-1 text-xs">
              <div className="font-heading font-bold text-white text-sm">{toast.title}</div>
              <div className="text-slate-300 mt-0.5 leading-normal">{toast.message}</div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
