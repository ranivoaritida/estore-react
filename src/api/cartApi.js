import { api } from "./axios";


export const createCart = async () => {
    const res = await api.post("/carts");
    return res.data;
}


export const getCart = async (cartId) => {
    const res = await api.get(`/carts/${cartId}`);
    return res.data;
}

export const addToCart = async ({cartId,productId}) => {
    const res = await api.post(`/carts/${cartId}/items`,{ productId });
    return res.data;
}

export const updateCartItem = async ({cartId, productId, quantity}) => {
    const res = await api.put(`/carts/${cartId}/items/${productId}`,{ quantity });
    return res.data;
}

export const removeFromCart = async ({cartId, productId}) => {
    const res = await api.delete(`/carts/${cartId}/items/${productId}`);
    return res.data;
}

export const clearCart = async (cartId) => {
    const res = await api.delete(`/carts/${cartId}/items`);
    return res.data;
}