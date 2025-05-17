const { useState } = React;

function App() {
  // Estados dos campos
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
      tags: 'épico, ficção',
      capa: 'https://m.media-amazon.com/images/I/81rAGH+l0GL._AC_SY679_.jpg',
      comentario: 'Filme incrível e visual impressionante.'
    },
    {
      id: 2,
      titulo: '1984',
      autor: 'George Orwell',
      tipo: 'book',
      genero: 'Distopia',
      avaliacao: 4,
      tags: 'clássico, política',
      capa: 'https://images-na.ssl-images-amazon.com/images/I/71kxa1-0mfL.jpg',
      comentario: 'Livro que faz refletir.'
    },
    {
      id: 3,
      titulo: 'Breaking Bad',
      autor: 'Vince Gilligan',
      tipo: 'serie',
      genero: 'Drama',
      avaliacao: 5,
      tags: 'intenso, viciante',
      capa: 'https://upload.wikimedia.org/wikipedia/en/6/61/Breaking_Bad_title_card.png',
      comentario: 'Série top, vale muito a pena.'
    }
  ]);

  // Estado para editar
  const [editId, setEditId] = useState(null);

  // Adicionar ou salvar edição
  const adicionarItem = () => {
    if (!titulo || !tipo) {
      alert('Preencha pelo menos o título e o tipo.');
      return;
    }

    if (editId) {
      // Editar item
      setItens(itens.map(item => item.id === editId
        ? {
          ...item,
          titulo, autor, tipo, genero,
          avaliacao: Number(avaliacao),
          tags, capa, comentario
        }
        : item));
      setEditId(null);
    } else {
      // Novo item
      const novoItem = {
        id: Date.now(),
        titulo,
        autor,
        tipo,
        genero,
        avaliacao: Number(avaliacao),
        tags,
        capa,
        comentario,
      };
      setItens([...itens, novoItem]);
    }
    limparCampos();
  };

  const limparCampos = () => {
    setTitulo('');
    setAutor('');
    setTipo('');
    setGenero('');
    setAvaliacao('');
    setTags('');
    setCapa('');
    setComentario('');
  };

  // Carregar item para edição
  const editarItem = (id) => {
    const item = itens.find(i => i.id === id);
    if (item) {
      setTitulo(item.titulo);
      setAutor(item.autor);
      setTipo(item.tipo);
      setGenero(item.genero);
      setAvaliacao(item.avaliacao);
      setTags(item.tags);
      setCapa(item.capa);
      setComentario(item.comentario);
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
      <div className="formulario">
        <h1>Biblioteca de Favoritos</h1>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Criador/Autor"
          value={autor}
          onChange={e => setAutor(e.target.value)}
        />
        <select value={tipo} onChange={e => setTipo(e.target.value)}>
          <option value="">Tipo</option>
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
        />
        <input
          type="number"
          min="0"
          max="5"
          placeholder="Avaliação (0-5)"
          value={avaliacao}
          onChange={e => setAvaliacao(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tags (separadas por vírgula)"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />
        <input
          type="text"
          placeholder="URL da Capa"
          value={capa}
          onChange={e => setCapa(e.target.value)}
        />
        <textarea
          placeholder="Comentários"
          value={comentario}
          onChange={e => setComentario(e.target.value)}
        />
        <div className="botoes">
          <button onClick={adicionarItem}>
            {editId ? 'Salvar Alterações' : 'Adicionar'}
          </button>
        </div>
      </div>

      <div className="lista">
        {itens.map(item => (
          <div className="card" key={item.id}>
            {item.capa ? (
              <img src={item.capa} alt={`Capa de ${item.titulo}`} />
            ) : (
              <div style={{ height: '160px', backgroundColor: '#333', borderRadius: '8px', marginBottom: '1rem' }}></div>
            )}
            <h3>{item.titulo}</h3>
            <p><strong>Autor:</strong> {item.autor || '-'}</p>
            <p><strong>Tipo:</strong> {item.tipo}</p>
            <p><strong>Gênero:</strong> {item.genero || '-'}</p>
            <p><strong>Avaliação:</strong> {item.avaliacao}</p>
            <p><strong>Tags:</strong> {item.tags || '-'}</p>
            <p><strong>Comentário:</strong> {item.comentario || '-'}</p>
            <div className="acoes">
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
