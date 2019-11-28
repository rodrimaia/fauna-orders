import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import useSWR from 'swr';
import Nav from '../components/nav';
import Head from 'next/head';
import { Order, Line } from '../types';

interface EndpointResponse {
  data: Order[];
}

const fetcher = (url: string): Promise<AxiosResponse<EndpointResponse>> =>
  axios.post(url);

const Home = () => {
  const { data, error } = useSWR('/api/orders', fetcher);

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css"
        />
        <link rel="stylesheet" href="https://use.typekit.net/mhv7bxw.css" />
        <script
          defer
          src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"
        ></script>
      </Head>

      <Nav />

      {error && <div> Failed to load </div>}
      {!error && !data && <div> Loading...</div>}
      {data && (
        <div className="section">
          <div className="container">
            <h4 className="title is-6 has-text-weight-light">All Orders</h4>
            <hr className="hr" />
          </div>

          <div className="container">
            {data.data.data.map(order => (
              <Card key={order._id} order={order} />
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        :global(body) {
          min-height: 100vh;
          font-family: acumin-pro, Helvetica, sans-serif;
          font-weight: 700;
          font-style: normal;
          background-color: #f6f4fc;
        }
        .hr {
          background-color: #a7a5c6;
        }
        .title {
          color: #6474af;
        }
      `}</style>
    </div>
  );
};

const Card = ({ order }) => {
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
        <span className="box-line-products has-text-grey has-text-weight-light is-size-7">
          {order.line.length} Products
        </span>
        <span className="box-line-status has-text-grey has-text-weight-light is-size-7">
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
        }
        .box-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .box-line-name {
          width: 200px;
        }
        .box-line products {
        }
      `}</style>
    </div>
  );
};

export default Home;
