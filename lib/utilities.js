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