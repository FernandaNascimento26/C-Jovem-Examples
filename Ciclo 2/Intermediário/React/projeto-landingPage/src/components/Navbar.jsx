function Navbar({scrollToHome, scrollToSobre, scrollToContato}) {
    return (
        <>
        <nav>
            <button onClick={scrollToHome}>Home</button>
            <button  onClick={scrollToSobre}>Sobre</button>
            <button  onClick={scrollToContato}>Contato</button>
        </nav>
            
    </>

    );
}

export default Navbar;