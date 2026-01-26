import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CalendarModal = ({ onClose, onSelect }) => {
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0,7)); // YYYY-MM
  const [heatmap, setHeatmap] = useState({});

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get('https://website-gwoc-codegem-backend.onrender.com/api/orders/heatmap', { params: { month } });
        setHeatmap(res.data.counts || {});
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [month]);

  const [y,m] = month.split('-').map(Number);
  const first = new Date(y,m-1,1);
  const daysInMonth = new Date(y,m,0).getDate();

  const pick = (d) => {
    const iso = new Date(y,m-1,d).toISOString().slice(0,10);
    onSelect(iso);
    onClose();
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Choose a date</h3>
          <div>
            <input type="month" value={month} onChange={e => setMonth(e.target.value)} className="bg-[#121827] text-white px-2 py-1 rounded" />
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(h=> <div key={h} className="text-sm text-blue-300 text-center">{h}</div>)}

          {Array(first.getDay()).fill(null).map((_,i)=> <div key={'pad'+i}></div>)}

          {Array.from({length: daysInMonth}).map((_,i)=>{
            const d = i+1;
            const cnt = heatmap[d] || 0;
            const cls = cnt >= 3 ? 'slot-busy-2' : (cnt >=1 ? 'slot-busy-1' : 'slot-busy-0');
            return (
              <button key={d} onClick={() => pick(d)} className={`p-2 rounded-lg text-center ${cnt?cls:'hover:bg-blue-900/20'}`}>
                <div className="text-sm">{d}</div>
                {cnt ? <div className="text-xs mt-1 text-amber-100/70">{cnt} bookings</div> : null}
              </button>
            )
          })}
        </div>

        <div className="mt-4 text-right">
          <button onClick={onClose} className="px-4 py-2 bg-blue-700 rounded">Close</button>
        </div>
      </div>
    </div>
  )
}

export default CalendarModal;
