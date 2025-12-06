import { useState,useEffect } from "react";   //useState è un Hook di React, cioè una funzione speciale che ti
// permette di aggiungere stato a un componente funzionale.

function card({spesaId,descrizione,importo,data, onDelete}) {
  //Stato per il nome
  const [id,setId ] = useState(spesaId);
  const [des, setDes] = useState(descrizione);
  const [imp, setImp] = useState(importo);
  const [dat, setDat] = useState(data);

/*
React crea una variabile di stato chiamata nome, inizializzata con il valore "Mario Rossi".
setNome è la funzione che aggiorna quello stato.
La sintassi con le parentesi quadre è una destructuring assignment:
useState restituisce un array con due elementi:
-il valore corrente dello stato (nome)
-la funzione per modificarlo (setNome)
Quando chiami setNome(...), React non cambia subito la variabile: pianifica un re-render, cioè ridisegna il componente con il nuovo valore.
*/

  // Stato per i like
  

  /*
Stesso meccanismo, ma il valore iniziale è 0.
likes contiene il numero attuale di like,
setLikes serve per incrementarlo.
*/

  // Handler per cambiare nome
  // useEffect(()=>{
  //   fetch(`http://127.0.0.1:8090/api/collections/utenti/records/${id}`,{
  //     method: "PATCH",
  //     headers:{
  //       "Content-Type":"application/json"
  //     },
  //     body: JSON.stringify({
  //       nome:nome
  //     })
  //   })
  // },[nome])


  // function handleNameChange(event) {
  //   setNome(event.target.value);
  //   console.log(nome)
  // }

  /*
  Viene eseguito ogni volta che l’utente scrive qualcosa nell’input.
event.target.value è il contenuto digitato.
setNome(...) aggiorna lo stato → React ridisegna il componente →
{nome} nel <h2> cambia immediatamente sullo schermo.
È un classico esempio di two-way binding: ciò che scrivi nell’input si riflette nel testo sopra.
  */

  // Handler per aggiungere like

  // useEffect(()=>{
  //   fetch(`http://127.0.0.1:8090/api/collections/utenti/records/${id}`,{
  //     method: "PATCH",
  //     headers:{
  //       "Content-Type":"application/json"
  //     },
  //     body: JSON.stringify({
  //       like:likes
  //     })
  //   })
  // },[likes])

  // function handleLikeClick() {
  //   setLikes(likesPrecedenti => likesPrecedenti + 1);
  //   console.log(likesPrecedenti)
  // }

  /*
    Ogni clic sul bottone chiama handleLikeClick.
    Usa la forma funzionale di setLikes per sicurezza: riceve il valore precedente e restituisce quello nuovo.
    (Evita problemi se React deve aggiornare più stati insieme.)
    Ogni volta che setLikes viene chiamato:
        React aggiorna lo stato.
        Esegue di nuovo il rendering.
        Mostra il nuovo numero di like.
  */

  // Formatta la data in un formato leggibile
  const formatDate = (dateString) => {
    if (!dateString) return 'Data non disponibile';
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Formatta l'importo con il simbolo dell'euro
  const formatImporto = (amount) => {
    if (amount === null || amount === undefined) return '0,00 €';
    return `${parseFloat(amount).toFixed(2).replace('.', ',')} €`;
  };

  const handleDelete = () => {
    fetch(`http://127.0.0.1:8090/api/collections/spese/records/${id}`, {
      method: 'DELETE'
    })
    .then(res => {
          if (!res.ok) throw new Error('Errore nell\'eliminazione');
          if (onDelete) onDelete(id);
        })
        .catch(err => {
          console.error('Errore:', err);
          alert('Errore nell\'eliminazione della spesa: ' + err.message);
        });     
  };

  return (
    <div className="spesa-card" style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
      padding: '2rem',
      width: '300px',
      flexShrink: 0,
      display: 'block',
      position: 'relative'
    }}>
      <button
        onClick={handleDelete}
        style={{
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem',
          background: 'transparent',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          color: '#e74c3c',
          padding: '0.25rem',
          lineHeight: 1
        }}
        aria-label="Elimina spesa"
        title="Elimina questa spesa"
      >
        🗑️
      </button>

      <h2 style={{
        margin: '0 0 1.5rem 0',
        color: '#333',
        fontSize: '2rem',
        fontWeight: '600',
        borderBottom: '2px solid #f0f0f0',
        paddingBottom: '1rem'
      }}>
        {des || 'Descrizione non disponibile'}
      </h2>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginTop: '1.5rem'
      }}>
        <p style={{
          margin: 0,
          fontSize: '1.75rem',
          fontWeight: 'bold',
          color: '#e74c3c'
        }}>
          Importo: {formatImporto(imp)}
        </p>
        
        <p style={{
          margin: 0,
          fontSize: '1.25rem',
          color: '#666'
        }}>
          Data: {formatDate(dat)}
        </p>
      </div>
    </div>
  );
}

export default card;
