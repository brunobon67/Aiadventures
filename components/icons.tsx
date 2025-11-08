import React from 'react';

type IconProps = {
  className?: string;
};

export const PaperAirplaneIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
);

export const RocketLaunchIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a14.953 14.953 0 00-2.582-7.772M12 20.25a14.953 14.953 0 00-2.582-7.772M12 20.25v-4.82m0 0a14.923 14.923 0 01-3.183-2.571M12 15.43m0-4.82l-3.182-2.571m0 0a14.923 14.923 0 01-2.582-7.772M3.183 8.031a14.923 14.923 0 012.582-7.772m0 0a14.923 14.923 0 01-2.582 7.772M3.183 8.031l2.582 7.772m0 0a14.923 14.923 0 013.183-2.571m0 0l-2.582-7.772m0 0a14.953 14.953 0 00-2.582 7.772M12 20.25a14.953 14.953 0 002.582-7.772m0 0a14.953 14.953 0 003.183 2.571M14.57 12.63a14.953 14.953 0 002.582 7.772m0 0a14.953 14.953 0 002.582-7.772m0 0a14.953 14.953 0 00-2.582-7.772m-5.164 0a14.953 14.953 0 00-2.582 7.772M12 3.75a14.953 14.953 0 00-3.183 2.571m3.183-2.571a14.953 14.953 0 013.183 2.571m0 0a14.953 14.953 0 012.582 7.772M12 3.75a14.953 14.953 0 01-2.582 7.772m0 0a14.953 14.953 0 012.582 7.772" />
    </svg>
);

export const MapPinIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18" />
  </svg>
);

export const RunningIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10 1a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V1.75A.75.75 0 0110 1zM5.05 3.95a.75.75 0 011.06 0l1.062 1.06a.75.75 0 01-1.06 1.06L5.05 5.01A.75.75 0 015.05 3.95zm10.957 1.06a.75.75 0 10-1.06-1.06L13.885 5.01a.75.75 0 001.06 1.06l1.06-1.06zM1.75 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 011.75 10zm14.5 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM8.073 8.073a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06l-4.5-4.5a.75.75 0 010-1.06z" clipRule="evenodd" />
    </svg>
);

export const PriceTagIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182.553-.44 1.278-.659 2.003-.659.725 0 1.45.22 2.003.659l.879.659" />
  </svg>
);

export const LightbulbIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311a14.994 14.994 0 01-7.5 0C3.373 20.311 2.25 17.5 2.25 14.25c0-4.602 3.203-8.59 7.5-9.662V3.75a1.5 1.5 0 013 0v.838c4.297 1.072 7.5 5.06 7.5 9.662 0 3.25-1.123 6.061-2.998 8.05z" />
    </svg>
);

export const SunIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
);

export const TransitIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 013.375-3.375h9.75a3.375 3.375 0 013.375 3.375v1.875m-17.25 4.5h-2.25m15 0h2.25m-5.25-6H12m0 0v-5.25m0 5.25h5.25" />
    </svg>
);

export const FoodIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM4.032 4.28a.75.75 0 011.06-1.06l1.094 1.093a.75.75 0 11-1.06 1.06L4.032 4.28zm10.876 0l1.094-1.094a.75.75 0 111.06 1.06l-1.094 1.094a.75.75 0 11-1.06-1.06z" />
    <path fillRule="evenodd" d="M2 9a8 8 0 1116 0c0 2.28-.908 4.368-2.395 5.856l-1.04-1.04A6.5 6.5 0 0016.5 9c0-3.584-2.916-6.5-6.5-6.5S3.5 5.416 3.5 9a6.5 6.5 0 001.056 3.633l-1.23 1.23A8.026 8.026 0 012 9zm2 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
  </svg>
);

export const LandmarkIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M1 6.5a.5.5 0 01.5-.5h2.5a.5.5 0 010 1H2v10.5a.5.5 0 01-1 0V6.5zM5 6.5a.5.5 0 01.5-.5h2.5a.5.5 0 010 1H6v10.5a.5.5 0 01-1 0V6.5zM9 6.5a.5.5 0 01.5-.5h2.5a.5.5 0 010 1H10v10.5a.5.5 0 01-1 0V6.5zM15.5 6a.5.5 0 00-.5.5v10.5a.5.5 0 001 0V6.5a.5.5 0 00-.5-.5z" clipRule="evenodd" />
        <path d="M17 2.5a.5.5 0 000-1H3a.5.5 0 000 1h14zM18.5 4a.5.5 0 01.5.5v13a.5.5 0 01-1 0V5a.5.5 0 01.5-.5zM2 18.5a.5.5 0 01.5-.5h15a.5.5 0 010 1H2.5a.5.5 0 01-.5-.5z" />
    </svg>
);

