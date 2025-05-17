const { useState } = React;

function App() {
  // Estados do formulário
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [tipo, setTipo] = useState('');
  const [genero, setGenero] = useState('');
  const [avaliacao, setAvaliacao] = useState('');
  const [tags, setTags] = useState('');
  const [capa, setCapa] = useState('');
  const [comentario, setComentario] = useState('');

  // Lista de itens
  const [itens, setItens] = useState([
    {
      id: 1,
      titulo: 'Duna',
      autor: 'Frank Herbert',
      tipo: 'movie',
      genero: 'Ficção Científica',
      avaliacao: 5,
      tags: ['épico', 'aventura'],
      capa: 'https://upload.wikimedia.org/wikipedia/pt/9/92/Dune_2021_poster.jpg',
      comentario: '“Clássico imperdível para fãs de sci-fi.”',
    },
    {
      id: 2,
      titulo: 'Senhor dos Anéis',
      autor: 'J.R.R. Tolkien',
      tipo: 'book',
      genero: 'Fantasia',
      avaliacao: 5,
      tags: ['fantasia', 'aventura', 'épico'],
      capa: 'https://upload.wikimedia.org/wikipedia/pt/8/87/The_Lord_of_the_Rings_The_Fellowship_of_the_Ring_%282001%29.png',
      comentario: '“Fantasia rica e detalhada.”',
    },
    {
      id: 3,
      titulo: 'Stranger Things',
      autor: 'The Duffer Brothers',
      tipo: 'serie',
      genero: 'Drama, Ficção Científica',
      avaliacao: 4,
      tags: ['suspense', 'anos 80'],
      capa: 'https://upload.wikimedia.org/wikipedia/en/f/f7/Stranger_Things_season_4.jpg',
      comentario: '“Muito envolvente e nostálgico.”',
    },
  ]);

  // Estado para edição
  const [editId, setEditId] = useState(null);

  // Limpar form
  const limparFormulario = () => {
    setTitulo('');
    setAutor('');
    setTipo('');
    setGenero('');
    setAvaliacao('');
    setTags('');
    setCapa('');
    setComentario('');
    setEditId(null);
  };

  // Adicionar ou salvar edição
  const handleSubmit = () => {
    if (!titulo || !tipo) {
      alert('Título e Tipo são obrigatórios!');
      return;
    }
    const item = {
      id: editId || Date.now(),
      titulo,
      autor,
      tipo,
      genero,
      avaliacao: Number(avaliacao),
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      capa: capa || 'https://via.placeholder.com/240x250?text=Sem+Capa',
      comentario: comentario ? `“${comentario}”` : '',
    };
    if (editId) {
      setItens(itens.map(i => (i.id === editId ? item : i)));
    } else {
      setItens([...itens, item]);
    }
    limparFormulario();
  };

  // Editar item
  const editarItem = (id) => {
    const item = itens.find(i => i.id === id);
    if (item) {
      setTitulo(item.titulo);
      setAutor(item.autor);
      setTipo(item.tipo);
      setGenero(item.genero);
      setAvaliacao(item.avaliacao);
      setTags(item.tags.join(', '));
      setCapa(item.capa);
      setComentario(item.comentario.replace(/^“|”$/g, '')); // Remove aspas para editar
      setEditId(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Excluir item
  const excluirItem = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      setItens(itens.filter(i => i.id !== id));
    }
  };

  return (
    <>
      <h1>Biblioteca de Favoritos</h1>
      <div className="formulario" role="form">
        <input
          type="text"
          placeholder="Título *"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          aria-label="Título"
        />
        <input
          type="text"
          placeholder="Criador/Autor"
          value={autor}
          onChange={e => setAutor(e.target.value)}
          aria-label="Criador ou Autor"
        />
        <select
          value={tipo}
          onChange={e => setTipo(e.target.value)}
          aria-label="Tipo"
        >
          <option value="">Tipo *</option>
          <option value="movie">Filme</option>
          <option value="book">Livro</option>
          <option value="serie">Série</option>
          <option value="music">Música</option>
          <option value="game">Jogo</option>
        </select>
        <input
          type="text"
          placeholder="Gênero"
          value={genero}
          onChange={e => setGenero(e.target.value)}
          aria-label="Gênero"
        />
        <input
          type="number"
          placeholder="Avaliação (0-5)"
          min="0"
          max="5"
          value={avaliacao}
          onChange={e => setAvaliacao(e.target.value)}
          aria-label="Avaliação"
        />
        <input
          type="text"
          placeholder="Tags (separadas por vírgula)"
          value={tags}
          onChange={e => setTags(e.target.value)}
          aria-label="Tags"
        />
        <input
          type="text"
          placeholder="URL da Capa"
          value={capa}
          onChange={e => setCapa(e.target.value)}
          aria-label="URL da Capa"
        />
        <textarea
          placeholder="Comentários"
          value={comentario}
          onChange={e => setComentario(e.target.value)}
          aria-label="Comentários"
        />
        <button className="botao-adicionar" onClick={handleSubmit}>
          {editId ? 'Salvar' : 'Adicionar'}
        </button>
      </div>

      <div className="lista" role="list">
        {itens.map(item => (
          <div className="card" key={item.id} role="listitem">
            <img src={item.capa} alt={`Capa de ${item.titulo}`} />
            <h2>{item.titulo}</h2>
            <p><strong>Autor:</strong> {item.autor || '-'}</p>
            <p><strong>Tipo:</strong> {item.tipo}</p>
            <p><strong>Gênero:</strong> {item.genero || '-'}</p>
            <p className="avaliacao"><strong>Avaliação:</strong> {item.avaliacao}</p>
            <p><strong>Tags:</strong> {item.tags.join(', ') || '-'}</p>
            <p className="comentario">{item.comentario || '-'}</p>
            <div className="botoes-card">
              <button onClick={() => editarItem(item.id)}>Editar</button>
              <button onClick={() => excluirItem(item.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
