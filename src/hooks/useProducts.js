import { fetchProducts, fetchProductById, createProduct } from "../api/productApi"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useProductById = (id) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => fetchProductById(id),
        enabled: !!id, // Only run if id is provided
    });
}

export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newProduct) => {
            const res = await createProduct(newProduct);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
        }
    });
};