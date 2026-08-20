import "./BrowseStyle.css";

import casual from "../../assets/casual.png";
import formal from "../../assets/formal.png";
import party from "../../assets/party.png";
import gym from "../../assets/gym.png";

const BrowseStyle = () => {
  const styles = [
    {
      id: 1,
      name: "Casual",
      image: casual,
      className: "casual",
    },
    {
      id: 2,
      name: "Formal",
      image: formal,
      className: "formal",
    },
    {
      id: 3,
      name: "Party",
      image: party,
      className: "party",
    },
    {
      id: 4,
      name: "Gym",
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
              key={style.id}
              className={`style-card ${style.className}`}
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