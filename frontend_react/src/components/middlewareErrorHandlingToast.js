import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.timeout = 10000;

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    toast.error('Richie  sta non valida: ' + error.response.data.message);
                    break;
                case 401:
                    toast.error('Non autorizzato: Effettua il login per continuare.');
                    break;
                case 403:
                    toast.error('Accesso negato: Non hai i permessi per questa risorsa.');
                    break;
                case 404:
                    toast.error('Risorsa non trovata: ' + error.response.data.message);
                    break;
                case 500:
                    toast.error('Errore interno del server');
                    break;
                default:
                    toast.error('Errore del server: ' + error.response.data.message);
            }
        } else if (error.request) {
            if (error.code === 'ECONNABORTED') {
                toast.error('La richiesta è stata annullata a causa di un timeout.');
            } else {
                toast.error('La richiesta è stata inviata ma nessuna risposta è stata ricevuta');
            }
        } else {
            // Qualcosa ha causato l'errore nella richiesta
            toast.error('Errore nella richiesta: ' + error.message);
        }

        // Opzionale: log dell'errore per il debugging
        console.error(error);

        return Promise.reject(error);
    }
);
