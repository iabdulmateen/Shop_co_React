import { useState } from "react";
import "./Reviews.css";

const reviews = [
  {
    name: "Samantha D.",
    rating: 5,
    text: '"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It\'s become my favorite go-to shirt."',
    date: "Posted on August 14, 2023",
  },
  {
    name: "Alex M.",
    rating: 5,
    text: '"The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I\'m quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me."',
    date: "Posted on August 15, 2023",
  },
  {
    name: "Ethan R.",
    rating: 4.5,
    text: '"This t-shirt is a must-have for anyone who appreciates good design. The minimalist yet stylish pattern caught my eye, and the fit is perfect. I can see the designer\'s touch in every aspect of this shirt."',
    date: "Posted on August 16, 2023",
  },
  {
    name: "Olivia P.",
    rating: 4,
    text: '"As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It\'s evident that the designer poured their creativity into making this shirt stand out."',
    date: "Posted on August 17, 2023",
  },
  {
    name: "Liam K.",
    rating: 4,
    text: '"This shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer\'s skill. It\'s like wearing a piece of art that reflects my passion for both design and fashion."',
    date: "Posted on August 18, 2023",
  },
  {
    name: "Ava H.",
    rating: 4.5,
    text: '"I\'m not just wearing a t-shirt; I\'m wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter."',
    date: "Posted on August 19, 2023",
  },
];

const Stars = ({ rating }) => {
  return (
    <div className="review-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= Math.floor(rating) ? "star-filled" : "star-half"}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const Reviews = () => {
  const [activeTab, setActiveTab] = useState("reviews");
  const [showMore, setShowMore] = useState(false);

  // Load More click hone par 6 mein se pehle 4 reviews dobara jod dete hain
  const displayedReviews = showMore
    ? [...reviews, ...reviews.slice(0, 4)]
    : reviews;

  return (
    <section className="reviews-section">

      {/* Tabs */}
      <div className="reviews-tabs">

        <button
          className={activeTab === "details" ? "tab-active" : ""}
          onClick={() => setActiveTab("details")}
        >
          Product Details
        </button>

        <button
          className={activeTab === "reviews" ? "tab-active" : ""}
          onClick={() => setActiveTab("reviews")}
        >
          Rating &amp; Reviews
        </button>

        <button
          className={activeTab === "faq" ? "tab-active" : ""}
          onClick={() => setActiveTab("faq")}
        >
          FAQs
        </button>

      </div>

      {/* Product Details */}
      {activeTab === "details" && (
        <div className="tab-content">
          <h2>Product Details</h2>

          <p>
            This graphic t-shirt is designed for everyday comfort and style.
            Crafted from soft and breathable fabric, it offers a comfortable
            fit while maintaining a modern look.
          </p>

          <p>
            Perfect for casual occasions and easy to pair with jeans,
            shorts, or other everyday outfits.
          </p>
        </div>
      )}

      {/* Reviews */}
      {activeTab === "reviews" && (
        <div className="reviews-content">

          {/* Reviews Header */}
          <div className="reviews-header">

            <h2>
              All Reviews <span>(451)</span>
            </h2>

            <div className="review-actions">

              <button className="filter-button">
                <i className="fa-solid fa-sliders"></i>
              </button>

              <button className="latest-button">
                Latest
                <i className="fa-solid fa-chevron-down"></i>
              </button>

              <button className="write-review-button">
                Write a Review
              </button>

            </div>

          </div>

          {/* Review Cards */}
          <div className="reviews-grid">

            {displayedReviews.map((review, index) => (
              <div className="review-card" key={index}>

                <div className="review-top">

                  <Stars rating={review.rating} />

                  <button className="dots-button">
                    •••
                  </button>

                </div>

                <div className="review-name">
                  {review.name}

                  <span className="verified">
                    ✓
                  </span>
                </div>

                <p className="review-text">
                  {review.text}
                </p>

                <p className="review-date">
                  {review.date}
                </p>

              </div>
            ))}

          </div>

          {/* Load More */}
          {!showMore && (
            <button className="load-more-button" onClick={() => setShowMore(true)}>
              Load More Reviews
            </button>
          )}

        </div>
      )}

      {/* FAQ */}
      {activeTab === "faq" && (
        <div className="faq-content">

          <div className="faq-item">
            <button>
              What sizes are available?
              <span>+</span>
            </button>
          </div>

          <div className="faq-item">
            <button>
              Is this product made from breathable fabric?
              <span>+</span>
            </button>
          </div>

          <div className="faq-item">
            <button>
              Can I return or exchange this product?
              <span>+</span>
            </button>
          </div>

          <div className="faq-item">
            <button>
              How long does delivery take?
              <span>+</span>
            </button>
          </div>

        </div>
      )}

    </section>
  );
};

export default Reviews;