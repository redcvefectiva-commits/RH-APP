import React, { SVGProps } from 'react';

export const IconBase: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  />
);

export const HomeIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></IconBase>
);
export const ClipboardListIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></IconBase>
);
export const ClockIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></IconBase>
);
export const BriefcaseIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></IconBase>
);
export const UsersIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a4 4 0 110-5.292M12 4.354a4 4 0 010 5.292" /></IconBase>
);
export const CalendarIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></IconBase>
);
export const UserAddIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></IconBase>
);
export const ChartBarIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></IconBase>
);
export const DocumentTextIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></IconBase>
);
export const CheckCircleIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></IconBase>
);
// FIX: Completed the SVG path for PencilAltIcon.
export const PencilAltIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></IconBase>
);

// FIX: Added all missing icons to fix import errors across the application.
export const FolderIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></IconBase>
);
export const ArchiveIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></IconBase>
);
export const ShieldCheckIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 0118-8.944c0 4.962-3.58 9.1-8.382 10.944A11.955 11.955 0 0112 2.944a11.955 11.955 0 018.618 3.04z" /></IconBase>
);
export const InformationCircleIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></IconBase>
);
export const LibraryIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></IconBase>
);
export const RefreshIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 4a14.95 14.95 0 0114.65 11.35M20 20a14.95 14.95 0 01-14.65-11.35" /></IconBase>
);
export const CogIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066 2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></IconBase>
);
export const ChatAltIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></IconBase>
);
export const XIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></IconBase>
);
export const MenuIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></IconBase>
);
export const BellIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></IconBase>
);
export const PlusIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></IconBase>
);
export const SparklesIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414L11 3a1 1 0 011.414 0z" /></IconBase>
);
export const DownloadIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></IconBase>
);
export const PauseIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6" /></IconBase>
);
export const PlayIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></IconBase>
);
export const TrashIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></IconBase>
);
export const SearchIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></IconBase>
);
export const PaperClipIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></IconBase>
);
export const PhotographIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></IconBase>
);
export const VideoCameraIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></IconBase>
);
export const DotsVerticalIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></IconBase>
);
export const GiftIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V6a2 2 0 00-2 2h2zm0 13l-4-4h8l-4 4zm0 0V9" /></IconBase>
);
export const SitemapIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3h-2v7H5v2h6v7h2v-7h6v-2h-6z" /></IconBase>
);