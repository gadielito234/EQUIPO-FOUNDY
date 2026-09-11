import { useState } from 'react';

const investments = [];

function Investments({ onBackHome }) {
  const [filter, setFilter] = useState('All');
  const [notice, setNotice] = useState('');
  const visibleInvestments = investments.filter((item) => filter === 'All' || item.status === filter);

  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 2500);
  };

  return (
    <main className="min-h-full bg-[#f7f3ee] px-5 py-8 text-[#1e4043] sm:px-8 lg:px-10">
      <div className="w-full">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#1b7f61]">Portfolio overview</p>
            <h1 className="mt-1 text-2xl font-semibold text-[#1d3f42]">My investments</h1>
            <p className="mt-1 text-xs text-[#687577]">Track the businesses and opportunities you have supported.</p>
          </div>
          <button type="button" onClick={onBackHome} className="w-fit rounded-md bg-[#006b73] px-4 py-2 text-xs font-bold uppercase text-white hover:bg-[#005159]">Explore opportunities</button>
        </div>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ['Total invested', 'No data', 'When investments are registered', 'bg-[#006b73] text-white'],
            ['Portfolio return', 'No data', 'When performance is available', 'bg-white text-[#1b7f61]'],
            ['Active projects', 'No data', 'When investments are registered', 'bg-[#e4eafa] text-[#263b59]'],
            ['Next payout', 'No data', 'When payment data is available', 'bg-[#f8f4ef] text-[#1d3f42]'],
          ].map(([label, value, hint, colors]) => (
            <article key={label} className={`rounded-lg p-4 shadow-sm ${colors}`}>
              <p className="text-[10px] uppercase tracking-wider opacity-75">{label}</p>
              <p className="mt-3 text-2xl font-semibold">{value}</p>
              <p className="mt-2 text-xs opacity-75">{hint}</p>
            </article>
          ))}
        </section>

        <section className="mt-7 overflow-hidden rounded-lg border border-[#d7d0c4] bg-[#f8f4ef] shadow-sm">
          <div className="flex flex-col gap-3 border-b border-[#d7d0c4] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div><h2 className="text-sm font-semibold text-[#1d3f42]">Investment history</h2><p className="mt-1 text-[10px] text-[#687577]">Your latest investments and their current performance.</p></div>
            <div className="flex gap-1 rounded-md bg-[#e9eeeb] p-1">
              {['All', 'Active', 'Completed'].map((option) => <button key={option} type="button" onClick={() => setFilter(option)} className={`rounded px-3 py-1.5 text-[10px] font-semibold ${filter === option ? 'bg-white text-[#006b73] shadow-sm' : 'text-[#657577]'}`}>{option}</button>)}
            </div>
          </div>
          <div className="divide-y divide-[#e3ddd3]">
            {visibleInvestments.map((item) => (
              <article key={item.name} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
                <img src={item.image} alt={item.name} className="h-12 w-16 rounded object-cover" />
                <div className="min-w-0 flex-1"><h3 className="truncate text-sm font-semibold text-[#1d3f42]">{item.name}</h3><p className="mt-1 text-[10px] text-[#687577]">{item.category} · Invested {item.date}</p></div>
                <div className="grid grid-cols-3 gap-5 text-right text-[10px] sm:min-w-[18rem]"><div><p className="text-[#899496]">Amount</p><p className="mt-1 font-semibold text-[#1d3f42]">{item.invested}</p></div><div><p className="text-[#899496]">Return</p><p className="mt-1 font-semibold text-[#1b7f61]">{item.return}</p></div><div><p className="text-[#899496]">Status</p><p className="mt-1 font-semibold text-[#657577]">{item.status}</p></div></div>
                <button type="button" onClick={() => showNotice(`Details for ${item.name}.`)} className="rounded-md border border-[#cbd7d3] px-3 py-2 text-[10px] font-semibold text-[#1d4b4c] hover:bg-white">View</button>
              </article>
            ))}
            {visibleInvestments.length === 0 && <p className="p-8 text-center text-sm text-[#687577]">No investments found.</p>}
          </div>
        </section>
      </div>
      {notice && <div role="status" className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-[#173f43] px-4 py-3 text-xs font-semibold text-white shadow-lg">{notice}</div>}
    </main>
  );
}

export default Investments;
