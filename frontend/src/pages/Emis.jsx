import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { emiAPI } from '../services/api';
import Navbar from '../components/Navbar';

function Emis() {
  const navigate = useNavigate();
  const [emis, setEmis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEmi, setEditingEmi] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    totalAmount: '',
    monthlyAmount: '',
    totalMonths: '',
    remainingMonths: '',
    nextDueDate: '',
    dayOfMonth: '',
  });

  useEffect(() => {
    fetchEmis();
  }, []);

  const fetchEmis = async () => {
    try {
      const response = await emiAPI.getAll();
      setEmis(response.data);
    } catch (error) {
      console.error('Error fetching EMIs:', error);
      if (error.response?.status === 401) {
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Auto-calculate remaining months for new EMI
    if (!editingEmi && name === 'totalMonths') {
      setFormData(prev => ({
        ...prev,
        remainingMonths: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEmi) {
        await emiAPI.update(editingEmi.id, formData);
      } else {
        await emiAPI.create(formData);
      }
      fetchEmis();
      closeModal();
    } catch (error) {
      console.error('Error saving EMI:', error);
      alert('Failed to save EMI. Please try again.');
    }
  };

  const handleEdit = (emi) => {
    setEditingEmi(emi);
    setFormData({
      name: emi.name,
      totalAmount: emi.totalAmount,
      monthlyAmount: emi.monthlyAmount,
      totalMonths: emi.totalMonths,
      remainingMonths: emi.remainingMonths,
      nextDueDate: emi.nextDueDate,
      dayOfMonth: emi.dayOfMonth,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this EMI?')) {
      try {
        await emiAPI.delete(id);
        fetchEmis();
      } catch (error) {
        console.error('Error deleting EMI:', error);
        alert('Failed to delete EMI. Please try again.');
      }
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingEmi(null);
    setFormData({
      name: '',
      totalAmount: '',
      monthlyAmount: '',
      totalMonths: '',
      remainingMonths: '',
      nextDueDate: '',
      dayOfMonth: '',
    });
  };

  const calculateProgress = (totalMonths, remainingMonths) => {
    const paidMonths = totalMonths - remainingMonths;
    return ((paidMonths / totalMonths) * 100).toFixed(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-lg text-gray-600 font-medium">Loading EMIs...</p>
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
            <h2 className="text-4xl font-bold text-gray-800 mb-2">💳 EMIs</h2>
            <p className="text-gray-600">Track your monthly installments</p>
          </div>
          <button
            onClick={openModal}
            className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-6 py-3 rounded-xl hover:from-pink-600 hover:to-rose-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-medium flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add EMI
          </button>
        </div>

        {/* EMIs Grid */}
        {emis.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emis.map((emi) => {
              const progress = calculateProgress(emi.totalMonths, emi.remainingMonths);
              const paidMonths = emi.totalMonths - emi.remainingMonths;
              
              return (
                <div key={emi.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all transform hover:scale-105">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-3 rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">{emi.name}</h3>
                        <p className="text-xs text-gray-500">Day {emi.dayOfMonth} of month</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEdit(emi)}
                        className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(emi.id)}
                        className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Amounts */}
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Monthly Payment</span>
                      <span className="text-2xl font-bold text-pink-600">${emi.monthlyAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Amount</span>
                      <span className="text-lg font-semibold text-gray-800">${emi.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-gray-800">{paidMonths}/{emi.totalMonths} months</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-pink-500 to-rose-600 transition-all duration-500 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-right">{progress}% complete</p>
                  </div>

                  {/* Next Due Date */}
                  <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-3 rounded-xl border border-pink-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Next Due Date</span>
                      <span className="text-sm font-bold text-pink-600">{emi.nextDueDate}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-600">Remaining Months</span>
                      <span className="text-xs font-semibold text-gray-700">{emi.remainingMonths}</span>
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No EMIs Yet</h3>
            <p className="text-gray-600 mb-6">Start tracking your monthly installments!</p>
            <button
              onClick={openModal}
              className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-6 py-3 rounded-xl hover:from-pink-600 hover:to-rose-700 transition-all shadow-lg font-medium inline-flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Your First EMI
            </button>
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                {editingEmi ? '✏️ Edit EMI' : '➕ Add EMI'}
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">EMI Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
                  placeholder="e.g., Car Loan, Home Loan"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Total Amount ($)</label>
                  <input
                    type="number"
                    name="totalAmount"
                    value={formData.totalAmount}
                    onChange={handleInputChange}
                    step="0.01"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
                    placeholder="10000.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Amount ($)</label>
                  <input
                    type="number"
                    name="monthlyAmount"
                    value={formData.monthlyAmount}
                    onChange={handleInputChange}
                    step="0.01"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
                    placeholder="500.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Total Months</label>
                  <input
                    type="number"
                    name="totalMonths"
                    value={formData.totalMonths}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
                    placeholder="24"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Remaining Months</label>
                  <input
                    type="number"
                    name="remainingMonths"
                    value={formData.remainingMonths}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
                    placeholder="20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Next Due Date</label>
                  <input
                    type="date"
                    name="nextDueDate"
                    value={formData.nextDueDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Day of Month</label>
                  <input
                    type="number"
                    name="dayOfMonth"
                    value={formData.dayOfMonth}
                    onChange={handleInputChange}
                    min="1"
                    max="31"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
                    placeholder="15"
                  />
                </div>
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
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl hover:from-pink-600 hover:to-rose-700 transition shadow-lg font-medium"
                >
                  {editingEmi ? 'Update' : 'Add'} EMI
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Emis;