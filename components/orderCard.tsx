import React, { useState, FunctionComponent } from 'react';
import { Order } from '../types';
import ProductsTable from '../components/productsTable';
import StatusTag from '../components/statusTag';

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
        <span className="box-line-name is-size-7-mobile">
          {order.customer.name}
        </span>
        <span className="box-line-products has-text-grey has-text-weight-light is-size-7-mobile">
          {order.line.length} Products
        </span>
        <StatusTag status={order.status} />
        <span className="box-line-price has-text-primary is-size-4 is-size-7-mobile">
          {order.totalPrice.toFixed(2)}
        </span>
        <i className={`fa fa-angle-${isHidden ? 'down' : 'up'}`}></i>
      </div>
      <div className={`card-content ${isHidden ? 'is-hidden' : ''}`}>
        <div className="content">
          <ProductsTable lines={order.line} />
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
      `}</style>
    </div>
  );
};

export default OrderCard;
