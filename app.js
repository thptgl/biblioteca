const { useState } = React;

function BibliotecaFavoritos() {
  const [filmes, setFilmes] = useState([
    {
      id: 1,
      titulo: 'Duna',
      autor: 'Frank Herbert',
      genero: 'Ficção Científica',
      avaliacao: 5,
      tags: ['épico', 'sci-fi'],
      comentario: 'Muito bom!',
    }
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

  function iniciarEdicao(filme) {
    setEditandoId(filme.id);
    setForm({
      titulo: filme.titulo,
      autor: filme.autor,
      genero: filme.genero,
      avaliacao: filme.avaliacao.toString(),
      tags: filme.tags.join(', '),
      comentario: filme.comentario,
    });
  }

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

  function salvarEdicao(id) {
    const avaliacaoNumerica = parseFloat(form.avaliacao);
    if (isNaN(avaliacaoNumerica) || avaliacaoNumerica < 0 || avaliacaoNumerica > 5) {
      alert('Avaliação deve ser um número entre 0 e 5');
      return;
    }

    setFilmes((prev) =>
      prev.map((f) =>
        f.id === id
          ? {
              ...f,
              titulo: form.titulo,
              autor: form.autor,
              genero: form.genero,
              avaliacao: avaliacaoNumerica,
              tags: form.tags.split(',').map((tag) => tag.trim()),
              comentario: form.comentario,
            }
          : f
      )
    );
    cancelarEdicao();
  }

  function excluirFilme(id) {
    setFilmes((prev) => prev.filter((f) => f.id !== id));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
                step="0.1"
                value={form.avaliacao}
                onChange={handleChange}
                placeholder="Avaliação"
              />
              <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="Tags (separadas por vírgula)"
              />
              <textarea
                name="comentario"
                value={form.comentario}
