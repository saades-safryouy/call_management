import React from 'react';
import { 
  Search, 
  Send, 
  FileCheck, 
  User,
  Bell,
  ArrowRight,
  TrendingUp,
  MapPin,
  Calendar,
  PhoneCall
} from 'lucide-react';

const CandidateDashboard = () => {
  const stats = [
    { name: 'Available Calls', value: '15', icon: Search, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'My Applications', value: '3', icon: Send, color: 'text-red-600', bg: 'bg-red-50' },
    { name: 'Under Review', value: '2', icon: FileCheck, color: 'text-orange-600', bg: 'bg-orange-50' },
    { name: 'Profile Strength', value: '85%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bienvenue sur votre Espace Candidat</h1>
          <p className="text-sm text-gray-500">Gérez vos candidatures et découvrez de nouvelles opportunités chez Attijariwafa Bank.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm hover:bg-gray-50 transition-all">
            <Bell className="h-5 w-5" />
          </button>
          <button className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md hover:bg-red-700 transition-all active:scale-95">
            <Search className="h-4 w-4" />
            <span>Découvrir les appels</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-gray-50 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative flex items-center justify-between">
              <div className={`rounded-xl ${stat.bg} p-3 ${stat.color} ring-1 ring-inset ${stat.color.replace('text', 'ring')}/20`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.name}</p>
                <p className="text-2xl font-extrabold text-gray-900 mt-1">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recommended Calls */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl bg-white border border-gray-100 shadow-sm overflow-hidden">
            <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Appels recommandés pour vous</h3>
              <button className="text-xs font-bold text-red-600 hover:underline">Voir tout</button>
            </div>
            <div className="divide-y divide-gray-50">
              {[1, 2].map((i) => (
                <div key={i} className="p-6 hover:bg-gray-50 transition-all group cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="mt-1 h-12 w-12 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg">
                        <PhoneCall className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                          Analyste Financier Sénior - {i === 1 ? 'Casablanca' : 'Rabat'}
                        </h4>
                        <div className="mt-2 flex flex-wrap gap-3">
                          <span className="flex items-center text-xs text-gray-500">
                            <MapPin className="h-3 w-3 mr-1 text-red-600" />
                            Siège Social
                          </span>
                          <span className="flex items-center text-xs text-gray-500">
                            <Calendar className="h-3 w-3 mr-1 text-red-600" />
                            Date limite: 30 Juin 2026
                          </span>
                          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-50 text-blue-600 uppercase tracking-wider">CDI</span>
                        </div>
                      </div>
                    </div>
                    <button className="mt-4 md:mt-0 flex items-center space-x-1 text-sm font-extrabold text-red-600">
                      <span>Postuler</span>
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Application Timeline Placeholder */}
          <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Suivi de mes candidatures</h3>
            <div className="relative">
              <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-100"></div>
              <div className="space-y-8 relative">
                <div className="flex items-center space-x-4">
                  <div className="z-10 h-8 w-8 rounded-full bg-red-600 flex items-center justify-center text-white shadow-md ring-4 ring-red-50">
                    <Send className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Candidature envoyée</p>
                    <p className="text-xs text-gray-500">Appel #1245 - 15 Juin 2026</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="z-10 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md ring-4 ring-blue-50">
                    <FileCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">En cours d'examen</p>
                    <p className="text-xs text-gray-500">Votre dossier est en cours d'évaluation par nos experts.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="space-y-6">
          <div className="rounded-xl bg-white border border-gray-100 shadow-sm overflow-hidden">
            <div className="h-20 bg-gradient-to-r from-red-600 to-red-800"></div>
            <div className="px-6 pb-6 text-center">
              <div className="relative -mt-10 mb-4 inline-block">
                <div className="h-20 w-20 rounded-2xl bg-white p-1 shadow-xl">
                  <div className="flex h-full w-full items-center justify-center rounded-xl bg-gray-100 text-gray-400">
                    <User className="h-10 w-10" />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 h-5 w-5 rounded-full border-2 border-white bg-green-500"></div>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Mohammed El Alami</h3>
              <p className="text-xs font-medium text-gray-500">Candidat - Profil Complet à 85%</p>
              
              <div className="mt-6 flex justify-center space-x-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">3</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Envois</p>
                </div>
                <div className="h-10 w-px bg-gray-100"></div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">12</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Vues</p>
                </div>
              </div>
              
              <button className="mt-6 w-full rounded-lg border border-red-600 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 transition-all">
                Compléter mon profil
              </button>
            </div>
          </div>

          <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest">Conseils</h3>
            <div className="rounded-lg bg-red-50 p-4 border-l-4 border-red-600">
              <p className="text-xs text-red-800 leading-relaxed">
                Mettez à jour votre CV régulièrement pour augmenter vos chances d'être sélectionné pour les appels en cours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
