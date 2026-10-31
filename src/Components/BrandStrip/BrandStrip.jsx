import "./BrandStrip.css";

import versace from "../../assets/versace.png";
import zara from "../../assets/zara.png";
import gucci from "../../assets/gucci.png";
import prada from "../../assets/prada.png";
import calvinKlein from "../../assets/calvin-klein.png";

const BrandStrip = () => {
  return (
    <section className="brand-strip">
      <div className="brand-container">

        <div className="brand-item">
          <img src={versace} alt="Versace" />
        </div>

        <div className="brand-item">
          <img src={zara} alt="Zara" />
        </div>

        <div className="brand-item">
          <img src={gucci} alt="Gucci" />
        </div>

        <div className="brand-item">
          <img src={prada} alt="Prada" />
        </div>

        <div className="brand-item">
          <img src={calvinKlein} alt="Calvin Klein" />
        </div>

      </div>
    </section>
  );
};

export default BrandStrip;