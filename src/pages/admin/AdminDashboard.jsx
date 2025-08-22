import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  ShoppingBag, 
  MessageSquare, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Activity, 
  AlertCircle,
  CheckCircle,
  Clock,
  UserPlus,
  Package,
  Mail,
  Star,
  ArrowUp,
  ArrowDown,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';
import { userAPI, orderAPI, ticketAPI, subscriptionAPI } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import DashboardLayout from '../../components/DashboardLayout';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    users: { total: 0, new: 0, active: 0 },
    orders: { total: 0, pending: 0, completed: 0, revenue: 0 },
    tickets: { total: 0, open: 0, resolved: 0 },
    subscriptions: { total: 0, active: 0, revenue: 0 }
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [chartData, setChartData] = useState({
    revenue: [],
    users: [],
    orders: []
  });
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Récupérer les statistiques
      const [usersRes, ordersRes, ticketsRes, subscriptionsRes] = await Promise.all([
        userAPI.getUsers({ page: 1, limit: 1 }),
        orderAPI.getOrders({ page: 1, limit: 1 }),
        ticketAPI.getTickets({ page: 1, limit: 1 }),
        subscriptionAPI.getSubscriptions({ page: 1, limit: 1 })
      ]);

      // Calculer les statistiques
      const userStats = calculateUserStats(usersRes.data.users);
      const orderStats = calculateOrderStats(ordersRes.data.orders);
      const ticketStats = calculateTicketStats(ticketsRes.data.tickets);
      const subscriptionStats = calculateSubscriptionStats(subscriptionsRes.data.subscriptions);

      setStats({
        users: userStats,
        orders: orderStats,
        tickets: ticketStats,
        subscriptions: subscriptionStats
      });

      // Récupérer l'activité récente
      await fetchRecentActivity();
      
      // Récupérer les données de graphiques
      await fetchChartData();
      
    } catch (error) {
      console.error('Erreur lors du chargement du tableau de bord:', error);
      toast.error('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const calculateUserStats = (users) => {
    const now = new Date();
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    return {
      total: users.length,
      new: users.filter(user => new Date(user.createdAt) > lastWeek).length,
      active: users.filter(user => user.isActive).length
    };
  };

  const calculateOrderStats = (orders) => {
    return {
      total: orders.length,
      pending: orders.filter(order => order.status === 'pending').length,
      completed: orders.filter(order => order.status === 'completed').length,
      revenue: orders
        .filter(order => order.status === 'completed')
        .reduce((sum, order) => sum + order.totalAmount, 0)
    };
  };

  const calculateTicketStats = (tickets) => {
    return {
      total: tickets.length,
      open: tickets.filter(ticket => ticket.status === 'open').length,
      resolved: tickets.filter(ticket => ticket.status === 'resolved').length
    };
  };

  const calculateSubscriptionStats = (subscriptions) => {
    return {
      total: subscriptions.length,
      active: subscriptions.filter(sub => sub.status === 'active').length,
      revenue: subscriptions
        .filter(sub => sub.status === 'active')
        .reduce((sum, sub) => sum + (sub.plan?.price || 0), 0)
    };
  };

  const fetchRecentActivity = async () => {
    try {
      // Simuler l'activité récente (à remplacer par de vraies données)
      const activities = [
        {
          id: 1,
          type: 'user',
          action: 'Nouvel utilisateur inscrit',
          user: 'John Doe',
          time: '2 minutes',
          icon: UserPlus,
          color: 'text-green-600'
        },
        {
          id: 2,
          type: 'order',
          action: 'Nouvelle commande',
          user: 'Jane Smith',
          amount: '€149.99',
          time: '5 minutes',
          icon: Package,
          color: 'text-blue-600'
        },
        {
          id: 3,
          type: 'ticket',
          action: 'Nouveau ticket de support',
          user: 'Mike Johnson',
          priority: 'Haute',
          time: '10 minutes',
          icon: Mail,
          color: 'text-red-600'
        },
        {
          id: 4,
          type: 'subscription',
          action: 'Abonnement renouvelé',
          user: 'Sarah Wilson',
          plan: 'Premium',
          time: '15 minutes',
          icon: Star,
          color: 'text-purple-600'
        }
      ];
      
      setRecentActivity(activities);
    } catch (error) {
      console.error('Erreur lors du chargement de l\'activité récente:', error);
    }
  };

  const fetchChartData = async () => {
    try {
      // Simuler les données de graphiques (à remplacer par de vraies données)
      const revenue = [
        { date: '2024-01-01', value: 1200 },
        { date: '2024-01-02', value: 1500 },
        { date: '2024-01-03', value: 1800 },
        { date: '2024-01-04', value: 1400 },
        { date: '2024-01-05', value: 2200 },
        { date: '2024-01-06', value: 1900 },
        { date: '2024-01-07', value: 2500 }
      ];
      
      const users = [
        { date: '2024-01-01', value: 5 },
        { date: '2024-01-02', value: 8 },
        { date: '2024-01-03', value: 12 },
        { date: '2024-01-04', value: 7 },
        { date: '2024-01-05', value: 15 },
        { date: '2024-01-06', value: 10 },
        { date: '2024-01-07', value: 18 }
      ];
      
      const orders = [
        { date: '2024-01-01', value: 12 },
        { date: '2024-01-02', value: 18 },
        { date: '2024-01-03', value: 25 },
        { date: '2024-01-04', value: 15 },
        { date: '2024-01-05', value: 32 },
        { date: '2024-01-06', value: 28 },
        { date: '2024-01-07', value: 35 }
      ];
      
      setChartData({ revenue, users, orders });
    } catch (error) {
      console.error('Erreur lors du chargement des données de graphiques:', error);
    }
  };

  const StatCard = ({ title, value, change, changeType, icon: Icon, color, link }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <div className={`flex items-center mt-2 text-sm ${
              changeType === 'increase' ? 'text-green-600' : 'text-red-600'
            }`}>
              {changeType === 'increase' ? (
                <ArrowUp className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 mr-1" />
              )}
              {change}
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      {link && (
        <Link
          to={link}
          className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Voir détails →
        </Link>
      )}
    </motion.div>
  );

  const ActivityItem = ({ activity }) => {
    const Icon = activity.icon;
    
    return (
      <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
        <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span>{activity.user}</span>
            {activity.amount && <span>• {activity.amount}</span>}
            {activity.priority && <span>• {activity.priority}</span>}
            {activity.plan && <span>• {activity.plan}</span>}
          </div>
        </div>
        <span className="text-xs text-gray-500">Il y a {activity.time}</span>
      </div>
    );
  };

  if (loading) {
    return (
      <DashboardLayout title="Administration">
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner text="Chargement du tableau de bord..." />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout 
      title="Tableau de bord Admin"
      subtitle="Vue d'ensemble de votre plateforme et de ses performances."
    >
      {/* Sélecteur de période */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex justify-end"
      >
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="7d">7 derniers jours</option>
          <option value="30d">30 derniers jours</option>
          <option value="90d">90 derniers jours</option>
          <option value="1y">1 an</option>
        </select>
      </motion.div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Utilisateurs totaux"
            value={stats.users.total.toLocaleString()}
            change={`+${stats.users.new} cette semaine`}
            changeType="increase"
            icon={Users}
            color="bg-blue-500"
            link="/admin/users"
          />
          
          <StatCard
            title="Revenus totaux"
            value={`€${stats.orders.revenue.toLocaleString()}`}
            change="+12.5% ce mois"
            changeType="increase"
            icon={DollarSign}
            color="bg-green-500"
            link="/admin/orders"
          />
          
          <StatCard
            title="Commandes"
            value={stats.orders.total.toLocaleString()}
            change={`${stats.orders.pending} en attente`}
            changeType="neutral"
            icon={ShoppingBag}
            color="bg-purple-500"
            link="/admin/orders"
          />
          
          <StatCard
            title="Tickets de support"
            value={stats.tickets.total.toLocaleString()}
            change={`${stats.tickets.open} ouverts`}
            changeType={stats.tickets.open > 5 ? 'decrease' : 'increase'}
            icon={MessageSquare}
            color="bg-orange-500"
            link="/admin/tickets"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Graphique des revenus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Revenus</h2>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">Derniers 7 jours</span>
              </div>
            </div>
            
            {/* Graphique simplifié */}
            <div className="h-64 flex items-end space-x-2">
              {chartData.revenue.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-blue-500 rounded-t"
                    style={{
                      height: `${(item.value / Math.max(...chartData.revenue.map(d => d.value))) * 200}px`
                    }}
                  />
                  <span className="text-xs text-gray-500 mt-2">
                    {new Date(item.date).toLocaleDateString('fr-FR', { weekday: 'short' })}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <span>€{Math.min(...chartData.revenue.map(d => d.value)).toLocaleString()}</span>
              <span>€{Math.max(...chartData.revenue.map(d => d.value)).toLocaleString()}</span>
            </div>
          </motion.div>

          {/* Activité récente */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Activité récente</h2>
              <Activity className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="space-y-1">
              {recentActivity.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
            
            <Link
              to="/admin/activity"
              className="mt-4 block text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Voir toute l'activité
            </Link>
          </motion.div>
        </div>

        {/* Statistiques détaillées */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Statut des commandes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Statut des commandes</h2>
              <PieChart className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-sm text-gray-600">Complétées</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {stats.orders.completed}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <span className="text-sm text-gray-600">En attente</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {stats.orders.pending}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="text-sm text-gray-600">Annulées</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {stats.orders.total - stats.orders.completed - stats.orders.pending}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Abonnements actifs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Abonnements</h2>
              <LineChart className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total des abonnements</span>
                <span className="text-lg font-semibold text-gray-900">
                  {stats.subscriptions.total}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Abonnements actifs</span>
                <span className="text-lg font-semibold text-green-600">
                  {stats.subscriptions.active}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Revenus mensuels récurrents</span>
                <span className="text-lg font-semibold text-blue-600">
                  €{stats.subscriptions.revenue.toLocaleString()}
                </span>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Taux de conversion</span>
                  <span className="text-sm font-medium text-gray-900">12.5%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Actions rapides */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Actions rapides</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/admin/users"
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-900">Gérer les utilisateurs</span>
            </Link>
            
            <Link
              to="/admin/orders"
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ShoppingBag className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-gray-900">Voir les commandes</span>
            </Link>
            
            <Link
              to="/admin/tickets"
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <MessageSquare className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium text-gray-900">Support client</span>
            </Link>
            
            <Link
              to="/admin/analytics"
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-900">Voir les analyses</span>
            </Link>
          </div>
        </motion.div>
    </DashboardLayout>
  );
};

export default AdminDashboard;