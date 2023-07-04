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
