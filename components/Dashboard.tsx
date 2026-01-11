
import React from 'react';
import { UserStats, GeneratedImage } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, ImageIcon, Zap, Clock, ChevronRight } from 'lucide-react';

interface DashboardProps {
  stats: UserStats;
  history: GeneratedImage[];
}

const Dashboard: React.FC<DashboardProps> = ({ stats, history }) => {
  const chartData = [
    { name: 'Mon', count: 12 },
    { name: 'Tue', count: 18 },
    { name: 'Wed', count: 15 },
    { name: 'Thu', count: 28 },
    { name: 'Fri', count: 22 },
    { name: 'Sat', count: 35 },
    { name: 'Sun', count: 42 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Creator Dashboard</h1>
        <p className="text-gray-400">Manage your account and track your creative activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard 
          icon={<Zap className="text-purple-400" />} 
          label="Plan" 
          value={stats.plan} 
          sub="Upgrade for more" 
        />
        <StatCard 
          icon={<TrendingUp className="text-blue-400" />} 
          label="Remaining" 
          value={stats.generationsRemaining.toString()} 
          sub="Resets in 12h" 
        />
        <StatCard 
          icon={<ImageIcon className="text-green-400" />} 
          label="Total Created" 
          value={(stats.totalGenerations + history.length).toString()} 
          sub="Lifetime stats" 
        />
        <StatCard 
          icon={<Clock className="text-orange-400" />} 
          label="Avg Time" 
          value="4.2s" 
          sub="Per generation" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Chart */}
        <div className="lg:col-span-8 glass-morphism rounded-3xl p-8 border border-gray-800">
          <h3 className="text-xl font-bold mb-6">Activity Volume</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px' }}
                  itemStyle={{ color: '#a855f7' }}
                />
                <Area type="monotone" dataKey="count" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* History List */}
        <div className="lg:col-span-4 glass-morphism rounded-3xl p-8 border border-gray-800 flex flex-col">
          <h3 className="text-xl font-bold mb-6">Recent History</h3>
          <div className="space-y-4 flex-grow">
            {history.slice(0, 5).map(img => (
              <div key={img.id} className="flex items-center gap-4 group cursor-pointer hover:bg-gray-800/50 p-2 rounded-xl transition-colors">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={img.url} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-sm font-medium truncate">{img.prompt}</p>
                  <p className="text-xs text-gray-500">{new Date(img.timestamp).toLocaleDateString()}</p>
                </div>
                <ChevronRight size={16} className="text-gray-600 group-hover:text-purple-400" />
              </div>
            ))}
            {history.length === 0 && (
              <div className="text-center py-10 text-gray-600 text-sm">
                No recent history found.
              </div>
            )}
          </div>
          <button className="mt-6 w-full text-center text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors uppercase tracking-widest">
            View All Creations
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, sub }: { icon: React.ReactNode, label: string, value: string, sub: string }) => (
  <div className="glass-morphism p-6 rounded-3xl border border-gray-800">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">{label}</span>
    </div>
    <div className="text-3xl font-black mb-1">{value}</div>
    <div className="text-[10px] text-gray-500 font-medium">{sub}</div>
  </div>
);

export default Dashboard;
