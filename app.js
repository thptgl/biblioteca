const { useState, useEffect } = React;

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [tipo, setTipo] = useState('');
  const [genero, setGenero] = useState('');
  const [avaliacao, setAvaliacao] = useState('');
  const [tags, setTags] = useState('');
  const [capa, setCapa] = useState('');
  const [comentario, setComentario] = useState('');
  const [itens, setItens] = useState(() => {
    const saved = localStorage.getItem('bibliotecaItens');
    return saved ? JSON.parse(saved) : [];
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem('bibliotecaItens', JSON.stringify(itens));
  }, [itens]);

  function limparCampos() {
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
    if (!titulo.trim()) {
      alert('O título é obrigatório.');
      return;
    }

    const novoItem = {
      id: editId || Date.now(),
      titulo,
      autor,
      tipo,
      genero,
      avaliacao: Number(avaliacao),
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      capa,
      comentario,
    };

    if (editId) {
      setItens(itens.map(i => (i.id === editId ? novoItem : i)));
    } else {
      setItens([...itens, novoItem]);
    }

    limparCampos();
  }

  function editarItem(id) {
    const item = itens.find(i => i.id === id);
    if (item) {
      setTitulo(item.titulo);
      setAutor(item.autor);
      setTipo(item.tipo);
      setGenero(item.genero);
      setAvaliacao(item.avaliacao);
      setTags(item.tags.join(', '));
      setCapa(item.capa);
      setComentario(item.comentario);
      setEditId(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function excluirItem(id) {
    if (confirm('Deseja realmente excluir este item?')) {
      setItens(itens.filter(i => i.id !== id));
      if (editId === id) limparCampos();
    }
  }

  return (
    <>
      <div className="formulario">
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
        <input type="number" min="0" max="5" placeholder="Avaliação (0-5)" value={avaliacao} onChange={e => setAvaliacao(e.target.value)} />
        <input type="text" placeholder="Tags (separadas por vírgula)" value={tags} onChange={e => setTags(e.target.value)} />
        <input type="text" placeholder="URL da Capa" value={capa} onChange={e => setCapa(e.target.value)} />
        <textarea placeholder="Comentários" value={comentario} onChange={e => setComentario(e.target.value)} />
        <div className="botoes">
          <button onClick={adicionarItem}>{editId ? 'Salvar Alterações' : 'Adicionar'}</button>
        </div>
      </div>

      <h1>Biblioteca de Favoritos</h1>

      <div className="lista">
        {itens.length === 0 && <p>Nenhum item cadastrado.</p>}
        {itens.map(item => (
          <div className="card" key={item.id}>
            {item.capa ? (
              <img src={item.capa} alt={`Capa de ${item.titulo}`} />
            ) : (
              <div style={{height:'250px', background:'#444', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', color:'#888'}}>
                Sem capa
              </div>
            )}
            <h3>{item.titulo}</h3>
            <p><strong>Autor:</strong> {item.autor || '-'}</p>
            <p><strong>Tipo:</strong> {item.tipo || '-'}</p>
            <p><strong>Gênero:</strong> {item.genero || '-'}</p>
            <p><strong>Avaliação:</strong> {item.avaliacao >= 0 ? item.avaliacao : '-'}</p>
            <p><strong>Tags:</strong> {item.tags.length > 0 ? item.tags.join(', ') : '-'}</p>
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
