import React from 'react';
const Loader = () => (
  <div className="pageloader is-active">
    <span className="title">Loading</span>

    <style jsx>{`
      .title {
        color: #6474af;
      }
      .pageloader {
        background: #f6f4fc;
      }
      .pageloader::after {
        border-color: #6474af;
      }
    `}</style>
  </div>
);

export default Loader;
