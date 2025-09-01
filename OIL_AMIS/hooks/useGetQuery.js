import { useQuery } from "@tanstack/react-query";

function useGetQuery({ key, executionFunction, isReady }) {
    const { data, isPending, isLoading, isFetching, isError, error } = useQuery({
        queryKey: [key],
        queryFn: executionFunction,
        enabled: isReady
    });

    return { data, isPending, isLoading, isFetching, isError, error };
}

export { useGetQuery };