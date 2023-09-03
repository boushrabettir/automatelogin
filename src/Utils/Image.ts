export const retrieveCatPhoto = async (): Promise<string> => {

    try {
        let response = await fetch("https://api.thecatapi.com/v1/images/search?limit=1");
        let data = await response.json();
        let imgUrl = data[0].url
        return imgUrl;


    } catch (err) {
        console.error(err);
        throw err;
    }

}   