export const LeafIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path d="M15.404 4.596a.75.75 0 01-.153 1.052l-5.385 4.308a.75.75 0 00-.38 1.014l1.458 3.645a.75.75 0 01-1.25.5l-1.458-3.645a2.25 2.25 0 011.14-3.042l5.385-4.308a.75.75 0 011.203-.154z" />
        <path d="M12.03 8.12a.75.75 0 01-1.203.154l-5.385-4.308a.75.75 0 01.153-1.052l5.385 4.308a2.25 2.25 0 01-1.14 3.042l-1.458 3.645a.75.75 0 11-1.25-.5l1.458-3.645a.75.75 0 00.38-1.014L3.13 6.958a.75.75 0 011.203-.154L12.03 8.12z" />
    </svg>
);

export const ShoppingBagIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V8a1 1 0 00-1-1h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4z" clipRule="evenodd" />
    </svg>
);

export const UnknownIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path d="M6.5 9a.5.5 0 01.5-.5h6a.5.5 0 010 1H7a.5.5 0 01-.5-.5z" />
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM2 10a8 8 0 1116 0A8 8 0 012 10z" clipRule="evenodd" />
    </svg>
);

export const PrintIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M5 2.5a.5.5 0 01.5-.5h9a.5.5 0 01.5.5v2.5a.5.5 0 01-1 0V3H6v2a.5.5 0 01-1 0V2.5z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M5 6.5A1.5 1.5 0 003.5 8v6.5A1.5 1.5 0 005 16h10a1.5 1.5 0 001.5-1.5V8A1.5 1.5 0 0015 6.5h-1a.5.5 0 010-1h1A2.5 2.5 0 0117.5 8v6.5A2.5 2.5 0 0115 17H5a2.5 2.5 0 01-2.5-2.5V8A2.5 2.5 0 015 5.5h1a.5.5 0 010 1h-1z" clipRule="evenodd" />
        <path d="M7 10.25a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zM7 12.25a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z" />
    </svg>
);

export const DownloadIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
        <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
    </svg>
);

export const UserIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);

export const BookmarkIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.5 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
    </svg>
);

export const LoginIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
    </svg>
);
  
export const LogoutIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m-3 0l-3-3m0 0l3-3m-3 3H9" />
    </svg>
);


