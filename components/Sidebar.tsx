
import React, { useState } from 'react';
// FIX: Corrected import paths
import { NavItemType, NavItem, NavGroup } from '../types';
import { navStructure } from '../constants';
import { MenuIcon, XIcon } from './ui/Icons';

interface SidebarProps {
  activeModule: NavItemType;
  setActiveModule: (module: NavItemType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openGroupId, setOpenGroupId] = useState<string | null>('permanencia_gestion');

  const handleGroupClick = (groupId: string) => {
    setOpenGroupId(prev => (prev === groupId ? null : groupId));
  };

  const NavLink: React.FC<{ item: NavItem, isSubItem?: boolean }> = ({ item, isSubItem = false }) => {
    const isActive = activeModule === item.id;
    return (
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setActiveModule(item.id);
          setIsMobileOpen(false);
        }}
        className={`flex items-center p-3 my-1 rounded-lg transition-colors duration-200 ${
          isSubItem ? 'pl-8' : ''
        } ${
          isActive
            ? 'bg-primary text-white shadow-md'
            : 'text-gray-600 hover:bg-orange-100 hover:text-primary'
        }`}
      >
        <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
        <span className="font-medium text-sm">{item.label}</span>
      </a>
    );
  };

  const renderNav = () => (
    <ul>
      {navStructure.map(item => {
        if ('children' in item) { // It's a NavGroup
          const group = item as NavGroup;
          const isOpen = openGroupId === group.id;
          return (
            <li key={group.id} className="my-1">
              <button
                onClick={() => handleGroupClick(group.id)}
                className="w-full flex items-center justify-between p-2 text-left text-xs font-bold uppercase text-gray-400 hover:bg-gray-100 rounded-md"
              >
                <span>{group.label}</span>
                <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {isOpen && (
                <ul className="pl-2 mt-1">
                  {group.children.map(child => (
                    <li key={child.id}>
                      <NavLink item={child} isSubItem />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        } else { // It's a NavItem
          const navItem = item as NavItem;
          return (
            <li key={navItem.id}>
              <NavLink item={navItem} />
            </li>
          );
        }
      })}
    </ul>
  );

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-30">
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-2 bg-white rounded-full shadow-lg">
          {isMobileOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>
      <aside className={`bg-white w-72 min-h-screen flex flex-col border-r border-gray-200 p-4 transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative z-20 transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-start mb-6 px-2">
           <div className="text-gray-600">
              <h1 className="text-xl font-bold text-primary tracking-tight leading-tight">HR Management</h1>
              <p className="text-xs text-gray-500 font-medium">Dashboard</p>
            </div>
        </div>
        <nav className="flex-1 overflow-y-auto pr-2">
          {renderNav()}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
