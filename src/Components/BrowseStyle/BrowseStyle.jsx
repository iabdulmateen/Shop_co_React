import "./BrowseStyle.css";
import { Link } from "react-router-dom";

import casual from "../../assets/casual.png";
import formal from "../../assets/formal.png";
import party from "../../assets/party.png";
import gym from "../../assets/gym.png";

const styles = [
  {
    id: 1,
    image: casual,
    className: "casual",
    slug: "casual",
  },
  {
    id: 2,
    image: formal,
    className: "formal",
    slug: "formal",
  },
  {
    id: 3,
    image: party,
    className: "party",
    slug: "party",
  },
  {
    id: 4,
    image: gym,
    className: "gym",
    slug: "gym",
  },
];

const BrowseStyle = () => {
  return (
    <section className="browse-style">
      <div className="browse-style-inner">
        <h2 className="browse-style-title">
          BROWSE BY DRESS STYLE
        </h2>

        <div className="style-grid">
          {styles.map((style) => (
            <Link
              to={`/category?style=${style.slug}`}
              className={`style-card ${style.className}`}
              key={style.id}
              title={`Browse ${style.slug} style`}
            >
              <img
                src={style.image}
                alt={`${style.slug} style`}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseStyle;