const { useState } = React;

function BibliotecaFavoritos() {
  const exemplos = [
    {
      id: 1,
      titulo: "Matrix",
      autor: "The Wachowskis",
      tipo: "filme",
      genero: "Ação",
      avaliacao: 4.5,
      tags: ["futurista", "ação"],
      capa: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg",
      comentario: "Clássico do sci-fi.",
    }
  ];

  const [itens, setItens] = useState(exemplos);
  const [form, setForm] = useState({
    titulo: "", autor: "", tipo: "filme", genero: "", avaliacao: "", tags: "", capa: "", comentario: "", id: null
  });

  const [busca, setBusca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroGenero, setFiltroGenero] = useState("");

  const tipos = ["filme", "livro", "série", "música", "jogo"];

  const salvarItem = () => {
    const avaliacao = parseFloat(form.avaliacao);
    if (isNaN(avaliacao) || avaliacao < 0 || avaliacao > 5) {
      alert("Avaliação deve ser entre 0 e 5.");
      return;
    }

    const novoItem = {
      ...form,
      id: form.id || Date.now(),
      avaliacao,
      tags: form.tags.split(",").map((t) => t.trim()),
    };

    if (form.id) {
      setItens(itens.map((i) => (i.id === form.id ? novoItem : i)));
    } else {
      setItens([novoItem, ...itens]);
    }

    limparFormulario();
  };

  const editarItem = (item) => setForm({ ...item, tags: item.tags.join(", ") });

  const excluirItem = (id) => setItens(itens.filter((i) => i.id !== id));

  const limparFormulario = () =>
    setForm({ titulo: "", autor: "", tipo: "filme", genero: "", avaliacao: "", tags: "", capa: "", comentario: "", id: null });

  const filtrados = itens.filter((item) => {
    const buscaOk = item.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(busca.toLowerCase()));
    const tipoOk = filtroTipo === "todos" || item.tipo === filtroTipo;
    const generoOk = filtroGenero === "" || item.genero.toLowerCase().includes(filtroGenero.toLowerCase());
    return buscaOk && tipoOk && generoOk;
  });

  return (
    <div className="app">
      <h1>Biblioteca de Favoritos</h1>

      <div className="formulario">
        <input placeholder="Título" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
        <input placeholder="Autor" value={form.autor} onChange={(e) => setForm({ ...form, autor: e.target.value })} />
        <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
          {tipos.map((t) => <option key={t}>{t}</option>)}
        </select>
        <input placeholder="Gênero" value={form.genero} onChange={(e) => setForm({ ...form, genero: e.target.value })} />
        <input type="number" placeholder="Avaliação (0-5)" value={form.avaliacao} onChange={(e) => setForm({ ...form, avaliacao: e.target.value })} />
        <input placeholder="Tags (separadas por vírgula)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
        <input placeholder="URL da Capa" value={form.capa} onChange={(e) => setForm({ ...form, capa: e.target.value })} />
        <textarea placeholder="Comentário" value={form.comentario} onChange={(e) => setForm({ ...form, comentario: e.target.value })} />
        <div className="botoes">
          <button onClick={salvarItem}>{form.id ? "Atualizar" : "Adicionar"}</button>
          {form.id && <button onClick={limparFormulario}>Cancelar</button>}
        </div>
      </div>

      <div className="filtros">
        <input placeholder="Buscar por título ou tag..." value={busca} onChange={(e) => setBusca(e.target.value)} />
        <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
          <option value="todos">Todos os tipos</option>
          {tipos.map((t) => <option key={t}>{t}</option>)}
        </select>
        <input placeholder="Filtrar por gênero..." value={filtroGenero} onChange={(e) => setFiltroGenero(e.target.value)} />
      </div>

      <div className="lista">
        {filtrados.map((item) => (
          <div key={item.id} className="card">
            <img src={item.capa} alt={item.titulo} />
            <h2>{item.titulo}</h2>
            <p><b>Autor:</b> {item.autor}</p>
            <p><b>Tipo:</b> {item.tipo}</p>
            <p><b>Gênero:</b> {item.genero}</p>
            <p><b>Avaliação:</b> {item.avaliacao}/5</p>
            <p><b>Tags:</b> {item.tags.join(", ")}</p>
            <p><b>Comentário:</b> {item.comentario}</p>
            <div className="botoes">
              <button onClick={() => editarItem(item)}>Editar</button>
              <button onClick={() => excluirItem(item.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<BibliotecaFavoritos />);
