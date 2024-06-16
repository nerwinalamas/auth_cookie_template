const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/
        );
};

const validateField = (value, setError, message) => {
    if (!value) {
        setError(message);
        return false;
    }

    return true;
};

const validateEmailField = (email, setEmailError) => {
    if (!validateField(email, setEmailError, "Email is required")) return false;
    if (!validateEmail(email)) {
        setEmailError("Invalid email format");
        return false;
    }

    return true;
};

export const validateRegistrationForm = (
    firstName,
    setFirstNameError,
    lastName,
    setLastNameError,
    email,
    setEmailError,
    password,
    setPasswordError
) => {
    let valid = true;

    valid = validateField(firstName, setFirstNameError, "First Name is required");
    valid = validateField(lastName, setLastNameError, "Last Name is required");
    valid = validateEmailField(email, setEmailError);
    valid = validateField(password, setPasswordError, "Password is required");

    return valid;
};

export const validateLoginForm = (
    email,
    setEmailError,
    password,
    setPasswordError
) => {
    let valid = true;

    valid = validateEmailField(email, setEmailError);
	valid = validateField(password, setPasswordError, "Password is required");

    return valid;
};
