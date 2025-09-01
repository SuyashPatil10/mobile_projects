import { createContext, useContext, useReducer } from "react";

const expenseContext = createContext();

const initialState = {
    expenses: [],
};

function reducer(state, action) {
    switch(action.type) {
        case "expenses/set" : 
            return { expenses: action.payload };

        case "expense/add" :
            return {
                expenses: 
                [ 
                    action.payload,
                    ...state.expenses, 
                ]};
        
        case "expense/delete" :
            return {
                expenses: state.expenses.filter((item) => item.id !== action.payload.id)
            };

        case "expense/update" :
            const updatedExpenseIndex = state.expenses.findIndex((item) => item.id === action.payload.id);
            const updatableExpense = state.expenses[updatedExpenseIndex];
            const updatedItem = { ...updatableExpense, 
                                description: action.payload.description,
                                amount: action.payload.amount,
                                date: action.payload.date };
            const updatedExpenses = [...state.expenses];
            updatedExpenses[updatedExpenseIndex] = updatedItem;
            return { expenses : updatedExpenses };
        
        default : 
            return state;
    }
}

function ExpensesContextProvider({ children }) {
    const [{ expenses }, dispatch] = useReducer(reducer, initialState);

    return (
        <expenseContext.Provider value={{expenses, dispatch}}>
            { children }
        </expenseContext.Provider>
    )
}

function useExpenses() {
    const context = useContext(expenseContext);
    return context;
}

export { ExpensesContextProvider, useExpenses };
