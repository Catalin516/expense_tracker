import { useEffect, useState } from "react";
import Card from "./card.jsx";
import Navbar from "./top.jsx";
import Plot from "./plot.jsx";
import { useCallback } from "react";



function App() {
  const [spese,setSpese] = useState([])

  const fetchSpese = async () => {
    try {
      const r = await fetch("http://127.0.0.1:8090/api/collections/spese/records")
      const data = await r.json()
      const listSpese = data.items.map(item => ({
        id: item.id,
        descrizione: item.descrizione,
        importo: item.importo,
        data: item.data
      }))
      console.log(listSpese)
      setSpese(listSpese)
    } catch (err) {
      console.error('Errore nel caricamento delle spese:', err)
    }
  }

  useEffect(()=>{
    fetchSpese()
  },[])

  const [page, setPage] = useState(window.location.hash || '#home');

  useEffect(() => {
    const onHash = () => setPage(window.location.hash || '#home');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const handleExpenseCreated = () => {
    fetchSpese()
  }

  const handleExpenseDeleted = (id) => {
    setSpese(spese => spese.filter(s => s.id !== id))
  }

  const plotData = spese.map(spesa => ({
    x: spesa.descrizione,
    y: spesa.importo
  }));

  return (
    <>
      <Navbar onExpenseCreated={handleExpenseCreated} />
      {page === '#plot' ? (
        <Plot 
          data={plotData}
        />
      ) : (
        <div className="container" style={{ 
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          minHeight: '100vh',
          width: '100%',
          padding: '2rem',
          paddingTop: '100px',
          boxSizing: 'border-box'
        }}>
          {
            spese.map((spesa) => (
              <Card
                key={spesa.id}
                spesaId={spesa.id}
                descrizione={spesa.descrizione}
                importo={spesa.importo}
                data={spesa.data}
                onDelete={handleExpenseDeleted}
              />
            ))
          }
        </div>
      )}
    </>
  );
}

export default App;