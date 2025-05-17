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
    <input type="number" placeholder="Avaliação (0-5)" value={avaliacao} onChange={e => setAvaliacao(e.target.value)} />
    <input type="text" placeholder="Tags" value={tags} onChange={e => setTags(e.target.value)} />
    <input className="campo-longo" type="text" placeholder="URL da Capa" value={capa} onChange={e => setCapa(e.target.value)} />
    <textarea className="campo-longo" placeholder="Comentários" value={comentario} onChange={e => setComentario(e.target.value)} />
  </div>
  <div className="botoes">
    <button onClick={adicionarItem}>Adicionar</button>
  </div>
</div>
