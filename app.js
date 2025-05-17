const { useState, useEffect } = React;

function App() {
  const [items, setItems] = useState(() => {
    // Carrega do localStorage se tiver
    const saved = localStorage.getItem('bibliotecaFavoritos');
    return saved ? JSON.parse(saved) : [
      // 3 exemplos iniciais
      {
        id: 1,
        titulo: 'Duna',
        autor: 'Frank Herbert',
        tipo: 'movie',
        genero: 'Ficção Científica',
        avaliacao: 5,
        tags: ['Sci-fi', 'Clássico'],
        capa: 'https://upload.wikimedia.org/wikipedia/pt/thumb/7/7f/Dune_2021_Poster.jpg/220px-Dune_2021_Poster.jpg',
        comentario: 'Um épico de ficção científica.'
      },
      {
        id: 2,
        titulo: 'O Senhor dos Anéis',
        autor: 'J.R.R. Tolkien',
        tipo: 'book',
        genero: 'Fantasia',
        avaliacao: 5,
        tags: ['Fantasia', 'Aventura'],
        capa: 'https://upload.wikimedia.org/wikipedia/pt/thumb/8/86/Senhor_dos_aneis_capa.jpg/220px-Senhor_dos_aneis_capa.jpg',
        comentario: 'Clássico da literatura fantástica.'
      },
      {
        id: 3,
        titulo: 'Breaking Bad',
        autor: 'Vince Gilligan',
        tipo: 'serie',
        genero: 'Drama',
        avaliacao: 5,
        tags: ['Crime', 'Drama'],
        capa: 'https://upload.wikimedia.org/wikipedia/pt/thumb/e/e3/Breaking_Bad_title_card.png/220px-Breaking_Bad_title_card.png',
        comentario: 'Série aclamada pela crítica.'
      },
    ];
  });

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [tipo, setTipo] = useState('');
  const [genero, setGenero] = useState('');
  const [avaliacao, setAvaliacao] = useState('');
  const [tags, setTags] = useState('');
  const [capa, setCapa] = useState('');
  const [comentario, setComentario] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem('bibliotecaFavoritos', JSON.stringify(items));
  }, [items]);

  function resetForm() {
    setTitulo('');
    setAutor('');
    setTipo('');
    setGenero('');
    setAvaliacao('');
    setTags('');
    setCapa('');
    setComentario('');
    setEditId(null);
  }

  function adicionarItem() {
    if (!titulo || !tipo) {
      alert('Título e Tipo são obrigatórios');
      return;
    }
    const novoItem = {
      id: editId ? editId : Date.now(),
      titulo,
      autor,
      tipo,
      genero,
      avaliacao: Number(avaliacao) || 0,
      tags: tags.split(',').map(t => t.trim()).filter(t => t),
      capa,
      comentario,
    };

    if (editId) {
      setItems(items.map(item => (item.id === editId ? novoItem : item)));
    } else {
      setItems([...items, novoItem]);
    }
    resetForm();
  }

  function editarItem(id) {
    const item = items.find(i => i.id === id);
    if (!item) return;
    setTitulo(item.titulo);
    setAutor(item.autor);
    setTipo(item.tipo);
    setGenero(item.genero);
    setAvaliacao(item.avaliacao);
    setTags(item.tags.join(', '));
    setCapa(item.capa);
    setComentario(item.comentario);
    setEditId(id);
  }

  function excluirItem(id) {
    if (window.confirm('Tem certeza que quer excluir este item?')) {
      setItems(items.filter(i => i.id !== id));
      if (editId === id) resetForm();
    }
  }

  return (
    <>
      <div className="formulario">
        <h1>Biblioteca de Favoritos</h1>
        <div className="campos">
          <input type="text" placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} />
          <input type="text" placeholder="Criador/Autor" value={autor} onChange={e => setAutor(e.target.value)} />
          <select value={tipo} onChange={e => setTipo(e.target.value)}>
            <option value="">Tipo</option>
            <option value="movie">Filme</option>
            <option value="book">Livro</option>
            <option value="serie">Série</option>
            <option value="music">Música</option>
            <option value="game">Jogo</option>
          </select>
          <input type="text" placeholder="Gênero" value={genero} onChange={e => setGenero(e.target.value)} />
          <input type="number" placeholder="Avaliação (0-5)" min="0" max="5" value={avaliacao} onChange={e => setAvaliacao(e.target.value)} />
          <input type="text" placeholder="Tags (separadas por vírgula)" value={tags} onChange={e => setTags(e.target.value)} />
          <input className="campo-longo" type="text" placeholder="URL da Capa" value={capa} onChange={e => setCapa(e.target.value)} />
          <textarea className="campo-longo" placeholder="Comentários" value={comentario} onChange={e => setComentario(e.target.value)} />
        </div>
        <div className="botoes">
          <button onClick={adicionarItem}>{editId ? 'Salvar' : 'Adicionar'}</button>
          {editId && <button onClick={resetForm}>Cancelar</button>}
        </div>
      </div>

      <div className="lista">
        {items.map(item => (
          <div className="card" key={item.id}>
            {item.capa ? (
              <img src={item.capa} alt={`Capa de ${item.titulo}`} />
            ) : (
              <div style={{height: '250px', backgroundColor: '#555', borderRadius: '8px', marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ccc'}}>
                Sem imagem
              </div>
            )}
            <h3>{item.titulo}</h3>
            <p><b>Autor:</b> {item.autor || '—'}</p>
            <p><b>Tipo:</b> {item.tipo}</p>
            <p><b>Gênero:</b> {item.genero || '—'}</p>
            <p className="avaliacao"><b>Avaliação:</b> {item.avaliacao}/5</p>
            <p><b>Tags:</b> {item.tags.join(', ') || '—'}</p>
            <p><b>Comentário:</b> {item.comentario || '—'}</p>

            <div style={{display: 'flex', gap: '0.5rem', marginTop: '1rem'}}>
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
