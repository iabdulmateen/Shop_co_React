import "./ProductRecommendations.css";

import cloth9 from "../../assets/cloth9.png";
import cloth10 from "../../assets/cloth10.png";
import cloth11 from "../../assets/cloth11.png";
import cloth12 from "../../assets/cloth12.png";

const recommendedProducts = [
  {
    id: 1,
    name: "Polo with Contrast Trims",
    price: 242,
    oldPrice: 260,
    discount: "-20%",
    rating: 4.0,
    image: cloth10,
  },
  {
    id: 2,
    name: "Gradient Graphic T-shirt",
    price: 145,
    rating: 3.5,
    image: cloth9,
  },
  {
    id: 3,
    name: "Polo with Tipping Details",
    price: 180,
    rating: 4.5,
    image: cloth11,
  },
  {
    id: 4,
    name: "Black Striped T-shirt",
    price: 150,
    oldPrice: 180,
    discount: "-30%",
    rating: 5.0,
    image: cloth12,
  },
];

const ProductRecommendations = () => {
  return (
    <section className="product-recommendations">

      <h2 className="recommendations-title">
        YOU MIGHT ALSO LIKE
      </h2>

      <div className="recommendations-grid">

        {recommendedProducts.map((product) => (
          <div
            className="recommendation-card"
            key={product.id}
          >

            <div className="recommendation-image">
              <img
                src={product.image}
                alt={product.name}
              />
            </div>

            <h3>
              {product.name}
            </h3>

            <div className="recommendation-rating">

              <span className="recommendation-stars">
                ★★★★★
              </span>

              <span>
                {product.rating}/5
              </span>

            </div>

            <div className="recommendation-price">

              <span className="current-price">
                ${product.price}
              </span>

              {product.oldPrice && (
                <>
                  <span className="recommendation-old-price">
                    ${product.oldPrice}
                  </span>

                  <span className="recommendation-discount">
                    {product.discount}
                  </span>
                </>
              )}

            </div>

          </div>
        ))}

      </div>

    </section>
  );
};

export default ProductRecommendations;