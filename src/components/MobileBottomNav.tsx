import React from 'react';
import { Home, ShieldCheck, History, ShieldAlert, Settings } from 'lucide-react';

export type AppPage = 'home' | 'check' | 'history' | 'safety' | 'settings';

interface MobileBottomNavProps {
  currentPage: AppPage;
  onSelectPage: (page: AppPage) => void;
  historyCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  onSelectPage,
  historyCount,
}) => {
  const navItems: { id: AppPage; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'check', label: 'Check', icon: ShieldCheck },
    { id: 'history', label: 'History', icon: History },
    { id: 'safety', label: 'Safety', icon: ShieldAlert },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#D9E2EC] shadow-lg px-2 py-1.5 flex items-center justify-around">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;

        return (
          <button
            key={item.id}
            id={`mobile-bottom-nav-${item.id}`}
            onClick={() => onSelectPage(item.id)}
            className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-2 rounded-xl transition-all cursor-pointer ${
              isActive
                ? 'text-[#2563EB] font-black'
                : 'text-[#667085] hover:text-[#0B1220] font-semibold'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#2563EB]' : 'text-[#667085]'}`} />
              {item.id === 'history' && historyCount > 0 && (
                <span className="absolute -top-1 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-[#2563EB] text-white text-[9px] font-bold flex items-center justify-center">
                  {historyCount}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">{item.label}</span>
            {isActive && (
              <span className="w-1 h-1 rounded-full bg-[#2563EB] mt-0.5" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
