const { useState } = React;

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [tipo, setTipo] = useState('');
  const [genero, setGenero] = useState('');
  const [avaliacao, setAvaliacao] = useState('');
  const [tags, setTags] = useState('');
  const [capa, setCapa] = useState('');
  const [comentario, setComentario] = useState('');
  const [lista, setLista] = useState([
    {
      id: 1,
      titulo: "Duna",
      autor: "Frank Herbert",
      tipo: "movie",
      genero: "Ficção Científica",
      avaliacao: 5,
      tags: "épico, aventura",
      capa: "https://m.media-amazon.com/images/I/91sdwT7VKqL._AC_SY679_.jpg",
      comentario: "Um clássico da ficção científica."
    },
    {
      id: 2,
      titulo: "O Senhor dos Anéis",
      autor: "J.R.R. Tolkien",
      tipo: "book",
      genero: "Fantasia",
      avaliacao: 5,
      tags: "aventura, épico",
      capa: "https://images-na.ssl-images-amazon.com/images/I/51EstVXM1UL._SX331_BO1,204,203,200_.jpg",
      comentario: "Maravilhoso livro de fantasia."
    },
    {
      id: 3,
      titulo: "Stranger Things",
      autor: "The Duffer Brothers",
      tipo: "serie",
      genero: "Suspense",
      avaliacao: 4,
      tags: "sci-fi, mistério",
      capa: "https://upload.wikimedia.org/wikipedia/pt/3/38/Stranger_Things_logo.png",
      comentario: "Série ótima para maratonar."
    }
  ]);
  const [editandoId, setEditandoId] = useState(null);

  function limparCampos() {
    setTitulo('');
    setAutor('');
    setTipo('');
    setGenero('');
    setAvaliacao('');
    setTags('');
    setCapa('');
    setComentario('');
    setEditandoId(null);
  }

  function adicionarItem() {
    if (!titulo.trim()) {
      alert("O título é obrigatório!");
      return;
    }

    if (editandoId !== null) {
      // Edita
      setLista(lista.map(item => item.id === editandoId ? {
        id: editandoId,
        titulo,
        autor,
        tipo,
        genero,
        avaliacao: Number(avaliacao),
        tags,
        capa,
        comentario
      } : item));
      limparCampos();
    } else {
      // Adiciona
      const novo = {
        id: Date.now(),
        titulo,
        autor,
        tipo,
        genero,
        avaliacao: Number(avaliacao),
        tags,
        capa,
        comentario
      };
      setLista([...lista, novo]);
      limparCampos();
    }
  }

  function editarItem(id) {
    const item = lista.find(i => i.id === id);
    if (!item) return;
    setTitulo(item.titulo);
    setAutor(item.autor);
    setTipo(item.tipo);
    setGenero(item.genero);
    setAvaliacao(item.avaliacao);
    setTags(item.tags);
    setCapa(item.capa);
    setComentario(item.comentario);
    setEditandoId(id);
  }

  function excluirItem(id) {
    if (confirm("Deseja mesmo excluir este item?")) {
      setLista(lista.filter(item => item.id !== id));
      if (editandoId === id) limparCampos();
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
          <button onClick={adicionarItem}>{editandoId !== null ? "Salvar" : "Adicionar"}</button>
          {editandoId !== null && <button onClick={limparCampos}>Cancelar</button>}
        </div>
      </div>

      <div className="lista">
        {lista.map(item => (
          <div key={item.id} className="card">
            {item.capa && <img src={item.capa} alt={`Capa de ${item.titulo}`} />}
            <h3>{item.titulo}</h3>
            <p><strong>Autor:</strong> {item.autor}</p>
            <p><strong>Tipo:</strong> {item.tipo}</p>
            <p><strong>Gênero:</strong> {item.genero}</p>
            <p><strong>Avaliação:</strong> {item.avaliacao}</p>
            <p><strong>Tags:</strong> {item.tags}</p>
            <p><strong>Comentário:</strong> {item.comentario}</p>
            <div>
              <button onClick={() => editarItem(item.id)}>Editar</button>
              <button onClick={() => excluirItem(item.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
