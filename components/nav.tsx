import React from 'react';

const Nav = () => (
  <nav>
    <ul>
      <li>
        <span className="has-text-weight-light">Fauna Orders</span>
      </li>
    </ul>

    <style jsx>{`
      nav {
        text-align: center;
        background-color: #6474af;
        color: white;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
    `}</style>
  </nav>
);

export default Nav;
