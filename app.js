const { useState, useEffect } = React;

function App() {
  const [itens, setItens] = useState(() => {
    const saved = localStorage.getItem('biblioteca-itens');
    return saved ? JSON.parse(saved) : [];
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
    localStorage.setItem('biblioteca-itens', JSON.stringify(itens));
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

    let comentarioFormatado = comentario.trim();
    if (comentarioFormatado) {
      if (!comentarioFormatado.startsWith('"') && !comentarioFormatado.endsWith('"')) {
        comentarioFormatado = `"${comentarioFormatado}"`;
      }
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
      comentario: comentarioFormatado,
    };

    if (editId) {
      setItens(itens.map(i => (i.id === editId ? novoItem : i)));
    } else {
      setItens([...itens, novoItem]);
    }

    limparCampos();
  }

  function excluirItem(id) {
    if (confirm('Quer mesmo excluir este item?')) {
      setItens(itens.filter(i => i.id !== id));
    }
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
      setComentario(item.comentario ? item.comentario.replace(/^"|"$/g, '') : '');
      setEditId(id);
    }
  }

  return (
    <div>
      <h1>Biblioteca de Favoritos</h1>

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
        <input type="number" placeholder="Avaliação (0-5)" value={avaliacao} onChange={e => setAvaliacao(e.target.value)} />
        <input type="text" placeholder="Tags" value={tags} onChange={e => setTags(e.target.value)} />
        <input className="campo-longo" type="text" placeholder="URL da Capa" value={capa} onChange={e => setCapa(e.target.value)} />
        <textarea className="campo-longo" placeholder="Comentários" value={comentario} onChange={e => setComentario(e.target.value)} />
        <div className="botoes">
          <button onClick={adicionarItem}>{editId ? 'Salvar' : 'Adicionar'}</button>
        </div>
      </div>

      <div className="lista">
        {itens.map(item => (
          <div key={item.id} className="card">
            {item.capa && <img src={item.capa} alt={`Capa de ${item.titulo}`} />}
            <h3>{item.titulo}</h3>
            <p><strong>Autor:</strong> {item
