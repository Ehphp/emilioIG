# Nome del Tuo Progetto
    IG

    implementazione metodi per gestire utenti, post, like, ecc.
    # Metodi da implementare

            ## Utenti (Users)

            ### Creazione di un Utente
            Metodo: `createUser(username, email, password)`
           

            ### Recupero di un Utente per ID
            Metodo: `getUserById(userId)`
          
            ### Recupero di Tutti gli Utenti
            Metodo: `getAllUsers()`
           

            ### Creazione di un Post per un Utente
            Metodo: `createPost(userId, title, content)`

            ## Post

            ### Recupero di un Post per ID
            Metodo: `getPostById(postId)`

            ### Recupero di Tutti i Post
            Metodo: `getAllPosts()`

            ### Recupero dei Post di un Utente
            Metodo: `getUserPosts(userId)`
      

            ## Like

            ### Aggiunta di un Like a un Post
            Metodo: `addLikeToPost(userId, postId)`

            ### Recupero dei Like di un Post
            Metodo: `getPostLikes(postId)`

            ### Recupero dei Like di un Utente
            Metodo: `getUserLikes(userId)`
         ## commenti 

        ##


### Frontend (React)
### lol 
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


