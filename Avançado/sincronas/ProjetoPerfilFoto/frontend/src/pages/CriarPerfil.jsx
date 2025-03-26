import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { criarPerfil } from '../services/perfilService';

export default function CriarPerfil() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [form, setForm] = useState({
    nome: '',
    endereco: '',
    data_nascimento: '',
    foto_perfil: '',
    bio: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, foto_perfil: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await criarPerfil(form, token);
      alert("Perfil criado com sucesso!");
      navigate('/perfil');
    } catch (error) {
      alert("Erro ao criar perfil.");
    }
  };

  return (
    <div className="container mt-5 text-light">
      <h2 className="text-center mb-4">Criar Perfil</h2>
      <form onSubmit={handleSubmit} className="card p-4 mt-4 shadow-lg">
  <div className="row">
    <div className="col-md-6 mb-3">
      <label className="form-label">Nome</label>
      <input name="nome" className="form-control" value={form.nome} onChange={handleChange} />
    </div>
    <div className="col-md-6 mb-3">
      <label className="form-label">Endereço</label>
      <input name="endereco" className="form-control" value={form.endereco} onChange={handleChange} />
    </div>
  </div>
  <div className="row">
    <div className="col-md-6 mb-3">
      <label className="form-label">Data de Nascimento</label>
      <input name="data_nascimento" type="date" className="form-control" value={form.data_nascimento} onChange={handleChange} />
    </div>
    <div className="col-md-6 mb-3">
      <label className="form-label">Foto</label>
      <input type="file" className="form-control" accept="image/*" onChange={handleImage} />
    </div>
  </div>
  {form.foto_perfil && (
    <div className="text-center mb-3">
      <img src={form.foto_perfil} alt="Preview" width="120" className="rounded shadow" />
    </div>
  )}
  <div className="mb-3">
    <label className="form-label">Bio</label>
    <textarea name="bio" className="form-control" rows="3" value={form.bio} onChange={handleChange}></textarea>
  </div>
  <button type="submit" className="btn btn-purple w-100">Salvar Perfil</button>
</form>
</div>
  );
}
