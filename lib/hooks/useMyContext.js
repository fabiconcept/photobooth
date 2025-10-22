import React, { useContext, createContext } from "react";

// 1️⃣ Create a context with a fallback (optional)
export const MyContext = createContext(undefined);

export function useMyContext() {
    const context = useContext(MyContext);

    if (context === undefined) {
        console.warn("⚠️ useMyContext called outside of its provider. Using fallback.");
        return "default value"; // or return a safe object like {}
    }

    return context;
}