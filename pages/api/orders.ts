import { NowRequest, NowResponse } from '@now/node';
import { loadOrders } from '../../lib/fauna-client';

export default async (_: NowRequest, response: NowResponse) => {
  try {
    const data = await loadOrders();
    response.status(200).json(data.data);
  } catch (e) {
    // something went wrong
    response.status(500).json({ error: e.message });
  }
};
