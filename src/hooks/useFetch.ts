
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { showApiError, handleApiError } from '@/services/errorService';
import { useToast } from '@/hooks/use-toast';

// Type for the options you can pass to the hook
interface FetchOptions<TData, TError> extends Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'> {
  showErrors?: boolean;
  errorMessage?: string;
}

// Hook for fetching data (GET requests)
export function useFetch<TData = unknown, TError = unknown>(
  queryKey: string[],
  fetchFn: () => Promise<TData>,
  options?: FetchOptions<TData, TError>
) {
  const { showErrors = true, errorMessage = "Failed to fetch data", ...queryOptions } = options || {};
  
  return useQuery({
    queryKey,
    queryFn: async () => {
      try {
        return await fetchFn();
      } catch (error) {
        if (showErrors) {
          showApiError(error, errorMessage);
        }
        throw error;
      }
    },
    ...queryOptions
  });
}

// Types for mutation options
interface MutationOptions<TData, TVariables, TError> 
  extends Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'> {
  showErrors?: boolean;
  errorMessage?: string;
  successMessage?: string;
}

// Hook for mutations (POST, PUT, DELETE requests)
export function useMutate<TData = unknown, TVariables = unknown, TError = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: MutationOptions<TData, TVariables, TError>
) {
  const { toast } = useToast();
  const { 
    showErrors = true, 
    errorMessage = "Operation failed",
    successMessage,
    onSuccess,
    ...mutationOptions 
  } = options || {};
  
  return useMutation({
    mutationFn: async (variables: TVariables) => {
      try {
        const result = await mutationFn(variables);
        if (successMessage) {
          toast({
            title: "Success",
            description: successMessage
          });
        }
        return result;
      } catch (error) {
        if (showErrors) {
          showApiError(error, errorMessage);
        }
        throw error;
      }
    },
    onSuccess: (data, variables, context) => {
      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },
    ...mutationOptions
  });
}
