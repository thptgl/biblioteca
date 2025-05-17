const { useState } = React;

function BibliotecaFavoritos() {
  const [filmes, setFilmes] = useState([
    {
      id: 1,
      titulo: 'Duna',
      autor: 'Autor Exemplo',
      genero: 'Ficção Científica',
      avaliacao: 5,
      tags: ['épico', 'ficção'],
      comentario: 'Ótimo filme!',
    },
    // ... outros filmes
  ]);

  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState({
    titulo: '',
    autor: '',
    genero: '',
    avaliacao: '',
    tags: '',
    comentario: '',
  });

  // Inicia edição
  function iniciarEdicao(filme) {
    setEditandoId(filme.id);
    setForm({
      titulo: filme.titulo,
      autor: filme.autor,
      genero: filme.genero,
      avaliacao: filme.avaliacao,
      tags: filme.tags.join(', '),
      comentario: filme.comentario,
    });
  }

  // Cancela edição
  function cancelarEdicao() {
    setEditandoId(null);
    setForm({
      titulo: '',
      autor: '',
      genero: '',
      avaliacao: '',
      tags: '',
      comentario: '',
    });
  }

  // Salva edição
  function salvarEdicao(id) {
    setFilmes((oldFilmes) =>
      oldFilmes.map((f) =>
        f.id === id
          ? {
              ...f,
              titulo: form.titulo,
              autor: form.autor,
              genero: form.genero,
              avaliacao: Number(form.avaliacao),
              tags: form.tags.split(',').map((t) => t.trim()),
              comentario: form.comentario,
            }
          : f
      )
    );
    cancelarEdicao();
  }

  // Excluir filme
  function excluirFilme(id) {
    setFilmes((oldFilmes) => oldFilmes.filter((f) => f.id !== id));
  }

  // Atualiza campos do form
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((old) => ({ ...old, [name]: value }));
  }

  return (
    <div>
      <h1>Biblioteca de Favoritos</h1>

      {filmes.map((filme) => (
        <div key={filme.id} className="filme-card">
          {editandoId === filme.id ? (
            <>
              <input
                name="titulo"
                value={form.titulo}
                onChange={handleChange}
                placeholder="Título"
              />
              <input
                name="autor"
                value={form.autor}
                onChange={handleChange}
                placeholder="Autor"
              />
              <input
                name="genero"
                value={form.genero}
                onChange={handleChange}
                placeholder="Gênero"
              />
              <input
                name="avaliacao"
                type="number"
                min="0"
                max="5"
                value={form.avaliacao}
                onChange={handleChange}
                placeholder="Avaliação"
              />
              <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="Tags (vírgula separados)"
              />
              <textarea
                name="comentario"
                value={form.comentario}
                onChange={handleChange}
                placeholder="Comentário"
              />
              <button onClick={() => salvarEdicao(filme.id)}>Salvar</button>
              <button onClick={cancelarEdicao}>Cancelar</button>
            </>
          ) : (
            <>
              <h2>{filme.titulo}</h2>
              <p><b>Autor:</b> {filme.autor}</p>
              <p><b>Gênero:</b> {filme.genero}</p>
              <p><b>Avaliação:</b> {filme.avaliacao}</p>
              <p><b>Tags:</b> {filme.tags.join(', ')}</p>
              <p><b>Comentário:</b> {filme.comentario}</p>
              <button onClick={() => iniciarEdicao(filme)}>Editar</button>
              <button onClick={() => excluirFilme(filme.id)}>Excluir</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<BibliotecaFavoritos />);
