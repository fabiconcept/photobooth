export const testApiRequest = async (pageNumber) => {
    const res = await fetch(`https://api.pexels.com/v1/curated?page=${pageNumber}&per_page=20`, {
        headers: {
            Authorization: `${process.env.NEXT_PUBLIC_PEXELS_API_KEY}`
        }
    });

    const jsonResponse = await res.json();
    return jsonResponse.photos;

}