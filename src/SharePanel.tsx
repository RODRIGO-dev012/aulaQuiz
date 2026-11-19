import { useState } from 'react';
export function SharePanel({url}:{url:string}){
 const [message,setMessage]=useState('');
 async function copy(){try{if(!navigator.clipboard?.writeText)throw new Error();await navigator.clipboard.writeText(url);setMessage('Enlace copiado.');}catch{setMessage('Copia el enlace del campo de abajo. El navegador no permitió copiarlo automáticamente.');}}
 async function native(){try{await navigator.share({title:'AulaQuiz · Practica a tu ritmo',url});setMessage('Enlace compartido.');}catch(e){setMessage(e instanceof Error&&e.name==='AbortError'?'Se canceló el envío.':'Puedes usar Copiar enlace o WhatsApp.');}}
 return <div className="share-panel"><p>Cada estudiante generará su propio intento. El enlace no contiene perfiles, respuestas ni resultados.</p><label className="field-label" htmlFor="share-url">Enlace del cuestionario o página</label><textarea id="share-url" readOnly value={url} onFocus={e=>e.target.select()}/><div className="share-actions"><button className="btn primary" onClick={copy}>Copiar enlace</button>{typeof navigator.share==='function'&&<button className="btn outline" onClick={native}>Compartir en mi dispositivo</button>}<a className="btn outline" href={`https://wa.me/?text=${encodeURIComponent('Practica en AulaQuiz: '+url)}`} target="_blank" rel="noopener noreferrer">WhatsApp</a></div><p role="status">{message}</p></div>;
}
