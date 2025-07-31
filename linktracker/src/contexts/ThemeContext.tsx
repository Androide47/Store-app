import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type Theme = 'light' | 'dark';
export type Language = 'en' | 'es' | 'fr' | 'de';

interface ThemeContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const translations = {
  en: {
    dashboard: 'Dashboard',
    myLinks: 'My Links',
    analytics: 'Analytics',
    settings: 'Settings',
    searchLinks: 'Search links...',
    profile: 'Profile',
    signOut: 'Sign out',
    signIn: 'Sign in',
    signUp: 'Sign up',
    language: 'Language',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    shipmentTracking: 'Shipment Tracking',
    totalOrders: 'Total Orders',
    inTransit: 'In Transit',
    delivered: 'Delivered',
    delayed: 'Delayed',
    pending: 'Pending',
    trackingId: 'Tracking ID',
    customer: 'Customer',
    destination: 'Destination',
    status: 'Status',
    estimatedDelivery: 'Est. Delivery',
    recentOrders: 'Recent Orders',
    allOrders: 'All Orders',
    orderNumber: 'Order',
    unknown: 'Unknown',
    updated: 'Updated',
    estDelivery: 'Est. Delivery',
     liveTrackingMap: 'Live Tracking Map',
     loadingMap: 'Loading map...',
     packageCurrentlyIn: 'Package is currently in',
     nextStop: 'Next stop',
     estimatedArrival: 'Estimated arrival',
     backToOrders: 'Back to Orders',
     trackingDetailsAndLocation: 'Tracking details and live location',
     customerInformation: 'Customer Information',
     name: 'Name',
     phone: 'Phone',
     email: 'Email',
     shippingInformation: 'Shipping Information',
     origin: 'Origin',
     lastUpdate: 'Last Update',
     trackingTimeline: 'Tracking Timeline'
   },
   es: {
    dashboard: 'Panel',
    myLinks: 'Mis Enlaces',
    analytics: 'Analíticas',
    settings: 'Configuración',
    searchLinks: 'Buscar enlaces...',
    profile: 'Perfil',
    signOut: 'Cerrar sesión',
    signIn: 'Iniciar sesión',
    signUp: 'Registrarse',
    language: 'Idioma',
    darkMode: 'Modo Oscuro',
    lightMode: 'Modo Claro',
    shipmentTracking: 'Seguimiento de Envíos',
    totalOrders: 'Pedidos Totales',
    inTransit: 'En Tránsito',
    delivered: 'Entregado',
    delayed: 'Retrasado',
    pending: 'Pendiente',
    trackingId: 'ID de Seguimiento',
    customer: 'Cliente',
    destination: 'Destino',
    status: 'Estado',
    estimatedDelivery: 'Entrega Est.',
    recentOrders: 'Pedidos Recientes',
    allOrders: 'Todos los Pedidos',
    orderNumber: 'Pedido',
    unknown: 'Desconocido',
    updated: 'Actualizado',
    estDelivery: 'Entrega Est.',
     liveTrackingMap: 'Mapa de Seguimiento en Vivo',
     loadingMap: 'Cargando mapa...',
     packageCurrentlyIn: 'El paquete está actualmente en',
     nextStop: 'Próxima parada',
     estimatedArrival: 'Llegada estimada',
     backToOrders: 'Volver a Pedidos',
     trackingDetailsAndLocation: 'Detalles de seguimiento y ubicación en vivo',
     customerInformation: 'Información del Cliente',
     name: 'Nombre',
     phone: 'Teléfono',
     email: 'Correo',
     shippingInformation: 'Información de Envío',
     origin: 'Origen',
     lastUpdate: 'Última Actualización',
     trackingTimeline: 'Cronología de Seguimiento'
   },
   fr: {
    dashboard: 'Tableau de bord',
    myLinks: 'Mes Liens',
    analytics: 'Analytiques',
    settings: 'Paramètres',
    searchLinks: 'Rechercher des liens...',
    profile: 'Profil',
    signOut: 'Se déconnecter',
    signIn: 'Se connecter',
    signUp: 'S\'inscrire',
    language: 'Langue',
    darkMode: 'Mode Sombre',
    lightMode: 'Mode Clair',
    shipmentTracking: 'Suivi des Expéditions',
    totalOrders: 'Commandes Totales',
    inTransit: 'En Transit',
    delivered: 'Livré',
    delayed: 'Retardé',
    pending: 'En Attente',
    trackingId: 'ID de Suivi',
    customer: 'Client',
    destination: 'Destination',
    status: 'Statut',
    estimatedDelivery: 'Livraison Est.',
    recentOrders: 'Commandes Récentes',
    allOrders: 'Toutes les Commandes',
    orderNumber: 'Commande',
    unknown: 'Inconnu',
    updated: 'Mis à jour',
    estDelivery: 'Livraison Est.',
     liveTrackingMap: 'Carte de Suivi en Direct',
     loadingMap: 'Chargement de la carte...',
     packageCurrentlyIn: 'Le colis est actuellement à',
     nextStop: 'Prochain arrêt',
     estimatedArrival: 'Arrivée estimée',
     backToOrders: 'Retour aux Commandes',
     trackingDetailsAndLocation: 'Détails de suivi et localisation en direct',
     customerInformation: 'Informations Client',
     name: 'Nom',
     phone: 'Téléphone',
     email: 'Email',
     shippingInformation: 'Informations d\'Expédition',
     origin: 'Origine',
     lastUpdate: 'Dernière Mise à Jour',
     trackingTimeline: 'Chronologie de Suivi'
   },
   de: {
    dashboard: 'Dashboard',
    myLinks: 'Meine Links',
    analytics: 'Analytik',
    settings: 'Einstellungen',
    searchLinks: 'Links suchen...',
    profile: 'Profil',
    signOut: 'Abmelden',
    signIn: 'Anmelden',
    signUp: 'Registrieren',
    language: 'Sprache',
    darkMode: 'Dunkler Modus',
    lightMode: 'Heller Modus',
    shipmentTracking: 'Sendungsverfolgung',
    totalOrders: 'Gesamtbestellungen',
    inTransit: 'Unterwegs',
    delivered: 'Geliefert',
    delayed: 'Verspätet',
    pending: 'Ausstehend',
    trackingId: 'Tracking-ID',
    customer: 'Kunde',
    destination: 'Ziel',
    status: 'Status',
    estimatedDelivery: 'Geschätzte Lieferung',
    recentOrders: 'Aktuelle Bestellungen',
    allOrders: 'Alle Bestellungen',
    orderNumber: 'Bestellung',
    unknown: 'Unbekannt',
    updated: 'Aktualisiert',
    estDelivery: 'Geschätzte Lieferung',
     liveTrackingMap: 'Live-Tracking-Karte',
     loadingMap: 'Karte wird geladen...',
     packageCurrentlyIn: 'Paket befindet sich derzeit in',
     nextStop: 'Nächster Halt',
     estimatedArrival: 'Geschätzte Ankunft',
     backToOrders: 'Zurück zu Bestellungen',
     trackingDetailsAndLocation: 'Tracking-Details und Live-Standort',
     customerInformation: 'Kundeninformationen',
     name: 'Name',
     phone: 'Telefon',
     email: 'E-Mail',
     shippingInformation: 'Versandinformationen',
     origin: 'Herkunft',
     lastUpdate: 'Letzte Aktualisierung',
     trackingTimeline: 'Tracking-Zeitlinie'
   }
 };

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguageState(savedLanguage);
    }
    
    // Ensure dark mode is always disabled
    document.documentElement.classList.remove('dark');
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <ThemeContext.Provider value={{
      language,
      setLanguage,
      t
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};