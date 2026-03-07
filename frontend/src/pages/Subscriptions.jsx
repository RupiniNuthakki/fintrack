import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { subscriptionAPI } from '../services/api';
import Navbar from '../components/Navbar';

function Subscriptions() {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    billingCycle: 'MONTHLY',
    nextBillingDate: '',
    description: '',
  });

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await subscriptionAPI.getAll();
      setSubscriptions(response.data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      if (error.response?.status === 401) {
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSubscription) {
        await subscriptionAPI.update(editingSubscription.id, formData);
      } else {
        await subscriptionAPI.create(formData);
      }
      fetchSubscriptions();
      closeModal();
    } catch (error) {
      console.error('Error saving subscription:', error);
      alert('Failed to save subscription. Please try again.');
    }
  };

  const handleEdit = (subscription) => {
    setEditingSubscription(subscription);
    setFormData({
      name: subscription.name,
      amount: subscription.amount,
      billingCycle: subscription.billingCycle,
      nextBillingDate: subscription.nextBillingDate,
      description: subscription.description || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      try {
        await subscriptionAPI.delete(id);
        fetchSubscriptions();
      } catch (error) {
        console.error('Error deleting subscription:', error);
        alert('Failed to delete subscription. Please try again.');
      }
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingSubscription(null);
    setFormData({
      name: '',
      amount: '',
      billingCycle: 'MONTHLY',
      nextBillingDate: '',
      description: '',
    });
  };

  const getMonthlyAmount = (amount, billingCycle) => {
    return billingCycle === 'YEARLY' ? (amount / 12).toFixed(2) : amount.toFixed(2);
  };

  const getBadgeColor = (billingCycle) => {
    return billingCycle === 'MONTHLY' 
      ? 'bg-blue-100 text-blue-700' 
      : 'bg-purple-100 text-purple-700';
  };

  const getIconForSubscription = (name) => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('netflix') || nameLower.includes('prime') || nameLower.includes('spotify') || nameLower.includes('youtube')) {
      return '🎬';
    } else if (nameLower.includes('gym') || nameLower.includes('fitness')) {
      return '💪';
    } else if (nameLower.includes('cloud') || nameLower.includes('storage') || nameLower.includes('drive')) {
      return '☁️';
    } else if (nameLower.includes('software') || nameLower.includes('app')) {
      return '💻';
    } else if (nameLower.includes('news') || nameLower.includes('magazine')) {
      return '📰';
    } else {
      return '🔄';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-lg text-gray-600 font-medium">Loading subscriptions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">🔄 Subscriptions</h2>
            <p className="text-gray-600">Manage your recurring subscriptions</p>
          </div>
          <button
            onClick={openModal}
            className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-medium flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Subscription
          </button>
        </div>

        {/* Subscriptions Grid */}
        {subscriptions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subscriptions.map((subscription) => {
              const monthlyAmount = getMonthlyAmount(subscription.amount, subscription.billingCycle);
              const icon = getIconForSubscription(subscription.name);
              const badgeColor = getBadgeColor(subscription.billingCycle);
              
              return (
                <div key={subscription.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all transform hover:scale-105">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{icon}</div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">{subscription.name}</h3>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${badgeColor}`}>
                          {subscription.billingCycle}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEdit(subscription)}
                        className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(subscription.id)}
                        className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  {subscription.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{subscription.description}</p>
                  )}

                  {/* Amounts */}
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {subscription.billingCycle === 'MONTHLY' ? 'Monthly' : 'Yearly'} Cost
                      </span>
                      <span className="text-2xl font-bold text-orange-600">${subscription.amount.toFixed(2)}</span>
                    </div>
                    {subscription.billingCycle === 'YEARLY' && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Monthly Equivalent</span>
                        <span className="text-lg font-semibold text-gray-700">${monthlyAmount}</span>
                      </div>
                    )}
                  </div>

                  {/* Next Billing Date */}
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-3 rounded-xl border border-orange-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-orange-600">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">Next Billing</span>
                      </div>
                      <span className="text-sm font-bold text-orange-600">{subscription.nextBillingDate}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-12 text-center">
            <div className="bg-gray-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Subscriptions Yet</h3>
            <p className="text-gray-600 mb-6">Start tracking your recurring payments!</p>
            <button
              onClick={openModal}
              className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-amber-700 transition-all shadow-lg font-medium inline-flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Your First Subscription
            </button>
          </div>
        )}

        {/* Total Monthly Cost Summary */}
        {subscriptions.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-orange-500 to-amber-600 p-6 rounded-2xl shadow-xl text-white">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium opacity-90 mb-1">Total Monthly Subscriptions</h3>
                <p className="text-sm opacity-75">Combined monthly cost of all subscriptions</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold">
                  ${subscriptions.reduce((total, sub) => {
                    const monthly = sub.billingCycle === 'YEARLY' ? sub.amount / 12 : sub.amount;
                    return total + monthly;
                  }, 0).toFixed(2)}
                </p>
                <p className="text-sm opacity-75">per month</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                {editingSubscription ? '✏️ Edit Subscription' : '➕ Add Subscription'}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subscription Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                  placeholder="e.g., Netflix, Spotify, Gym Membership"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Amount ($)</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    step="0.01"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                    placeholder="9.99"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Billing Cycle</label>
                  <select
                    name="billingCycle"
                    value={formData.billingCycle}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                  >
                    <option value="MONTHLY">Monthly</option>
                    <option value="YEARLY">Yearly</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Next Billing Date</label>
                <input
                  type="date"
                  name="nextBillingDate"
                  value={formData.nextBillingDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description (Optional)</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition resize-none"
                  placeholder="Additional notes about this subscription..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl hover:from-orange-600 hover:to-amber-700 transition shadow-lg font-medium"
                >
                  {editingSubscription ? 'Update' : 'Add'} Subscription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Subscriptions;