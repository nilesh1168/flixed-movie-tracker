import TMDB_Configuration from "./config";
class Util{

    static getToken() {
        return `${localStorage.getItem('token')}`; // add logic for unauthorized if token not found
    }

    static getRequestOptions(method) {
        var token = this.getToken()
        return {
            method: method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${token}`
            }
        }
    }

    static imageUrl = (url) => {
        return TMDB_Configuration.CONFIGS.images.secure_base_url + "original" + url
    }

    static getUniqueColors(genreList) {
        const colorList = [];
        const genreSet = new Set(genreList)
        let hash = 0, s = 70, l = 50;
        genreSet.forEach(genre => {
            for (let i = 0; i < genre.length; i++) {
                hash = genre.charCodeAt(i) + ((hash << 5) - hash);
            }
            const hue = hash % 360;
            colorList.push(`hsl(${hue}, ${s}%, ${l}%)`)
        });
        return colorList;
      }  
}

export default Util