import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    store: 'Store Administration',
    email: 'Email Management',
    
    // Dashboard
    totalProducts: 'Total Products',
    totalOrders: 'Total Orders',
    totalRevenue: 'Total Revenue',
    newCustomers: 'New Customers',
    recentOrders: 'Recent Orders',
    topProducts: 'Top Products',
    
    // Store
    products: 'Products',
    orders: 'Orders',
    addProduct: 'Add Product',
    editProduct: 'Edit Product',
    productName: 'Product Name',
    price: 'Price',
    stock: 'Stock',
    status: 'Status',
    actions: 'Actions',
    
    // Email
    campaigns: 'Campaigns',
    templates: 'Templates',
    subscribers: 'Subscribers',
    createCampaign: 'Create Campaign',
    emailSubject: 'Email Subject',
    emailContent: 'Email Content',
    sendEmail: 'Send Email',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    search: 'Search',
    filter: 'Filter',
    export: 'Export',
    language: 'Language',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
  },
  es: {
    // Navigation
    dashboard: 'Panel de Control',
    store: 'Administración de Tienda',
    email: 'Gestión de Email',
    
    // Dashboard
    totalProducts: 'Total de Productos',
    totalOrders: 'Total de Pedidos',
    totalRevenue: 'Ingresos Totales',
    newCustomers: 'Nuevos Clientes',
    recentOrders: 'Pedidos Recientes',
    topProducts: 'Productos Destacados',
    
    // Store
    products: 'Productos',
    orders: 'Pedidos',
    addProduct: 'Agregar Producto',
    editProduct: 'Editar Producto',
    productName: 'Nombre del Producto',
    price: 'Precio',
    stock: 'Stock',
    status: 'Estado',
    actions: 'Acciones',
    
    // Email
    campaigns: 'Campañas',
    templates: 'Plantillas',
    subscribers: 'Suscriptores',
    createCampaign: 'Crear Campaña',
    emailSubject: 'Asunto del Email',
    emailContent: 'Contenido del Email',
    sendEmail: 'Enviar Email',
    
    // Common
    save: 'Guardar',
    cancel: 'Cancelar',
    edit: 'Editar',
    delete: 'Eliminar',
    view: 'Ver',
    search: 'Buscar',
    filter: 'Filtrar',
    export: 'Exportar',
    language: 'Idioma',
    darkMode: 'Modo Oscuro',
    lightMode: 'Modo Claro',
  },
  fr: {
    // Navigation
    dashboard: 'Tableau de Bord',
    store: 'Administration Boutique',
    email: 'Gestion Email',
    
    // Dashboard
    totalProducts: 'Total Produits',
    totalOrders: 'Total Commandes',
    totalRevenue: 'Revenus Totaux',
    newCustomers: 'Nouveaux Clients',
    recentOrders: 'Commandes Récentes',
    topProducts: 'Produits Populaires',
    
    // Store
    products: 'Produits',
    orders: 'Commandes',
    addProduct: 'Ajouter Produit',
    editProduct: 'Modifier Produit',
    productName: 'Nom du Produit',
    price: 'Prix',
    stock: 'Stock',
    status: 'Statut',
    actions: 'Actions',
    
    // Email
    campaigns: 'Campagnes',
    templates: 'Modèles',
    subscribers: 'Abonnés',
    createCampaign: 'Créer Campagne',
    emailSubject: 'Sujet Email',
    emailContent: 'Contenu Email',
    sendEmail: 'Envoyer Email',
    
    // Common
    save: 'Sauvegarder',
    cancel: 'Annuler',
    edit: 'Modifier',
    delete: 'Supprimer',
    view: 'Voir',
    search: 'Rechercher',
    filter: 'Filtrer',
    export: 'Exporter',
    language: 'Langue',
    darkMode: 'Mode Sombre',
    lightMode: 'Mode Clair',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};