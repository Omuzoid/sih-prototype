import React from 'react';
import { Bell, Megaphone } from 'lucide-react';
import { useLM } from '../../context/LMContext';

export const NoticeTicker: React.FC = () => {
  const { language } = useLM();

  return (
    <div className="bg-[#FDFBF7] border-b border-amber-200/60 py-1.5 px-4 text-xs flex items-center space-x-3 overflow-hidden shadow-2xs">
      
      {/* Notice Red Label Badge */}
      <div className="flex-shrink-0 bg-gov-red text-white font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded flex items-center space-x-1 shadow-xs">
        <Bell className="w-3 h-3 text-white animate-bounce" />
        <span>{language === 'hi' ? 'सूचना' : 'NOTICE'}</span>
      </div>

      {/* Ticker Content */}
      <div className="flex-1 overflow-hidden font-medium text-slate-800 text-[11px]">
        <div className="animate-marquee whitespace-nowrap inline-block">
          {language === 'hi' ? (
            <span>
              📢 <strong className="text-gov-navy">अनिवार्य वार्षिक सत्यापन चक्र 2026-27:</strong> सभी वाणिज्यिक वेब्रिज, खुदरा इलेक्ट्रॉनिक तराजू और ईंधन पंपों का सत्यापन निर्धारित अवधि के भीतर होना अनिवार्य है।
            </span>
          ) : (
            <span>
              📢 <strong className="text-gov-navy">Mandatory Annual Verification Cycle 2026–27:</strong> All commercial weighbridges, retail electronic counter scales, and fuel dispensing units must undergo field verification within the prescribed period under Legal Metrology Rules.
            </span>
          )}
        </div>
      </div>

    </div>
  );
};
