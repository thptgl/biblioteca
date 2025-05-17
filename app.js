function adicionarItem() {
  if (!titulo.trim()) {
    alert('O título é obrigatório.');
    return;
  }

  let comentarioFormatado = comentario.trim();
  if (comentarioFormatado) {
    // adiciona aspas se ainda não tiver aspas
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
