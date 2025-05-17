const { useState, useEffect } = React;

function BibliotecaFavoritos() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("biblioteca");
    return saved ? JSON.parse(saved) : [];
  });

  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [form, setForm] = useState({
    title: "",
    type: "movie",
    genre: "",
    creator: "",
    rating: "",
    tags: "",
    comments: "",
    cover: ""
  });

  useEffect(() => {
    localStorage.setItem("biblioteca", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    let result = [...items];
    const term = searchTerm.toLowerCase();
    if (term) {
      result = result.filter(item =>
        item.title.toLowerCase().includes(term) ||
        item.creator.toLowerCase().includes(term) ||
        item.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    if (selectedType !== 'all') result = result.filter(i => i.type === selectedType);
    if (selectedGenre !== 'all') result = result.filter(i => i.genre === selectedGenre);
    setFilteredItems(result);
  }, [items, searchTerm, selectedType, selectedGenre]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newItem = {
      ...form,
      id: Date.now(),
      tags: form.tags.split(',').map(t => t.trim()),
      rating: parseFloat(form.rating)
    };
    setItems([newItem, ...items]);
    setForm({ title: "", type: "movie", genre: "", creator: "", rating: "", tags: "", comments: "", cover: "" });
  };

  const genres = ["all", ...new Set(items.map(i => i.genre))];

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", fontFamily: "Arial" }}>
      <h1>📚 Biblioteca de Favoritos</h1>

      <form onSubmit={handleAdd} style={{ marginBottom: "1rem" }}>
        <input name="title" placeholder="Título" value={form.title} onChange={handleChange} required />
        <input name="creator" placeholder="Criador/Autor" value={form.creator} onChange={handleChange} />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="movie">Filme</option>
          <option value="book">Livro</option>
          <option value="series">Série</option>
          <option value="music">Música</option>
          <option value="game">Jogo</option>
        </select>
        <input name="genre" placeholder="Gênero" value={form.genre} onChange={handleChange} />
        <input name="rating" type="number" placeholder="Avaliação (0-5)" value={form.rating} onChange={handleChange} />
        <input name="tags" placeholder="Tags (separadas por vírgula)" value={form.tags} onChange={handleChange} />
        <input name="cover" placeholder="URL da Capa" value={form.cover} onChange={handleChange} />
        <textarea name="comments" placeholder="Comentários" value={form.comments} onChange={handleChange} />
        <button type="submit">Adicionar</button>
      </form>

      <input
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
      />

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          <option value="all">Todos os tipos</option>
          <option value="movie">Filmes</option>
          <option value="book">Livros</option>
          <option value="series">Séries</option>
          <option value="music">Músicas</option>
          <option value="game">Jogos</option>
        </select>
        <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
          <option value="all">Todos os gêneros</option>
          {genres.filter(g => g !== 'all').map(g => (
            <option key={g}>{g}</option>
          ))}
        </select>
      </div>

      {filteredItems.map(item => (
        <div key={item.id} className="card">
          {item.cover && <img src={item.cover} alt={item.title} style={{ width: "100px", float: "left", marginRight: "1rem" }} />}
          <h3>{item.title}</h3>
          <p><strong>Autor:</strong> {item.creator}</p>
          <p><strong>Tipo:</strong> {item.type}</p>
          <p><strong>Gênero:</strong> {item.genre}</p>
          <p><strong>Avaliação:</strong> {item.rating}</p>
          <p><strong>Tags:</strong> {item.tags.join(", ")}</p>
          <p><strong>Comentário:</strong> {item.comments}</p>
          <div style={{ clear: "both" }}></div>
        </div>
      ))}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<BibliotecaFavoritos />);
