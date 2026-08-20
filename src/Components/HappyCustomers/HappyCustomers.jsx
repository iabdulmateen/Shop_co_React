import "./HappyCustomers.css";

const customers = [
  {
    id: 1,
    name: "Sarah M.",
    review:
      "I'm blown away by the quality and style of the clothes I received from SHOP.CO. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    id: 2,
    name: "Alex K.",
    review:
      "Finding clothes that align with my personal style used to be a challenge until I discovered SHOP.CO. The range of options they offer is truly remarkable.",
  },
  {
    id: 3,
    name: "James L.",
    review:
      "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have discovered SHOP.CO. The selection is both trendy and diverse.",
  },
  {
    id: 4,
    name: "Emma R.",
    review:
      "The quality is amazing and everything fits perfectly. SHOP.CO has quickly become my favorite place to shop for stylish clothes.",
  },
  {
    id: 5,
    name: "Daniel T.",
    review:
      "Great quality, fast delivery and an excellent variety of styles. I'll definitely be shopping here again.",
  },
];

const HappyCustomers = () => {
  return (
    <section className="happy-customers">

      <h2>OUR HAPPY CUSTOMERS</h2>

      <div className="customer-reviews-wrapper">
        <div className="customer-reviews-track">

          {[...customers, ...customers].map((customer, index) => (
            <div
              className="customer-review-card"
              key={`${customer.id}-${index}`}
            >

              {/* Stars */}
              <div className="customer-review-stars">
                ★★★★★
              </div>

              {/* Customer Name */}
              <div className="customer-name">
                <span>{customer.name}</span>

                <span className="customer-verified">
                  ✓
                </span>
              </div>

              {/* Review */}
              <p>
                "{customer.review}"
              </p>

            </div>
          ))}

        </div>
      </div>

    </section>
  );
};

export default HappyCustomers;