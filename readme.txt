# Nome del Tuo Progetto
    IG
## Setup del Progetto

### Backend (Node.js e Prisma)


1. **Configurazione del Database con Prisma:**
   - Crea uno schema utilizzando Prisma e definisci i modelli nel file `schema.prisma`.

    implementazione metodi per gestire utenti, post, like, ecc.
    # Metodi da implementare

            ## Utenti (Users)

            ### Creazione di un Utente
            Metodo: `createUser(username, email, password)`
            Descrizione: Crea un nuovo utente nel database con 
            le informazioni fornite.

            ### Recupero di un Utente per ID
            Metodo: `getUserById(userId)`
            Descrizione: Restituisce le informazioni di un utente 
            basato sul suo ID.

            ### Recupero di Tutti gli Utenti
            Metodo: `getAllUsers()`
            Descrizione: Restituisce una lista di tutti gli utenti presenti 
            nel database.

            ### Creazione di un Post per un Utente
            Metodo: `createPost(userId, title, content)`
            Descrizione: Permette a un utente di creare un nuovo post.

            ## Post

            ### Recupero di un Post per ID
            Metodo: `getPostById(postId)`
            Descrizione: Restituisce le informazioni di un post basato sul suo ID.

            ### Recupero di Tutti i Post
            Metodo: `getAllPosts()`
            Descrizione: Restituisce una lista di tutti i post presenti nel database.

            ### Recupero dei Post di un Utente
            Metodo: `getUserPosts(userId)`
            Descrizione: Restituisce una lista di post pubblicati da un 
            utente specifico.

            ## Like

            ### Aggiunta di un Like a un Post
            Metodo: `addLikeToPost(userId, postId)`
            Descrizione: Permette a un utente di mettere un like su un post.

            ### Recupero dei Like di un Post
            Metodo: `getPostLikes(postId)`
            Descrizione: Restituisce una lista di like per un post specifico.

            ### Recupero dei Like di un Utente
            Metodo: `getUserLikes(userId)`
            Descrizione: Restituisce una lista di like effettuati da un 
            utente specifico.



### Frontend (React)

1. **Installazione:**
   - Assicurati di avere Node.js e npm installati.
   - Esegui `npm install` nella cartella del frontend per installare le dipendenze.

2. **Configurazione:**
   - Configura Axios per gestire le richieste HTTP al server backend.

3. **Avvio dell'App:**
   - Avvia l'app React con il comando `npm start`.

## Struttura del Progetto

- `/backend`: Contiene i file per il server Node.js.
- `/frontend`: Contiene i file per l'applicazione React.

## Struttura del Codice

### Backend (Node.js)
- `/backend/controllers`: Gestione delle richieste e delle operazioni CRUD con Prisma.
- `/backend/models`: Modelli e logica del database con Prisma.
- `/backend/routes`: Configurazioni delle route API.

### Frontend (React)
- `/frontend/src/components`: Contiene le componenti React dell'app.
- `/frontend/src/services`: Gestione delle richieste al backend con Axios.
- Altri possibili dettagli sulla struttura del codice del frontend.


