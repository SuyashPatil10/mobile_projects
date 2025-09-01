import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Input from "./Input";
import Button from "./Button";
import Loader from "./Loader";
import { signinUser } from "../API/userCalls";
import { useMutationFunction } from "../hooks/useMutationFunction";
import { showToast } from "../utils/ShowToast";

function SigninForm() {
    const [toggleView, setToggleView] = useState(false);
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const { mutate, data, isLoading, error } = useMutationFunction({
        key: 'signin',
        executionFunction: (userData) => signinUser(userData),
    });

    
    function onToggleViewHandler() {
        setToggleView((toggleView) => !toggleView);
    }
    
    function onSubmit() {
        mutate({
            name: `${userDetails.firstName} ${userDetails.lastName}`,
            email: userDetails.email,
            phone: userDetails.phone,
            password: userDetails.password,
        })
    }
    
    if(isLoading) {
        return <Loader />;
    }

    if(data?.status === "SUCCESS") {
        showToast("success", "account created successfully!");
    }

    if(data?.status === "ERROR") {
        showToast("error", "something went wrong while account creation!");
    }
    
    return (
        <View style={styles.formContainer}>
            <Text style={styles.headerText}>Create a new Account</Text>

            <View style={styles.line}></View>

            <View style={styles.inputContainer}>
                {
                    !toggleView &&
                    <>
                    <Input changeTextHandler={(value) => {setUserDetails({ ...userDetails, firstName: value  })}} value={userDetails.firstName} placeholder={"first name"} />
                    <Input changeTextHandler={(value) => {setUserDetails({ ...userDetails, lastName: value  })}} value={userDetails.lastName} placeholder={"last name"} />
                    <Input changeTextHandler={(value) => {setUserDetails({ ...userDetails, email: value  })}} value={userDetails.email} placeholder={"email"} type={"email-address"} />
                    <Input changeTextHandler={(value) => {setUserDetails({ ...userDetails, phone: value  })}} value={userDetails.phone} placeholder={"phone"} type={"phone-pad"} />

                    <Button onPress={onToggleViewHandler}>Save and Next</Button>
                    </>
                }
                {
                    toggleView && 
                    <>
                    <Input changeTextHandler={(value) => {setUserDetails({ ...userDetails, password: value  })}} value={userDetails.password} placeholder={"password"} type={"password"} isSecure={true} />
                    <Input changeTextHandler={(value) => {setUserDetails({ ...userDetails, confirmPassword: value  })}} value={userDetails.confirmPassword} placeholder={"confirm password"} type={"password"} isSecure={true} />

                    <Button onPress={onSubmit}>Sign in</Button>
                    <Button onPress={onToggleViewHandler} innerContainerStyle={styles.innerContainerStyle}>Back</Button>
                   </> 
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 20,
    },

    headerText: {
        textAlign: "center",
        fontSize: 14,
        fontWeight: "light",
    },

    line: {
        width: "100%",
        height: 1.5,
        backgroundColor: "#333",
        borderRadius: 1,
        marginVertical: 16,
    },

    inputContainer: {
        display: "flex",
        gap: 24,
    },

    checkBoxContainer: {
       display: "flex",
       flexDirection: "row",
       justifyContent: "flex-end",
       alignItems: "center",
       gap: 8,
    },

    rememberText: {
        fontSize: 16,
        fontWeight: "semibold",
        marginHorizontal: 8,
    },

    googleContainer: {
        marginTop: 24,
    },

    innerContainerStyle: {
        backgroundColor: "#94a3b8", 
        marginVertical: 0,
    },
});

export default SigninForm;
