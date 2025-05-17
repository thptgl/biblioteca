const { useState } = React;

function BibliotecaFavoritos() {
  const [itens, setItens] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroGenero, setFiltroGenero] = useState("");
  const [form, setForm] = useState({
    titulo: "",
    autor: "",
    tipo: "filme",
    genero: "",
    avaliacao: "",
    tags: "",
    capa: "",
    comentario: "",
  });

  const tipos = ["filme", "livro", "série", "música", "jogo"];

  const adicionarItem = () => {
    const novaAvaliacao = parseFloat(form.avaliacao);
    if (isNaN(novaAvaliacao) || novaAvaliacao < 0 || novaAvaliacao > 5) {
      alert("Avaliação deve ser entre 0 e 5");
      return;
    }

    const novoItem = {
      id: Date.now(),
      ...form,
      avaliacao: novaAvaliacao,
      tags: form.tags.split(",").map((t) => t.trim()),
    };
    setItens([novoItem, ...itens]);
    setForm({
      titulo: "",
      autor: "",
      tipo: "filme",
      genero: "",
      avaliacao: "",
      tags: "",
      capa: "",
      comentario: "",
    });
  };

  const excluirItem = (id) => {
    setItens(itens.filter((i) => i.id !== id));
  };

  const filtrados = itens.filter((item) => {
    const correspondeBusca =
      item.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(busca.toLowerCase())
      );
    const correspondeTipo =
      filtroTipo === "todos" || item.tipo === filtroTipo;
    const correspondeGenero =
      filtroGenero === "" ||
      item.genero.toLowerCase().includes(filtroGenero.toLowerCase());
    return correspondeBusca && correspondeTipo && correspondeGenero;
  });

  return (
    <div className="app">
      <h1>📚 Biblioteca de Favoritos</h1>

      <div className="formulario">
        <input
          placeholder="Título"
          value={form.titulo}
          onChange={(e) => setForm({ ...form, titulo: e.target.value })}
        />
        <input
          placeholder="Criador/Autor"
          value={form.autor}
          onChange={(e) => setForm({ ...form, autor: e.target.value })}
        />
        <select
          value={form.tipo}
          onChange={(e) => setForm({ ...form, tipo: e.target.value })}
        >
          {tipos.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <input
          placeholder="Gênero"
          value={form.genero}
          onChange={(e) => setForm({ ...form, genero: e.target.value })}
        />
        <input
          type="number"
          placeholder="Avaliação (0-5)"
          value={form.avaliacao}
          onChange={(e) => setForm({ ...form, avaliacao: e.target.value })}
        />
        <input
          placeholder="Tags (separadas por vírgula)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
        />
        <input
          placeholder="URL da Capa"
          value={form.capa}
          onChange={(e) => setForm({ ...form, capa: e.target.value })}
        />
        <textarea
          placeholder="Comentários"
          value={form.comentario}
          onChange={(e) => setForm({ ...form, comentario: e.target.value })}
        />
        <button onClick={adicionarItem}>Adicionar</button>
      </div>

      <div className="filtros">
        <input
          placeholder="Buscar..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <select
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
        >
          <option value="todos">Todos os tipos</option>
          {tipos.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <input
          placeholder="Filtrar por gênero"
          value={filtroGenero}
          onChange={(e) => setFiltroGenero(e.target.value)}
        />
      </div>

      <div className="lista">
        {filtrados.map((item) => (
          <div key={item.id} className="card">
            {item.capa && <img src={item.capa} alt={item.titulo} />}
            <h2>{item.titulo}</h2>
            <p><b>Autor:</b> {item.autor}</p>
            <p><b>Tipo:</b> {item.tipo}</p>
            <p><b>Gênero:</b> {item.genero}</p>
            <p><b>Avaliação:</b> {item.avaliacao}/5</p>
            <p><b>Tags:</b> {item.tags.join(", ")}</p>
            <p><b>Comentário:</b> {item.comentario}</p>
            <button onClick={() => excluirItem(item.id)}>Excluir</button>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<BibliotecaFavoritos />);
