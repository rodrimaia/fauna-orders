import React, { FunctionComponent } from 'react';
import { Line } from '../types';

interface ProductsTableProps {
  rows: Line[];
}

const ProductsTable: FunctionComponent<ProductsTableProps> = ({ rows }) => {
  return (
    <div className="container">
      <p>Products</p>
      <div className="table-container">
        <table className="table is-narrow is-hoverable is-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((l: Line) => (
              <tr className="has-text-weight-light" key={l.product.name}>
                <td>{l.product.name}</td>
                <td>{l.product.description}</td>
                <td>{l.quantity}</td>
                <td>{l.price.toFixed(2)}</td>
                <td>{l.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTable;
