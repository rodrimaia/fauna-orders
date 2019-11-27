import { NowRequest, NowResponse } from '@now/node'
import axios from  'axios';

const secret = process.env.FAUNADB_SECRET_KEY
const b64encodedSecret = Buffer.from(
    secret + ":" 
).toString("base64");

const fauna = "https://graphql.fauna.com/graphql";
axios.defaults.baseURL = fauna;
axios.defaults.headers.common['Authorization'] = `Basic ${b64encodedSecret}`;

const query = `{
    allOrders {
        data {
            _id
            status
            shipAddress {
                zipCode
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
}`

export default async (_: NowRequest, response: NowResponse) => {
    try {
        const data = await axios.post("", { query });
        response.status(200).json(data.data)
    } catch (e) {
        // something went wrong
        response.status(500).json({ error: e.message })
    }
}


