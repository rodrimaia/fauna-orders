import { NowRequest, NowResponse } from '@now/node';
import { loadOrders } from '../../lib/fauna-client';
import { Order } from '../../types';

export default async (_: NowRequest, response: NowResponse) => {
  try {
    const data: Order[] = await loadOrders();
    response.status(200).json({ data: data });
  } catch (e) {
    // something went wrong
    response.status(500).json({ error: e.message });
  }
};
