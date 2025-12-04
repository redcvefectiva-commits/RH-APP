import React from 'react';
import { BellIcon } from './ui/Icons';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold text-dark">{title}</h2>
      <div className="flex items-center space-x-4">
        <button className="relative text-gray-500 hover:text-primary">
          <BellIcon className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="flex items-center space-x-2">
            <img src="https://picsum.photos/seed/user/40" alt="Avatar de usuario" className="h-10 w-10 rounded-full" />
            <div>
                <p className="font-semibold text-sm text-dark">Isabella Lopez</p>
                <p className="text-xs text-gray-500">Especialista de RRHH</p>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;