export const HistoryIcon: React.FC<IconProps> = LandmarkIcon;
export const ArtIcon: React.FC<IconProps> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path d="M1 1.75A.75.75 0 011.75 1h16.5a.75.75 0 01.75.75v16.5a.75.75 0 01-.75.75H1.75a.75.75 0 01-.75-.75V1.75zM2.5 2.5v15h15V2.5h-15z" />
        <path d="M5.023 7.923a.75.75 0 011.06 0l1.25 1.25a.75.75 0 01-1.06 1.06l-1.25-1.25a.75.75 0 010-1.06zM6.25 12a.75.75 0 00-1.06 1.06l.22.22H11.5a.75.75 0 000-1.5H5.41l.84-.84a.75.75 0 10-1.06-1.06l-1.75 1.75a.75.75 0 000 1.06l1.75 1.75a.75.75 0 101.06-1.06L5.41 13.5H11.5a2.25 2.25 0 012.25 2.25v.25a.75.75 0 001.5 0v-.25A3.75 3.75 0 0011.5 12h-5.25z" />
    </svg>
);
export const NightlifeIcon: React.FC<IconProps> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path d="M10 3.75a.75.75 0 01.75.75v3.44l3.03 3.03a.75.75 0 01-1.06 1.06l-2.72-2.72V15a.75.75 0 01-1.5 0V9.25l-2.72 2.72a.75.75 0 01-1.06-1.06l3.03-3.03V4.5a.75.75 0 01.75-.75z" />
        <path d="M5.25 2.5a.75.75 0 000 1.5h9.5a.75.75 0 000-1.5h-9.5z" />
    </svg>
);
export const RelaxationIcon: React.FC<IconProps> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path d="M5.5 4.5a3.5 3.5 0 016.794 1.576 4.5 4.5 0 015.412 5.163 3.5 3.5 0 01-6.794-1.576 4.5 4.5 0 01-5.412-5.163zM10.153 1.153a.75.75 0 01-.48 1.341A5.922 5.922 0 006.33 8.41a.75.75 0 01-1.28.749 7.422 7.422 0 014.195-7.854.75.75 0 01.908-.152z" />
        <path d="M14.5 15.5a3.5 3.5 0 01-6.794-1.576 4.5 4.5 0 01-5.412-5.163 3.5 3.5 0 016.794 1.576 4.5 4.5 0 015.412 5.163zM9.847 18.847a.75.75 0 01.48-1.341 5.922 5.922 0 003.343-5.916.75.75 0 111.28-.749 7.422 7.422 0 01-4.195 7.854.75.75 0 01-.908.152z" />
    </svg>
);
export const ArchitectureIcon: React.FC<IconProps> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M9.25 3.25a.75.75 0 01.75.75v12a.75.75 0 01-1.5 0V4a.75.75 0 01.75-.75z" clipRule="evenodd" />
        <path d="M3.23 8.23a.75.75 0 011.06 0l5.25 5.25a.75.75 0 01-1.06 1.06L3.23 9.29a.75.75 0 010-1.06z" />
        <path d="M15.77 8.23a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06l5.25-5.25a.75.75 0 011.06 0z" />
    </svg>
);
export const FamilyIcon: React.FC<IconProps> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path d="M8.889 12.03a.75.75 0 01.332-1.425 2.991 2.991 0 002.557 0 .75.75 0 11.332 1.425 4.49 4.49 0 01-3.221 0z" />
        <path fillRule="evenodd" d="M12.5 11.25a.75.75 0 01.75-.75h.01a.75.75 0 010 1.5h-.01a.75.75 0 01-.75-.75zM11 12.5a.75.75 0 00-1.5 0v.01a.75.75 0 001.5 0v-.01zM10 10.25a.75.75 0 01.75-.75h.01a.75.75 0 010 1.5h-.01a.75.75 0 01-.75-.75zM8.5 11.25a.75.75 0 01.75-.75h.01a.75.75 0 010 1.5h-.01a.75.75 0 01-.75-.75zM7.5 10a.75.75 0 00-1.5 0v.01a.75.75 0 001.5 0V10zM5.5 11.25a.75.75 0 01.75-.75h.01a.75.75 0 010 1.5h-.01a.75.75 0 01-.75-.75z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M9.91 4.512a.75.75 0 01.837.24l.245.378a.75.75 0 01-.96.345l-.29-.129a3 3 0 00-2.628 0l-.29.129a.75.75 0 11-.615-1.285l.245-.378a2.25 2.25 0 012.21-1.107z" clipRule="evenodd" />
        <path d="M12.94 1.833a2.25 2.25 0 013.344 2.112l-.245.378a.75.75 0 11-1.285-.615l.29-.129a.75.75 0 00-.657 0l-.29.129a.75.75 0 01-.96-.345l.245-.378a.75.75 0 01.558-.553z" />
        <path d="M7.06 1.833A2.25 2.25 0 003.716 3.945l.245.378a.75.75 0 101.285-.615l-.29-.129a.75.75 0 01.657 0l.29.129a.75.75 0 00.96-.345L7.62 2.386a.75.75 0 00-.558-.553z" />
        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM2 10a8 8 0 1116 0 8 8 0 01-16 0z" />
    </svg>
);
export const TechIcon: React.FC<IconProps> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M11.25 2.25a.75.75 0 00-1.5 0v1.51a4.52 4.52 0 00-1.874.526l-1.06-1.06a.75.75 0 00-1.06 1.06l1.06 1.06a4.52 4.52 0 00-.527 1.874H4.75a.75.75 0 000 1.5h1.51a4.52 4.52 0 00.526 1.874l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06a4.52 4.52 0 001.874.527v1.51a.75.75 0 001.5 0v-1.51a4.52 4.52 0 001.874-.526l1.06 1.06a.75.75 0 001.06-1.06l-1.06-1.06a4.52 4.52 0 00.527-1.874h1.51a.75.75 0 000-1.5h-1.51a4.52 4.52 0 00-.526-1.874l1.06-1.06a.75.75 0 00-1.06-1.06l-1.06 1.06a4.52 4.52 0 00-1.874-.527V2.25zM10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clipRule="evenodd" />
    </svg>
);
