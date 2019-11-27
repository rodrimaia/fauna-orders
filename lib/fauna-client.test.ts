import { calculateFields } from './fauna-client';
import { Order, Line } from '../types';

const orderResponseSample = JSON.parse(`{ "data" : [{
    "_id": "249780007215302154",
    "status": "processing",
    "shipAddress": {
        "zipCode": "83405"
    },
    "customer": {
        "firstName": "Rodrigo",
        "lastName": "Maia"
    },
    "line": [
        {
            "product": {
                "name": "Cup",
                "description": "Translucent 9 Oz"
            },
            "quantity": 10,
            "price": 6.9
        },
        {
            "product": {
                "name": "Beef Cheek",
                "description": "Fresh"
            },
            "quantity": 5,
            "price": 5.28
        }
     ]}
   ]
}`);

describe('Calculate fields', () => {
  let orders: Order[];
  let order: Order;

  beforeAll(() => {
    orders = calculateFields(orderResponseSample.data);
    order = orders[0];
  });

  test('receives and return an array ', () => {
    expect(orders.length).toBe(1);
  });

  test('has status', () => {
    expect(order.status).toBe('processing');
  });

  test('has address', () => {
    expect(order.shipAddress.zipCode).toBe('83405');
  });

  test('has totalPrice', () => {
    expect(order.totalPrice).toBe(95.4);
  });

  describe('customer', () => {
    test('has full name', () => {
      expect(order.customer.name).toBe('Rodrigo Maia');
    });
  });

  describe('line items', () => {
    let firstLine: Line;
    beforeAll(() => {
      firstLine = order.line[0];
    });
    test('is an array', () => {
      expect(order.line.length).toBe(2);
    });

    test('has product name', () => {
      expect(firstLine.product.name).toBe('Cup');
    });

    test('has lineTotal', () => {
      expect(firstLine.total).toBe(69);
    });
  });
});
