import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Globe } from 'lucide-react';
import { useTheme, type Language } from '../contexts/ThemeContext';

export const Header = () => {
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const { language, setLanguage, t } = useTheme();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];



  return (
    <header className="bg-beige shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BT</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Bridgen</span>
          </Link>

          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center space-x-1 p-2 text-gray-600 hover:text-orange-600 transition-colors"
              >
                <Globe className="h-5 w-5" />
                <span className="text-sm font-medium">{languages.find(l => l.code === language)?.name}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-beige rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                           setLanguage(lang.code as Language);
                           setIsLanguageMenuOpen(false);
                         }}
                        className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                          language === lang.code
                            ? 'bg-orange-50 text-orange-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};