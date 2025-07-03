function Navbar({scrollToHome, scrollToSobre, scrollToContatos}) {
  return (
        <>

        <navbar>
            <button onClick={scrollToHome}>Home</button>
            <button onClick={scrollToSobre}>Sobre</button>
            <button onClick={scrollToContatos}>Contatos</button>
        </navbar>

        </>
  );
}

export default Navbar;