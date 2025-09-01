import { useMutation } from "@tanstack/react-query";


function useMutationFunction(key, mutationFunction) {
    const { mutate, data, isPending, isLoading, isFetching, isError, error } = useMutation({
        mutationKey: [key],
        mutationFn: mutationFunction,
    });

    return { mutate, data, isPending, isLoading, isFetching, isError, error };
}

export { useMutationFunction };