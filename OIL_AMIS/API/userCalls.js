async function signinUser(userData) {
    console.log(userData);
    try {
        const response = await fetch("http://10.208.53.37:8080/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const result = await response.json();
        console.log("result", result);
        return result;
    } catch (error) {
        console.error("Login error:", error);
        return null;
    }
}

async function loginUser(userData) {
    console.log(userData);
    try {
        const response = await fetch("http://10.208.53.37:8080/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const result = await response.json();
        console.log("result", result);
        return result;
    } catch (error) {
        console.error("Login error:", error);
        return null;
    }
}

export { signinUser, loginUser };