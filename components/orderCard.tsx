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
        <span className="box-line-name is-size-7-mobile">{order.customer.name}</span>
        <span className="box-line-products has-text-grey has-text-weight-light is-size-7-mobile">
          {order.line.length} Products
        </span>
        <span className="box-line-status has-text-grey has-text-weight-light is-size-7-mobile">
          {order.status}
        </span>
        <span className="box-line-price has-text-primary is-size-4 is-size-7-mobile">
          {order.totalPrice.toFixed(2)}
        </span>
        <i className={`fa fa-angle-${isHidden ? 'down' : 'up'}`}></i>
      </div>
      <div className={`card-content ${isHidden ? 'is-hidden' : ''}`}>
        <div className="content">
          <div className="container">
            <p>Products </p>
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
                {order.line.map((l: Line) => (
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
            <hr className="hr" />
            <p>Ship To</p>
            <p className="has-text-weight-light" style={{ marginBottom: 0 }}>
              {order.shipAddress.street}
            </p>
            <p className="has-text-weight-light">
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
          color: #6474af;
        }
        .box-line products {
        }
      `}</style>
    </div>
  );
};

export default OrderCard;
