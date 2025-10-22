import os from "os";
const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY
export const fetchImageApi = async (pageNumber) => {
    const res = await fetch(`https://api.pexels.com/v1/curated?page=${pageNumber}&per_page=20`, {
        headers: {
            Authorization: `${apiKey}`
        }
    });

    const jsonResponse = await res.json();
    return jsonResponse.photos;
}

export async function fetchImageApi_search(query) {
    const res = await fetch(`https://api.pexels.com/v1/search?query=${query}`, {
        headers: {
            Authorization: `${apiKey}`
        }
    });

    const jsonResponse = await res.json();
    return jsonResponse.photos;
}

export const downloadHandler = async ({
    imgSrc,
    imgAlt
}) => {
    const imageUrl = imgSrc;
    const imageRes = await fetch(imageUrl);

    if (!imageRes.ok) return;

    const imageBlob = await imageRes.blob();
    const imageOutputUrl = URL.createObjectURL(imageBlob);

    const linkElement = document.createElement("a");
    linkElement.href = imageOutputUrl;
    linkElement.setAttribute("download", `${imgAlt.replace(/\W/g, '_')}_PhotoBooth.jpeg`);
    
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
};   

/**
 * Detects the operating system of the current environment.
 * 
 * Works in both browser and Node.js environments. In browsers, it analyzes the
 * user agent string to identify the OS. In Node.js, it uses the `os.platform()` method.
 * 
 * @returns {"windows" | "macos" | "ios" | "android" | "linux" | "unknown"} 
 * The detected operating system:
 * - `"windows"` - Windows operating system
 * - `"macos"` - macOS desktop operating system
 * - `"ios"` - iOS mobile operating system (iPhone, iPad, iPod)
 * - `"android"` - Android operating system
 * - `"linux"` - Linux operating system
 * - `"unknown"` - Unable to determine the OS
 */
export function detectOS() {
    // Check if we're in a browser environment
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
        const ua = navigator.userAgent.toLowerCase();

        if (ua.includes("windows")) return "windows";
        if (ua.includes("mac")) {
            // Distinguish between iOS and macOS
            if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")) return "ios";
            return "macos";
        }
        if (ua.includes("android")) return "android";
        if (ua.includes("linux")) return "linux";

        return "unknown";
    }

    // Otherwise we're in a Node.js (server) environment
    try {
        const platform = os.platform();

        if (platform === "win32") return "windows";
        if (platform === "darwin") return "macos";
        if (platform === "linux") return "linux";
        return "unknown";
    } catch {
        return "unknown";
    }
}