export declare const MESSAGES: {
    readonly AUTH: {
        readonly REGISTER_SUCCESS: "User registered successfully";
        readonly LOGIN_SUCCESS: "Login successful";
        readonly INVALID_CREDENTIALS: "Invalid email or password";
        readonly EMAIL_ALREADY_EXISTS: "An account with this email already exists";
        readonly UNAUTHORIZED: "Authentication required";
        readonly INVALID_TOKEN: "Invalid or expired token";
    };
    readonly USER: {
        readonly PROFILE_RETRIEVED: "Profile retrieved successfully";
        readonly NOT_FOUND: "User not found";
    };
    readonly HEALTH: {
        readonly OK: "Service is healthy";
    };
    readonly VALIDATION: {
        readonly FAILED: "Validation failed";
    };
    readonly GENERIC: {
        readonly INTERNAL_ERROR: "An unexpected error occurred";
    };
};
