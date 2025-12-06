import logo from './assets/logo.png';
import { useState, useRef, useEffect } from 'react';

export default function Navbar({ onExpenseCreated }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const modalRef = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setModalOpen(false);
    }
    function onDocClick(e) {
      if (!modalOpen) return;
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setModalOpen(false);
      }
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDocClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDocClick);
    };
  }, [modalOpen]);

  function handleCreateExpense() {
    if (!name.trim()) {
      alert('Inserisci il nome della spesa');
      return;
    }
    const parsed = parseFloat(amount.replace(',', '.'));
    if (Number.isNaN(parsed)) {
      alert('Importo non valido');
      return;
    }

    fetch('http://127.0.0.1:8090/api/collections/spese/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        descrizione: name,
        importo: parsed,
        data: new Date().toISOString()
      })
    })
      .then(res => {
        if (!res.ok) throw new Error('Errore nella creazione della spesa');
        return res.json();
      })
      .then(data => {
        setModalOpen(false);
        setName('');
        setAmount('');
        if (onExpenseCreated) onExpenseCreated();
      })
      .catch(err => {
        console.error('Errore:', err);
        alert('Errore nella creazione della spesa: ' + err.message);
      });
  }

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <nav style={{ 
        backgroundColor: '#333', 
        padding: '1rem',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        justifyContent: 'space-between'
      }}>
       <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img 
            src={logo}
            alt="Logo"
            style={{ 
              width: '40px', 
              height: '40px',
              objectFit: 'cover',
              borderRadius: '50%'
            }} 
          />
        </div>    
        
        <ul style={{ 
          listStyle: 'none', 
          display: 'flex', 
          gap: '2rem',
          margin: 0,
          padding: 0
        }}>
          <li>
            <a 
              style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '1.2rem',
                cursor: 'pointer'
              }}
            >
              Buy & Track
            </a>
          </li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '1rem' }}>
          <button
            className="nav-plot-button"
            onClick={() => {
              // toggle plot page: if already on #plot, go back to home
              if ((window.location.hash || '#home') === '#plot') {
                window.location.hash = '#home';
              } else {
                window.location.hash = '#plot';
              }
            }}
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '0.4rem 0.7rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.95rem'
            }}
            title="Grafici"
          >
            Grafici
          </button>

          <div className="menu-container" style={{ position: 'relative' }}>
            <button
              className="menu-button"
              onClick={() => setModalOpen(true)}
              style={{
                backgroundColor: '#ff7f50',
                color: 'white',
                border: 'none',
                padding: '0.5rem 0.8rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Aggiungi
            </button>
          </div>
        </div>
      </nav>

      {modalOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-box" ref={modalRef}>
            <button className="modal-close" aria-label="Chiudi" onClick={() => setModalOpen(false)}>×</button>
            <h3 style={{ marginTop: 0 }}>Nuova spesa</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <label style={{ fontSize: '0.9rem' }}>
                Descrizione
                <input value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', marginTop: '0.25rem', padding: '0.5rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: 'white' }} />
              </label>
              <label style={{ fontSize: '0.9rem' }}>
                Importo
                <input value={amount} onChange={e => setAmount(e.target.value)} style={{ width: '100%', marginTop: '0.25rem', padding: '0.5rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: 'white' }} />
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button onClick={() => setModalOpen(false)} style={{ padding: '0.5rem 0.8rem', borderRadius: '6px', background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.08)' }}>Annulla</button>
                <button onClick={handleCreateExpense} style={{ padding: '0.5rem 0.8rem', borderRadius: '6px', background: '#ff7f50', color: 'white', border: 'none' }}>Crea</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}