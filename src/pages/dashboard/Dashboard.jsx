import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  CreditCard, 
  ShoppingBag, 
  Users, 
  Ticket, 
  TrendingUp,
  Calendar,
  Euro,
  Gift,
  Bell
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { userAPI, subscriptionAPI, orderAPI, referralAPI, ticketAPI } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [userStats, subscriptions, orders, referrals, tickets] = await Promise.all([
          userAPI.getStats(user.id),
          subscriptionAPI.getMySubscriptions(),
          orderAPI.getMyOrders({ limit: 5 }),
          referralAPI.getMyReferrals(),
          ticketAPI.getMyTickets({ limit: 5 })
        ]);

        setStats({
          user: userStats.data,
          subscriptions: subscriptions.data,
          orders: orders.data,
          referrals: referrals.data,
          tickets: tickets.data
        });

        // Créer une timeline d'activité récente
        const activity = [
          ...orders.data.orders?.slice(0, 3).map(order => ({
            type: 'order',
            title: `Commande #${order.id.slice(-6)}`,
            description: `${order.items.length} article(s) - ${order.total}€`,
            date: order.createdAt,
            status: order.status
          })) || [],
          ...tickets.data.tickets?.slice(0, 2).map(ticket => ({
            type: 'ticket',
            title: `Ticket #${ticket.id.slice(-6)}`,
            description: ticket.subject,
            date: ticket.createdAt,
            status: ticket.status
          })) || []
        ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

        setRecentActivity(activity);
      } catch (error) {
        console.error('Erreur lors du chargement du tableau de bord:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  if (loading) {
    return <LoadingSpinner text="Chargement de votre tableau de bord..." />;
  }

  const quickStats = [
    {
      title: 'Commandes',
      value: stats?.orders?.total || 0,
      icon: ShoppingBag,
      color: 'bg-blue-500',
      link: '/dashboard/orders'
    },
    {
      title: 'Abonnements',
      value: stats?.subscriptions?.filter(s => s.status === 'ACTIVE').length || 0,
      icon: CreditCard,
      color: 'bg-green-500',
      link: '/dashboard/subscriptions'
    },
    {
      title: 'Parrainages',
      value: stats?.referrals?.totalReferrals || 0,
      icon: Users,
      color: 'bg-purple-500',
      link: '/dashboard/referrals'
    },
    {
      title: 'Tickets',
      value: stats?.tickets?.total || 0,
      icon: Ticket,
      color: 'bg-orange-500',
      link: '/dashboard/support'
    }
  ];

  const getStatusColor = (status, type) => {
    const colors = {
      order: {
        PENDING: 'text-yellow-600 bg-yellow-100',
        CONFIRMED: 'text-blue-600 bg-blue-100',
        SHIPPED: 'text-purple-600 bg-purple-100',
        DELIVERED: 'text-green-600 bg-green-100',
        CANCELLED: 'text-red-600 bg-red-100'
      },
      ticket: {
        OPEN: 'text-blue-600 bg-blue-100',
        IN_PROGRESS: 'text-yellow-600 bg-yellow-100',
        RESOLVED: 'text-green-600 bg-green-100',
        CLOSED: 'text-gray-600 bg-gray-100'
      }
    };
    return colors[type]?.[status] || 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de bienvenue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">
            Bonjour, {user?.firstName} ! 👋
          </h1>
          <p className="mt-2 text-gray-600">
            Voici un aperçu de votre activité et de vos services.
          </p>
        </motion.div>

        {/* Statistiques rapides */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.title}
                to={stat.link}
                className="group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow group-hover:scale-105 transform duration-200"
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
                </motion.div>
              </Link>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activité récente */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Activité récente</h2>
                <Bell className="h-5 w-5 text-gray-400" />
              </div>
              
              {recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center p-4 bg-gray-50 rounded-lg"
                    >
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'order' ? 'bg-blue-100' : 'bg-orange-100'
                      }`}>
                        {activity.type === 'order' ? (
                          <ShoppingBag className={`h-4 w-4 ${
                            activity.type === 'order' ? 'text-blue-600' : 'text-orange-600'
                          }`} />
                        ) : (
                          <Ticket className="h-4 w-4 text-orange-600" />
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(activity.date).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        getStatusColor(activity.status, activity.type)
                      }`}>
                        {activity.status}
                      </span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Aucune activité récente</p>
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
            {/* Abonnement actuel */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mon abonnement</h3>
              {stats?.subscriptions?.find(s => s.status === 'ACTIVE') ? (
                <div className="space-y-3">
                  {stats.subscriptions
                    .filter(s => s.status === 'ACTIVE')
                    .map(subscription => (
                      <div key={subscription.id} className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-green-900">{subscription.plan.name}</p>
                            <p className="text-sm text-green-600">
                              {subscription.plan.price}€/{subscription.plan.interval}
                            </p>
                          </div>
                          <div className="text-green-600">
                            <CreditCard className="h-5 w-5" />
                          </div>
                        </div>
                        <p className="text-xs text-green-600 mt-2">
                          Renouvellement: {new Date(subscription.currentPeriodEnd).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    ))
                  }
                </div>
              ) : (
                <div className="text-center py-4">
                  <CreditCard className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm mb-3">Aucun abonnement actif</p>
                  <Link
                    to="/dashboard/subscriptions"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    Voir les plans
                  </Link>
                </div>
              )}
            </div>

            {/* Statistiques de parrainage */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Parrainage</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Parrainés</span>
                  <span className="font-semibold">{stats?.referrals?.totalReferrals || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Commissions</span>
                  <span className="font-semibold text-green-600">
                    {stats?.referrals?.totalCommissions || 0}€
                  </span>
                </div>
                <div className="pt-3 border-t">
                  <Link
                    to="/dashboard/referrals"
                    className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                  >
                    <Gift className="h-4 w-4 mr-1" />
                    Gérer mes parrainages
                  </Link>
                </div>
              </div>
            </div>

            {/* Actions rapides */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
              <div className="space-y-3">
                <Link
                  to="/dashboard/support/new"
                  className="flex items-center p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Ticket className="h-4 w-4 mr-3 text-orange-500" />
                  Créer un ticket
                </Link>
                <Link
                  to="/dashboard/orders/new"
                  className="flex items-center p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <ShoppingBag className="h-4 w-4 mr-3 text-blue-500" />
                  Nouvelle commande
                </Link>
                <Link
                  to="/dashboard/profile"
                  className="flex items-center p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <User className="h-4 w-4 mr-3 text-purple-500" />
                  Modifier mon profil
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;