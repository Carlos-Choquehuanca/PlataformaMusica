document.addEventListener('DOMContentLoaded', async () => {
    const logoutButton = document.getElementById('logoutButton');
    const linkLista = document.getElementById('link-lista');
    const linkRegistro = document.getElementById('link-registro');
    const linkEditar = document.getElementById('link-editar');

    const sectionLista = document.getElementById('section-lista');
    const sectionRegistro = document.getElementById('section-registro');
    const sectionEditar = document.getElementById('section-editar');
    const audioPlayer = document.createElement('audio'); // Crea el reproductor de audio
    document.body.appendChild(audioPlayer); // Añádelo al cuerpo del documento
    const searchInput = document.getElementById('searchInput');

    linkLista.addEventListener('click', () => {
        sectionLista.style.display = 'block';
        sectionRegistro.style.display = 'none';
        sectionEditar.style.display = 'none';
        loadMusics();
    });

    linkRegistro.addEventListener('click', () => {
        sectionLista.style.display = 'none';
        sectionRegistro.style.display = 'block';
        sectionEditar.style.display = 'none';
    });

    linkEditar.addEventListener('click', () => {
        sectionLista.style.display = 'none';
        sectionRegistro.style.display = 'none';
        sectionEditar.style.display = 'block';
    });

    logoutButton.addEventListener('click', () => {
        document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.location.href = "/";
    });

    document.getElementById('registerMusicForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
            const response = await fetch('/musics', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (result.status === 'ok') {
                sectionLista.style.display = 'block';
                sectionRegistro.style.display = 'none';
                sectionEditar.style.display = 'none';
                loadMusics();
            }
        } catch (error) {
            console.error('Error al registrar la música:', error);
        }
    });

    document.getElementById('editMusicForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const id = document.getElementById('musicId').value;
        try {
            const response = await fetch(`/musics/${id}`, {
                method: 'PUT',
                body: formData
            });
            const result = await response.json();
            if (result.status === 'ok') {
                sectionLista.style.display = 'block';
                sectionRegistro.style.display = 'none';
                sectionEditar.style.display = 'none';
                loadMusics();
            }
        } catch (error) {
            console.error('Error al editar la música:', error);
        }
    });

    searchInput.addEventListener('input', () => {
        loadMusics(searchInput.value);
    });

    async function loadMusics(query = '') {
        try {
            const response = await fetch('/musics');
            const result = await response.json();
            if (result.status === 'ok') {
                const tbody = document.querySelector('table tbody');
                tbody.innerHTML = '';
                const filteredData = result.data.filter(music => 
                    music.title.toLowerCase().includes(query.toLowerCase()) ||
                    music.author.toLowerCase().includes(query.toLowerCase()) ||
                    music.type.toLowerCase().includes(query.toLowerCase()) ||
                    music.description.toLowerCase().includes(query.toLowerCase())
                );
                filteredData.forEach(music => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${music.title}</td>
                        <td>${music.author}</td>
                        <td>${music.type}</td>
                        <td>${music.description}</td>
                        <td>
                            
                            <button class="play-button" data-file="${music.audioFile}">Reproducir</button>
                            <button class="pause-button" data-file="${music.audioFile}">Pausar</button>
                        </td>
                    `;
                    tbody.appendChild(tr);
                });
                attachEditEventHandlers();
                attachPlayEventHandlers();
                attachPauseEventHandlers();
            }
        } catch (error) {
            console.error('Error al cargar las músicas:', error);
        }
    }

    function attachEditEventHandlers() {
        document.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const musicId = event.target.getAttribute('data-id');
                editMusic(musicId);
            });
        });
    }

    function attachPlayEventHandlers() {
        document.querySelectorAll('.play-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const audioFile = event.target.getAttribute('data-file');
                const audioUrl = `/${audioFile}`; // Asegúrate de que la URL esté correcta
                audioPlayer.src = audioUrl;
                audioPlayer.style.display = 'block';
                audioPlayer.play();
            });
        });
    }

    function attachPauseEventHandlers() {
        document.querySelectorAll('.pause-button').forEach(button => {
            button.addEventListener('click', () => {
                audioPlayer.pause();
            });
        });
    }

    async function editMusic(id) {
        try {
            const response = await fetch(`/musics/${id}`);
            const result = await response.json();
            if (result.status === 'ok') {
                const music = result.data;
                document.getElementById('musicId').value = music.id;
                document.getElementById('editTitle').value = music.title;
                document.getElementById('editAuthor').value = music.author;
                document.getElementById('editType').value = music.type;
                document.getElementById('editDescription').value = music.description;
                sectionLista.style.display = 'none';
                sectionRegistro.style.display = 'none';
                sectionEditar.style.display = 'block';
            }
        } catch (error) {
            console.error('Error al obtener los detalles de la música:', error);
        }
    }

    // Carga inicial de músicas
    loadMusics();
});
