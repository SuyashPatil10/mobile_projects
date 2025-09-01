import axios from "axios";

const API_KEY = `AIzaSyBytalcHTY5IqR9qGAWxNAGly5Fsl48F68`;


export async function createUser(email, password) {
    return authenticate('signUp', email, password);
}

export async function login(email, password) {
    return authenticate('signInWithPassword', email, password);
}

export async function authenticate(mode, email, password) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

    const response = await axios.post(
        url,
        {
            email: email,
            password: password,
            returnSecureToken: true,
        }
    );

    const token = response.data.idToken;
    return token;
}