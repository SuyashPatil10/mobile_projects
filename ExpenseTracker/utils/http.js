import axios from "axios";

const HTTP_URL = 'https://expense-manager-66715-default-rtdb.firebaseio.com/';

export async function storeExpense(expenseData) {
    const response = await axios.post(`${HTTP_URL}/expenses.json`, expenseData);
    return response.data.name;
}

export async function fetchExpenses() {
    const response = await axios.get(`${HTTP_URL}/expenses.json`);
    const expenses = [];
    if (!response.data) return [];

    for(const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        };

        expenses.push(expenseObj);
    };

    return expenses;
}


export async function updateExpense(id, expenseData) {
    return await axios.put(HTTP_URL + `/expenses/${id}.json`, expenseData);
}

export async function deleteExpense(id) {
    return await axios.delete(HTTP_URL + `/expenses/${id}.json`);
}