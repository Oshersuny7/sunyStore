import OrderDetailsPageComponent from './components/OrderDetailsPageComponent'

import axios from "axios";

const getOrder = async(id) => {
    const { data } = await axios.get("/orders/user/" + id);
    return data
}

const markAsDelivered = async (id) => {
    const { data } = await axios.put("/orders/delivered/" + id);
    if (data) {
        return data;
    }
}

const AdminOrderDetailsPage = () => {
  return <OrderDetailsPageComponent getOrder={getOrder} markAsDelivered={markAsDelivered} />
};

export default AdminOrderDetailsPage;

