import { createContext, useContext } from "react";

export function createContextFactory<ContextData>(
  defaultValue?: ContextData | null
): [React.Context<ContextData | null>, (errorMessage: string) => ContextData] {
  const context = createContext<ContextData | null>(defaultValue ?? null);

  function useContextFactory(errorMessage: string): ContextData {
    const contextValue = useContext(context);
    if (contextValue === null) {
      throw new Error(
        errorMessage ?? "useContext must be used within a Provider"
      );
    }
    return contextValue;
  }

  return [context, useContextFactory];
}
