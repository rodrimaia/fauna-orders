import React from 'react';
import axios, { AxiosResponse } from 'axios';
import useSWR from 'swr';
import Nav from '../components/nav';
import OrderCard from '../components/orderCard';
import Head from 'next/head';
import Loader from '../components/loader';
import { Order } from '../types';

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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bulma-extensions@6.2.7/bulma-pageloader/dist/css/bulma-pageloader.min.css"
        />
        <script
          defer
          src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"
        ></script>
      </Head>

      <Nav />

      {error && <div> Failed to load </div>}
      {!error && !data && <Loader />}
      {data && (
        <div className="section">
          <div className="container">
            <h4 className="title is-6 has-text-weight-light">All Orders</h4>
            <hr className="hr" />
          </div>

          <div className="container">
            {data.data.data.map(order => (
              <OrderCard key={order._id} order={order} />
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

export default Home;
