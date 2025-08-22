import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Gift, 
  Euro, 
  Copy, 
  Share2, 
  TrendingUp, 
  Calendar, 
  UserPlus,
  ExternalLink,
  RefreshCw,
  Award,
  Target
} from 'lucide-react';
import { referralAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';
import DashboardLayout from '../../components/DashboardLayout';

const Referrals = () => {
  const { user } = useAuth();
  const [referralData, setReferralData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generatingCode, setGeneratingCode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    fetchReferralData();
  }, []);

  const fetchReferralData = async () => {
    try {
      const response = await referralAPI.getMyReferrals();
      setReferralData(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des données de parrainage:', error);
      toast.error('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const generateNewCode = async () => {
    setGeneratingCode(true);
    try {
      await referralAPI.createCode();
      await fetchReferralData();
      toast.success('Nouveau code de parrainage généré !');
    } catch (error) {
      console.error('Erreur lors de la génération du code:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de la génération du code');
    } finally {
      setGeneratingCode(false);
    }
  };

  const copyReferralCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(true);
      toast.success('Code copié dans le presse-papiers !');
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (error) {
      toast.error('Erreur lors de la copie du code');
    }
  };

  const copyReferralLink = async (code) => {
    const link = `${window.location.origin}/register?ref=${code}`;
    try {
      await navigator.clipboard.writeText(link);
      toast.success('Lien de parrainage copié !');
    } catch (error) {
      toast.error('Erreur lors de la copie du lien');
    }
  };

  const shareReferralLink = async (code) => {
    const link = `${window.location.origin}/register?ref=${code}`;
    const text = `Rejoignez-moi sur la plateforme d'Arnaud Schaeffer avec mon code de parrainage: ${code}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Code de parrainage - Arnaud Schaeffer',
          text: text,
          url: link
        });
      } catch (error) {
        console.log('Partage annulé');
      }
    } else {
      // Fallback: copier le lien
      copyReferralLink(code);
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Programme de Parrainage">
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner text="Chargement de vos données de parrainage..." />
        </div>
      </DashboardLayout>
    );
  }

  const stats = [
    {
      title: 'Parrainés',
      value: referralData?.totalReferrals || 0,
      icon: Users,
      color: 'bg-blue-500',
      description: 'Personnes inscrites avec votre code'
    },
    {
      title: 'Commissions',
      value: `${referralData?.totalCommissions || 0}€`,
      icon: Euro,
      color: 'bg-green-500',
      description: 'Total des commissions gagnées'
    },
    {
      title: 'Ce mois',
      value: referralData?.monthlyReferrals || 0,
      icon: Calendar,
      color: 'bg-purple-500',
      description: 'Nouveaux parrainés ce mois'
    },
    {
      title: 'Taux de conversion',
      value: `${referralData?.conversionRate || 0}%`,
      icon: TrendingUp,
      color: 'bg-orange-500',
      description: 'Pourcentage de conversions'
    }
  ];

  return (
    <DashboardLayout 
      title="Système de Parrainage"
      subtitle="Partagez votre code et gagnez des commissions sur chaque inscription."
    >

        {/* Statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-500">{stat.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Code de parrainage */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Mon Code de Parrainage</h2>
                <button
                  onClick={generateNewCode}
                  disabled={generatingCode}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${generatingCode ? 'animate-spin' : ''}`} />
                  {generatingCode ? 'Génération...' : 'Nouveau code'}
                </button>
              </div>
              
              {referralData?.activeCode ? (
                <div className="space-y-4">
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                    <div className="text-center">
                      <div className="inline-flex items-center px-4 py-2 bg-white rounded-lg shadow-sm border">
                        <Gift className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="text-2xl font-bold text-gray-900 tracking-wider">
                          {referralData.activeCode.code}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-gray-600">
                        Partagez ce code avec vos amis pour gagner des commissions
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      onClick={() => copyReferralCode(referralData.activeCode.code)}
                      className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      {copiedCode ? 'Copié !' : 'Copier le code'}
                    </button>
                    
                    <button
                      onClick={() => copyReferralLink(referralData.activeCode.code)}
                      className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Copier le lien
                    </button>
                    
                    <button
                      onClick={() => shareReferralLink(referralData.activeCode.code)}
                      className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Partager
                    </button>
                  </div>
                  
                  <div className="text-center text-sm text-gray-500">
                    Code créé le {new Date(referralData.activeCode.createdAt).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Gift className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Aucun code de parrainage
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Générez votre premier code de parrainage pour commencer à gagner des commissions.
                  </p>
                  <button
                    onClick={generateNewCode}
                    disabled={generatingCode}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Gift className="h-4 w-4 mr-2" />
                    {generatingCode ? 'Génération...' : 'Générer mon code'}
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Panneau latéral */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Comment ça marche */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Comment ça marche ?</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">1</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Partagez votre code</p>
                    <p className="text-xs text-gray-600">Envoyez votre code à vos amis</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">2</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Ils s'inscrivent</p>
                    <p className="text-xs text-gray-600">Avec votre code de parrainage</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-green-600">3</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Vous gagnez</p>
                    <p className="text-xs text-gray-600">Des commissions sur leurs achats</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Récompenses */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Récompenses</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-900">Inscription</span>
                  </div>
                  <span className="text-sm font-bold text-green-600">10€</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <Target className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-blue-900">Commission</span>
                  </div>
                  <span className="text-sm font-bold text-blue-600">10%</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <p className="text-xs text-yellow-800">
                  <strong>Bonus:</strong> Gagnez 10€ pour chaque inscription + 10% de commission sur tous leurs achats !
                </p>
              </div>
            </div>

            {/* Objectifs */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Objectifs du mois</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Parrainages</span>
                    <span className="text-sm text-gray-600">{referralData?.monthlyReferrals || 0}/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(((referralData?.monthlyReferrals || 0) / 5) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Commissions</span>
                    <span className="text-sm text-gray-600">{referralData?.monthlyCommissions || 0}€/100€</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(((referralData?.monthlyCommissions || 0) / 100) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Historique des parrainages */}
        {referralData?.referrals && referralData.referrals.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Historique des Parrainages</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Utilisateur
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date d'inscription
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Commission
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {referralData.referrals.map((referral, index) => (
                      <motion.tr
                        key={referral.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <UserPlus className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">
                                {referral.referredUser.firstName} {referral.referredUser.lastName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {referral.referredUser.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(referral.createdAt).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          {referral.commissionEarned}€
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            referral.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                            referral.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {referral.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
    </DashboardLayout>
  );
};

export default Referrals;