import React, { useState, FunctionComponent } from 'react';
import { Order, Line } from '../types';

interface CardOrderProps {
  order: Order;
}

const OrderCard: FunctionComponent<CardOrderProps> = ({ order }) => {
  const [isHidden, setIsHidden] = useState(true);
  return (
    <div
      className="box is-fullwidth"
      onClick={() => {
        setIsHidden(!isHidden);
      }}
    >
      <div className="box-line">
        <span className="box-line-name">{order.customer.name}</span>
        <span className="box-line-products has-text-grey has-text-weight-light">
          {order.line.length} Products
        </span>
        <span className="box-line-status has-text-grey has-text-weight-light">
          {order.status}
        </span>
        <span className="box-line-price has-text-primary is-size-4">
          {order.totalPrice.toFixed(2)}
        </span>
        <i className={`fa fa-angle-${isHidden ? 'down' : 'up'}`}></i>
      </div>
      <div className={`card-content ${isHidden ? 'is-hidden' : ''}`}>
        <div className="content">
          <div className="container">
            <p>Products </p>
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.line.map((l: Line) => (
                  <tr key={l.product.name}>
                    <td>{l.product.name}</td>
                    <td>{l.product.description}</td>
                    <td>{l.quantity}</td>
                    <td>{l.price.toFixed(2)}</td>
                    <td>{l.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr className="hr" />
            <p>Ship To</p>
            <p>{order.shipAddress.street}</p>
            <p>
              {order.shipAddress.city} {order.shipAddress.state}{' '}
              {order.shipAddress.zipCode}
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .box {
          cursor: pointer;
border-left: solid;
    border-left-color: #6474af;
        }
        .box-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .box-line-name {
          width: 200px;
color: #6474af
        }
        .box-line products {
        }
      `}</style>
    </div>
  );
};

export default OrderCard;
