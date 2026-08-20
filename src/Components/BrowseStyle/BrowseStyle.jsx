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
      alt: "Casual",
    },
    {
      id: 2,
      image: formal,
      className: "formal",
      alt: "Formal",
    },
    {
      id: 3,
      image: party,
      className: "party",
      alt: "Party",
    },
    {
      id: 4,
      image: gym,
      className: "gym",
      alt: "Gym",
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
                alt={style.alt}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BrowseStyle;