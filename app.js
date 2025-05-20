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
  const [itens, setItens] = useState([
    {
      id: 1,
      titulo: 'Duna',
      autor: 'Frank Herbert',
      tipo: 'movie',
      genero: 'Ficção Científica',
      avaliacao: 5,
      tags: 'épico, ficção',
      capa: '',
      comentario: '"Filme incrível e visual impressionante."'
    },
    {
      id: 2,
      titulo: '1984',
      autor: 'George Orwell',
      tipo: 'book',
      genero: 'Distopia',
      avaliacao: 4,
      tags: 'clássico, política',
      capa: '',
      comentario: '"Livro que faz refletir."'
    },
    {
      id:
