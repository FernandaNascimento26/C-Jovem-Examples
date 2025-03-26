

## Cadastro com Perfil e Imagem em Base64

Este projeto é um sistema full stack com:

- Cadastro de usuário (e-mail e senha)
- Autenticação com JWT
- Criação de perfil com:
  - Nome
  - Endereço
  - Data de nascimento
  - Bio
  - **Foto de perfil (armazenada em Base64)**
- Visualização do perfil com a imagem
- Logout

---

## Como funciona o envio da imagem em Base64

No formulário de criação de perfil (`CriarPerfil.jsx`), usamos um `input` do tipo `file`:

```jsx
<input type="file" className="form-control" accept="image/*" onChange={handleImage} />
```

Esse campo chama a função `handleImage`, que faz a conversão do arquivo para **Base64** usando o `FileReader`:

```jsx
const handleImage = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    setForm({ ...form, foto_perfil: reader.result });
  };

  if (file) {
    reader.readAsDataURL(file); // ← conversão para Base64
}
```

Depois disso, a imagem em Base64 fica salva no estado `form.foto_perfil` e é enviada normalmente para o backend junto com os demais dados do perfil.

---

## Exibição da imagem

Como a string Base64 já está no formato reconhecido pelo navegador (`data:image/...`), basta usá-la no `src` de uma `<img>`:

```jsx
<img src={perfil.foto_perfil} alt="foto" width={150} />
```

Não é necessário nenhum tratamento adicional no backend ou no frontend para que a imagem seja exibida corretamente.

---