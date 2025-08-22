import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  Send, 
  Paperclip, 
  User,
  Calendar,
  Tag,
  ArrowLeft,
  RefreshCw
} from 'lucide-react';
import { ticketAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import DashboardLayout from '../../components/DashboardLayout';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const Tickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { register: registerMessage, handleSubmit: handleSubmitMessage, reset: resetMessage, formState: { errors: messageErrors } } = useForm();
  const { register: registerTicket, handleSubmit: handleSubmitTicket, reset: resetTicket, formState: { errors: ticketErrors } } = useForm();

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setRefreshing(true);
      const response = await ticketAPI.getMyTickets();
      setTickets(response.data.tickets);
    } catch (error) {
      console.error('Erreur lors du chargement des tickets:', error);
      toast.error('Erreur lors du chargement des tickets');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchTicketDetails = async (ticketId) => {
    try {
      const response = await ticketAPI.getTicket(ticketId);
      setSelectedTicket(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement du ticket:', error);
      toast.error('Erreur lors du chargement du ticket');
    }
  };

  const createTicket = async (data) => {
    try {
      await ticketAPI.createTicket(data);
      toast.success('Ticket créé avec succès !');
      setShowCreateModal(false);
      resetTicket();
      fetchTickets();
    } catch (error) {
      console.error('Erreur lors de la création du ticket:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de la création du ticket');
    }
  };

  const sendMessage = async (data) => {
    if (!selectedTicket) return;
    
    setSendingMessage(true);
    try {
      await ticketAPI.addMessage(selectedTicket.id, { message: data.message });
      resetMessage();
      fetchTicketDetails(selectedTicket.id);
      toast.success('Message envoyé !');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      toast.error('Erreur lors de l\'envoi du message');
    } finally {
      setSendingMessage(false);
    }
  };

  const updateTicketStatus = async (ticketId, status) => {
    try {
      await ticketAPI.updateStatus(ticketId, { status });
      toast.success('Statut mis à jour !');
      fetchTickets();
      if (selectedTicket && selectedTicket.id === ticketId) {
        fetchTicketDetails(ticketId);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      toast.error('Erreur lors de la mise à jour du statut');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'OPEN':
        return <AlertCircle className="h-4 w-4" />;
      case 'IN_PROGRESS':
        return <Clock className="h-4 w-4" />;
      case 'RESOLVED':
        return <CheckCircle className="h-4 w-4" />;
      case 'CLOSED':
        return <XCircle className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'OPEN':
        return 'bg-red-100 text-red-800';
      case 'IN_PROGRESS':
        return 'bg-yellow-100 text-yellow-800';
      case 'RESOLVED':
        return 'bg-green-100 text-green-800';
      case 'CLOSED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'LOW':
        return 'bg-green-100 text-green-800';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800';
      case 'HIGH':
        return 'bg-orange-100 text-orange-800';
      case 'URGENT':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || ticket.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  if (loading) {
    return (
      <DashboardLayout title="Support Tickets">
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner text="Chargement de vos tickets..." />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout 
      title="Support Tickets"
      subtitle="Gérez vos demandes de support et suivez leur progression."
    >
        {!selectedTicket ? (
          <>
            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-end mb-6"
            >
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setRefreshing(true);
                    fetchTickets();
                  }}
                  disabled={refreshing}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                  Actualiser
                </button>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau ticket
                </button>
              </div>
            </motion.div>

            {/* Filtres */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher dans les tickets..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="OPEN">Ouvert</option>
                  <option value="IN_PROGRESS">En cours</option>
                  <option value="RESOLVED">Résolu</option>
                  <option value="CLOSED">Fermé</option>
                </select>
                
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="all">Toutes les priorités</option>
                  <option value="LOW">Faible</option>
                  <option value="MEDIUM">Moyenne</option>
                  <option value="HIGH">Élevée</option>
                  <option value="URGENT">Urgente</option>
                </select>
                
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="all">Toutes les catégories</option>
                  <option value="TECHNICAL">Technique</option>
                  <option value="BILLING">Facturation</option>
                  <option value="GENERAL">Général</option>
                  <option value="FEATURE_REQUEST">Demande de fonctionnalité</option>
                </select>
              </div>
            </motion.div>

            {/* Liste des tickets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              {filteredTickets.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {tickets.length === 0 ? 'Aucun ticket' : 'Aucun ticket trouvé'}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {tickets.length === 0 
                      ? 'Vous n\'avez pas encore créé de ticket de support.'
                      : 'Aucun ticket ne correspond à vos critères de recherche.'
                    }
                  </p>
                  {tickets.length === 0 && (
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Créer mon premier ticket
                    </button>
                  )}
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredTickets.map((ticket, index) => (
                    <motion.div
                      key={ticket.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      onClick={() => fetchTicketDetails(ticket.id)}
                      className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-medium text-gray-900">
                              {ticket.subject}
                            </h3>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                              {getStatusIcon(ticket.status)}
                              <span className="ml-1">{ticket.status}</span>
                            </span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                              {ticket.priority}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {ticket.description}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Tag className="h-4 w-4 mr-1" />
                              {ticket.category}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(ticket.createdAt).toLocaleDateString('fr-FR')}
                            </div>
                            <div className="flex items-center">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              {ticket._count?.messages || 0} messages
                            </div>
                          </div>
                        </div>
                        
                        <div className="ml-4">
                          {ticket.status !== 'CLOSED' && ticket.status !== 'RESOLVED' && (
                            <div className="flex space-x-2">
                              {ticket.status === 'OPEN' && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateTicketStatus(ticket.id, 'RESOLVED');
                                  }}
                                  className="text-green-600 hover:text-green-800"
                                  title="Marquer comme résolu"
                                >
                                  <CheckCircle className="h-5 w-5" />
                                </button>
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateTicketStatus(ticket.id, 'CLOSED');
                                }}
                                className="text-gray-600 hover:text-gray-800"
                                title="Fermer le ticket"
                              >
                                <XCircle className="h-5 w-5" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        ) : (
          /* Vue détaillée du ticket */
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            {/* En-tête du ticket */}
            <div className="border-b border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="inline-flex items-center text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour aux tickets
                </button>
                
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedTicket.status)}`}>
                    {getStatusIcon(selectedTicket.status)}
                    <span className="ml-1">{selectedTicket.status}</span>
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedTicket.priority)}`}>
                    {selectedTicket.priority}
                  </span>
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedTicket.subject}
              </h1>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  {selectedTicket.category}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Créé le {new Date(selectedTicket.createdAt).toLocaleDateString('fr-FR')}
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {selectedTicket.user.firstName} {selectedTicket.user.lastName}
                </div>
              </div>
            </div>
            
            {/* Messages */}
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="space-y-4">
                {/* Message initial */}
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">
                          {selectedTicket.user.firstName} {selectedTicket.user.lastName}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(selectedTicket.createdAt).toLocaleString('fr-FR')}
                        </span>
                      </div>
                      <p className="text-gray-700">{selectedTicket.description}</p>
                    </div>
                  </div>
                </div>
                
                {/* Messages de conversation */}
                {selectedTicket.messages?.map((message) => (
                  <div key={message.id} className="flex space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.isFromAdmin ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      <User className={`h-4 w-4 ${
                        message.isFromAdmin ? 'text-green-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className={`rounded-lg p-4 ${
                        message.isFromAdmin ? 'bg-green-50' : 'bg-gray-50'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">
                            {message.isFromAdmin ? 'Support' : `${selectedTicket.user.firstName} ${selectedTicket.user.lastName}`}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(message.createdAt).toLocaleString('fr-FR')}
                          </span>
                        </div>
                        <p className="text-gray-700">{message.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Formulaire de réponse */}
            {selectedTicket.status !== 'CLOSED' && (
              <div className="border-t border-gray-200 p-6">
                <form onSubmit={handleSubmitMessage(sendMessage)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Votre message
                    </label>
                    <textarea
                      {...registerMessage('message', { required: 'Le message est requis' })}
                      rows={4}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Tapez votre message..."
                    />
                    {messageErrors.message && (
                      <p className="mt-1 text-sm text-red-600">{messageErrors.message.message}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {selectedTicket.status === 'OPEN' && (
                        <button
                          type="button"
                          onClick={() => updateTicketStatus(selectedTicket.id, 'RESOLVED')}
                          className="inline-flex items-center px-3 py-2 border border-green-300 shadow-sm text-sm leading-4 font-medium rounded-md text-green-700 bg-white hover:bg-green-50"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Marquer comme résolu
                        </button>
                      )}
                      
                      <button
                        type="button"
                        onClick={() => updateTicketStatus(selectedTicket.id, 'CLOSED')}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Fermer le ticket
                      </button>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={sendingMessage}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {sendingMessage ? 'Envoi...' : 'Envoyer'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        )}

        {/* Modal de création de ticket */}
        <AnimatePresence>
          {showCreateModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
              onClick={() => setShowCreateModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white"
              >
                <div className="mt-3">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Créer un nouveau ticket
                  </h3>
                  
                  <form onSubmit={handleSubmitTicket(createTicket)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sujet *
                      </label>
                      <input
                        type="text"
                        {...registerTicket('subject', { required: 'Le sujet est requis' })}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Décrivez brièvement votre problème"
                      />
                      {ticketErrors.subject && (
                        <p className="mt-1 text-sm text-red-600">{ticketErrors.subject.message}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Catégorie *
                        </label>
                        <select
                          {...registerTicket('category', { required: 'La catégorie est requise' })}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="">Sélectionner une catégorie</option>
                          <option value="TECHNICAL">Technique</option>
                          <option value="BILLING">Facturation</option>
                          <option value="GENERAL">Général</option>
                          <option value="FEATURE_REQUEST">Demande de fonctionnalité</option>
                        </select>
                        {ticketErrors.category && (
                          <p className="mt-1 text-sm text-red-600">{ticketErrors.category.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Priorité *
                        </label>
                        <select
                          {...registerTicket('priority', { required: 'La priorité est requise' })}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="">Sélectionner une priorité</option>
                          <option value="LOW">Faible</option>
                          <option value="MEDIUM">Moyenne</option>
                          <option value="HIGH">Élevée</option>
                          <option value="URGENT">Urgente</option>
                        </select>
                        {ticketErrors.priority && (
                          <p className="mt-1 text-sm text-red-600">{ticketErrors.priority.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                      </label>
                      <textarea
                        {...registerTicket('description', { required: 'La description est requise' })}
                        rows={6}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Décrivez votre problème en détail..."
                      />
                      {ticketErrors.description && (
                        <p className="mt-1 text-sm text-red-600">{ticketErrors.description.message}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setShowCreateModal(false);
                          resetTicket();
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Créer le ticket
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    </DashboardLayout>
  );
};

export default Tickets;