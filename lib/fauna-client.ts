import axios, { AxiosResponse } from 'axios';
import { Order, Line } from '../types';

const secret = process.env.FAUNADB_SECRET_KEY;
const b64encodedSecret = Buffer.from(secret + ':').toString('base64');
const fauna = 'https://graphql.fauna.com/graphql';

axios.defaults.baseURL = fauna;
axios.defaults.headers.common['Authorization'] = `Basic ${b64encodedSecret}`;

const query = `{
    allOrders {
        data {
            _id
            status
            shipAddress {
                street
                city
                zipCode
                state
            }
            line {
                product {
                    name
                    description
                }
                quantity
                price
            }
            customer {
                firstName
                lastName
            }
        }
    }
}`;

const calculateLine = (line: FaunaLine): Line => ({
  ...line,
  total: line.quantity * line.price
});

export const calculateFields = (faunaResponse: FaunaOrder[]): Order[] => {
  return faunaResponse.map(orderResponse => {
    const lines = orderResponse.line.map(calculateLine);
    return {
      ...orderResponse,
      customer: {
        name: [
          orderResponse.customer.firstName,
          orderResponse.customer.lastName
        ].join(' ')
      },
      line: lines,
      totalPrice: lines.reduce((acc, actual) => acc + actual.total, 0)
    };
  });
};

export const loadOrders = async (): Promise<Order[]> => {
  return axios
    .post('', { query })
    .then((response: AxiosResponse<FaunaResponse>) =>
      calculateFields(response.data.data.allOrders.data)
    );
};

interface FaunaResponse {
  data: Data;
}

interface Data {
  allOrders: AllOrders;
}

interface AllOrders {
  data: FaunaOrder[];
}

interface FaunaOrder {
  _id: string;
  status: string;
  shipAddress: ShipAddress;
  line: FaunaLine[];
  customer: Customer;
}

interface Customer {
  firstName: string;
  lastName: string;
}

interface FaunaLine {
  product: FaunaProduct;
  quantity: number;
  price: number;
}

interface FaunaProduct {
  name: string;
  description: string;
}

interface ShipAddress {
  street: string;
  city: string;
  zipCode: string;
  state: string;
}
