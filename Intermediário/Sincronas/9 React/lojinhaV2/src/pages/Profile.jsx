import './styles/Profile.css';
import construImg from '../assets/emconstru.jpeg';


function Profile() {
    return (
      <div className="profile-container">
        <div className="profile-content">
          <h1>Página em Construção</h1>
          <p>Estamos trabalhando nessa funcionalidade. Em breve, novidades!</p>
          <img src={construImg} className="construcao-image" />
        </div>
      </div>
    );
  }
export default Profile;
