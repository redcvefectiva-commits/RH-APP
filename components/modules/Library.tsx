import React, { useState, useMemo } from 'react';
import Card from '../ui/Card';
import { libraryResources } from '../../services/mockData';
// FIX: Corrected import path
import { LibraryResource } from '../../types';
import { SearchIcon } from '../ui/Icons';

const Library: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredResources = useMemo(() => {
        return libraryResources.filter(res => 
            res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            res.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);
    
    const getResourceTypeColor = (type: LibraryResource['type']) => {
        switch(type) {
            case 'Manual': return 'bg-blue-100 text-blue-800';
            case 'Política': return 'bg-red-100 text-red-800';
            case 'Guía': return 'bg-green-100 text-green-800';
            case 'Video': return 'bg-purple-100 text-purple-800';
        }
    };

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-dark">Biblioteca de Recursos</h2>
                <p className="text-gray-500 mt-1">Encuentra manuales, políticas, guías y otros documentos importantes.</p>
            </div>
             <div className="relative mb-6">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Buscar por título o categoría..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border rounded-lg text-lg focus:ring-primary focus:border-primary" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map(resource => (
                    <a href={resource.url} target="_blank" rel="noopener noreferrer" key={resource.id} className="block hover:scale-105 transition-transform">
                        <Card className="flex flex-col h-full">
                           <div className="flex justify-between items-start">
                             <h4 className="font-bold text-lg text-dark flex-grow pr-2">{resource.title}</h4>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getResourceTypeColor(resource.type)}`}>
                                {resource.type}
                            </span>
                           </div>
                            <p className="text-sm text-gray-500 mt-1">Categoría: {resource.category}</p>
                        </Card>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Library;