import React from "react";
import lifecycleImg from '/img/banner/npd-lifecycle.png'; 

const ProductLifecycleSection = () => {
  return (
    <section className="pt-100 pb-100">
      <div className="container">
        <div className="row align-items-center">
          
          {/* Image */}
          <div className="col-lg-6">
            <div className="image-box text-center">
              <img
                src={lifecycleImg}
                alt="Product Development Lifecycle"
                className="img-fluid"
              />
            </div>
          </div>

          {/* Content */}
          <div className="col-lg-6">
        <div className="content-box">

          {/* Section Title (Finixpa Style) */}
          <div className="section-title mb-30">
            <span className="sub-title">Our Process</span>
            <h2>Product Development Lifecycle</h2>
          </div>

          <p>
            Our product development lifecycle is a structured and customer-driven
            approach that ensures quality, innovation, and continuous improvement
            at every stage. From understanding customer requirements to final
            delivery and feedback analysis, each phase is carefully designed
            to deliver high-performance and reliable solutions.
          </p>

          <ul className="list-unstyled mt-3">
            <li>✔ Customer requirement analysis and feasibility study</li>
            <li>✔ Cross-functional team collaboration (CFT)</li>
            <li>✔ Prototype development and validation</li>
            <li>✔ Quality engineering and periodic audits</li>
            <li>✔ Continuous improvement and benchmarking</li>
            <li>✔ Customer feedback integration and product evolution</li>
          </ul>

        </div>
      </div>
        </div>
      </div>
    </section>
  );
};

export default ProductLifecycleSection;