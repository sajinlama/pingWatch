import React from 'react';
import QRCode from 'react-qr-code';

interface TelegramQRCodeProps {
  deepLink: string;
  size?: number;
}

export const TelegramQRCode: React.FC<TelegramQRCodeProps> = ({ deepLink, size = 160 }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="p-3 bg-white rounded-xl shadow-lg border border-[#22252B] flex items-center justify-center">
        <QRCode
          value={deepLink}
          size={size}
          viewBox={`0 0 ${size} ${size}`}
          level="M"
        />
      </div>
      <a
        href={deepLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 text-[11px] font-mono text-[#0088CC] hover:underline flex items-center gap-1.5"
      >
        <span>Open directly in Telegram</span>
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  );
};