import { useState } from "react";
import "./Reviews.css";
import { useToast } from "../../Context/ToastContext.jsx";

const initialReviews = [
  {
    id: 1,
    name: "Samantha D.",
    rating: 5,
    text: '"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It\'s become my favorite go-to shirt."',
    date: "Posted on August 14, 2023",
  },
  {
    id: 2,
    name: "Alex M.",
    rating: 5,
    text: '"The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I\'m quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me."',
    date: "Posted on August 15, 2023",
  },
  {
    id: 3,
    name: "Ethan R.",
    rating: 4.5,
    text: '"This t-shirt is a must-have for anyone who appreciates good design. The minimalist yet stylish pattern caught my eye, and the fit is perfect. I can see the designer\'s touch in every aspect of this shirt."',
    date: "Posted on August 16, 2023",
  },
  {
    id: 4,
    name: "Olivia P.",
    rating: 4,
    text: '"As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It\'s evident that the designer poured their creativity into making this shirt stand out."',
    date: "Posted on August 17, 2023",
  },
  {
    id: 5,
    name: "Liam K.",
    rating: 4,
    text: '"This shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer\'s skill. It\'s like wearing a piece of art that reflects my passion for both design and fashion."',
    date: "Posted on August 18, 2023",
  },
  {
    id: 6,
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
  const [reviewsList, setReviewsList] = useState(initialReviews);
  const [showMore, setShowMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, text: "" });

  const { showToast } = useToast();

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.text.trim()) {
      showToast("Please provide your name and review text.", "error");
      return;
    }

    const created = {
      id: Date.now(),
      name: newReview.name.trim(),
      rating: Number(newReview.rating),
      text: `"${newReview.text.trim()}"`,
      date: `Posted on ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`,
    };

    setReviewsList([created, ...reviewsList]);
    setIsModalOpen(false);
    setNewReview({ name: "", rating: 5, text: "" });
    showToast("Thank you! Your review has been published.", "success");
  };

  const displayedReviews = showMore
    ? reviewsList
    : reviewsList.slice(0, 6);

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
          Rating &amp; Reviews ({reviewsList.length})
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
          <h2>Product Details &amp; Specifications</h2>
          <p>
            Crafted from high-grade 100% long-staple combed cotton, this garment provides
            unrivaled softness, breathability, and durability throughout regular wear.
          </p>
          <ul style={{ margin: "16px 0 0 20px", lineHeight: "1.8", color: "#475569" }}>
            <li>Fabric Composition: 100% Breathable Organic Cotton</li>
            <li>Collar: Ribbed crew neck with reinforced shoulder taping</li>
            <li>Care Instructions: Machine wash cold inside out, tumble dry low</li>
            <li>Country of Origin: Ethically manufactured</li>
          </ul>
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === "reviews" && (
        <div className="reviews-content">
          <div className="reviews-header">
            <h2>
              All Reviews <span>({reviewsList.length})</span>
            </h2>

            <div className="review-actions">
              <button
                className="write-review-button"
                onClick={() => setIsModalOpen(true)}
              >
                Write a Review
              </button>
            </div>
          </div>

          {/* Review Cards Grid */}
          <div className="reviews-grid">
            {displayedReviews.map((review) => (
              <div className="review-card" key={review.id || review.name}>
                <div className="review-top">
                  <Stars rating={review.rating} />
                  <span style={{ fontSize: "12px", color: "#64748b" }}>{review.rating}.0 / 5</span>
                </div>

                <div className="review-name">
                  {review.name}
                  <span className="verified" title="Verified Buyer">✓</span>
                </div>

                <p className="review-text">{review.text}</p>
                <p className="review-date">{review.date}</p>
              </div>
            ))}
          </div>

          {reviewsList.length > 6 && !showMore && (
            <button className="load-more-button" onClick={() => setShowMore(true)}>
              Load More Reviews
            </button>
          )}
        </div>
      )}

      {/* FAQ Tab */}
      {activeTab === "faq" && (
        <div className="faq-content">
          <div className="faq-item">
            <button>
              What sizes are available?
              <span>+</span>
            </button>
            <p style={{ padding: "0 10px 10px", color: "#64748b", fontSize: "14px" }}>
              Our garments come in sizes Small, Medium, Large, and X-Large with accurate true-to-size dimensions.
            </p>
          </div>

          <div className="faq-item">
            <button>
              Is this product made from breathable fabric?
              <span>+</span>
            </button>
            <p style={{ padding: "0 10px 10px", color: "#64748b", fontSize: "14px" }}>
              Yes, 100% combed cotton jersey allows optimal air circulation and all-day comfort.
            </p>
          </div>

          <div className="faq-item">
            <button>
              Can I return or exchange this product?
              <span>+</span>
            </button>
            <p style={{ padding: "0 10px 10px", color: "#64748b", fontSize: "14px" }}>
              We offer a hassle-free 30-day return and exchange policy on all unworn items with original tags.
            </p>
          </div>

          <div className="faq-item">
            <button>
              How long does delivery take?
              <span>+</span>
            </button>
            <p style={{ padding: "0 10px 10px", color: "#64748b", fontSize: "14px" }}>
              Standard delivery takes 2 to 4 business days. Express shipping is also available at checkout.
            </p>
          </div>
        </div>
      )}

      {/* Write a Review Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "16px",
              padding: "24px",
              maxWidth: "480px",
              width: "100%",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h2 style={{ fontSize: "20px", margin: 0, fontWeight: "700" }}>Write a Review</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#64748b" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReviewSubmit}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zainab Malik"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>
                  Overall Rating *
                </label>
                <div style={{ display: "flex", gap: "8px" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      style={{
                        background: "none",
                        border: "none",
                        fontSize: "24px",
                        cursor: "pointer",
                        color: star <= newReview.rating ? "#eab308" : "#cbd5e1",
                      }}
                    >
                      ★
                    </button>
                  ))}
                  <span style={{ alignSelf: "center", fontSize: "14px", fontWeight: "600", color: "#475569", marginLeft: "6px" }}>
                    {newReview.rating} of 5 Stars
                  </span>
                </div>
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>
                  Review Comments *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us what you liked about the fit, quality, or style..."
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", resize: "vertical" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ padding: "10px 18px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "#fff", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "10px 22px", borderRadius: "8px", border: "none", background: "#000", color: "#fff", fontWeight: "600", cursor: "pointer" }}
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Reviews;