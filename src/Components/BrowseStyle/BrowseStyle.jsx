import "./BrowseStyle.css";

import casual from "../../assets/casual.png";
import formal from "../../assets/formal.png";
import party from "../../assets/party.png";
import gym from "../../assets/gym.png";

const BrowseStyle = () => {
  const styles = [
    {
      id: 1,

      image: casual,
      className: "casual",
    },
    {
      id: 2,
      image: formal,
      className: "formal",
    },
    {
      id: 3,
    
      image: party,
      className: "party",
    },
    {
      id: 4,
     
      image: gym,
      className: "gym",
    },
  ];

  return (
    <section className="browse-style">

      <div className="browse-style-inner">

        <h2 className="browse-style-title">
          BROWSE BY DRESS STYLE
        </h2>

        <div className="style-grid">

          {styles.map((style) => (
            <div
              className={`style-card ${style.className}`}
              key={style.id}
            >
              <img
                src={style.image}
                alt={style.name}
              />

              <h3>{style.name}</h3>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default BrowseStyle;