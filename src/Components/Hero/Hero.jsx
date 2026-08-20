import "./Hero.css";
import hero from "../../assets/Rectangle 2.png";

const Hero = () => {
  return (
    <section className="hero">

      <div className="hero-content">

        <h1 className="hero-title">
          FIND CLOTHES
          <br />
          THAT MATCHES
          <br />
          YOUR STYLE
        </h1>

        <p className="hero-description">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of style.
        </p>

        <button className="hero-button">
          Shop Now
        </button>

        <div className="hero-stats">

          <div className="hero-stat">
            <h3>200+</h3>
            <p>International Brands</p>
          </div>

          <div className="hero-stat">
            <h3>2,000+</h3>
            <p>High-Quality Products</p>
          </div>

          <div className="hero-stat">
            <h3>30,000+</h3>
            <p>Happy Customers</p>
          </div>

        </div>

      </div>


      <div className="hero-image-container">

        <span className="hero-star hero-star-top">
          ✦
        </span>

        <span className="hero-star hero-star-middle">
          ✦
        </span>

        <img
          src={hero}
          alt="Fashion Models"
          className="hero-models"
        />

      </div>

    </section>
  );
};

export default Hero;