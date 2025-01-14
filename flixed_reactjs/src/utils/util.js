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
}

export default Util