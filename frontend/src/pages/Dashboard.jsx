import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardAPI } from '../services/api';
import Navbar from '../components/Navbar';

function Dashboard() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await dashboardAPI.get();
      setDashboard(response.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      if (error.response?.status === 401) {
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-lg text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Navbar Component */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            💼 Dashboard
          </h2>
          <p className="text-gray-600">Track your financial journey at a glance</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Spending Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-white/20 p-3 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-medium opacity-90 mb-1">Total Spending</h3>
            <p className="text-3xl font-bold">${dashboard?.totalSpending?.toFixed(2) || '0.00'}</p>
          </div>

          {/* This Month Card */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-white/20 p-3 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-medium opacity-90 mb-1">This Month</h3>
            <p className="text-3xl font-bold">${dashboard?.monthlySpending?.toFixed(2) || '0.00'}</p>
          </div>

          {/* Monthly EMIs Card */}
          <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-white/20 p-3 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-medium opacity-90 mb-1">Monthly EMIs</h3>
            <p className="text-3xl font-bold">${dashboard?.totalMonthlyEmi?.toFixed(2) || '0.00'}</p>
          </div>

          {/* Monthly Subscriptions Card */}
          <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-white/20 p-3 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-medium opacity-90 mb-1">Subscriptions</h3>
            <p className="text-3xl font-bold">${dashboard?.totalMonthlySubscriptions?.toFixed(2) || '0.00'}</p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Spending by Category */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-2 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-indigo-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Spending by Category</h3>
            </div>
            {dashboard?.spendingByCategory && Object.keys(dashboard.spendingByCategory).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(dashboard.spendingByCategory).map(([category, amount], index) => {
                  const total = dashboard.totalSpending || 1;
                  const percentage = ((amount / total) * 100).toFixed(1);
                  const colors = [
                    'from-blue-500 to-blue-600',
                    'from-purple-500 to-purple-600',
                    'from-pink-500 to-pink-600',
                    'from-orange-500 to-orange-600',
                    'from-green-500 to-green-600',
                    'from-cyan-500 to-cyan-600',
                  ];
                  const color = colors[index % colors.length];
                  
                  return (
                    <div key={category} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-medium flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${color}`}></div>
                          {category}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">{percentage}%</span>
                          <span className="font-semibold text-gray-800">${amount.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${color} transition-all duration-500 rounded-full`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <p className="text-gray-500 font-medium">No expenses yet</p>
                <p className="text-gray-400 text-sm mt-1">Start adding expenses to see categories</p>
              </div>
            )}
          </div>

          {/* Recent Expenses */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-gradient-to-br from-pink-100 to-rose-100 p-2 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-pink-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Recent Expenses</h3>
            </div>
            {dashboard?.recentExpenses && dashboard.recentExpenses.length > 0 ? (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {dashboard.recentExpenses.map((expense) => (
                  <div 
                    key={expense.id} 
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                        <span className="text-2xl">💳</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{expense.description}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded-full text-xs font-medium">
                            {expense.category}
                          </span>
                          <span>•</span>
                          <span>{expense.date}</span>
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-lg text-gray-800">
                      ${expense.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                  </svg>
                </div>
                <p className="text-gray-500 font-medium">No expenses yet</p>
                <p className="text-gray-400 text-sm mt-1">Your recent expenses will appear here</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;