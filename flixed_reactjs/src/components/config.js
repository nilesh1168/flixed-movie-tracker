import Constants from "./constants"

class TMDB_Configuration{
    static CONFIGS = {
        base_url: process.env.REACT_APP_FLIXED_REST_BASE_URL,
        default_lang: "en-US",
        default_page_number: 1,
        number_of_records_per_page: Constants.NUMBER_OF_REC_PER_PAGE,
        default_img_size: Constants.DEF_IMG_SIZE,
        images: {
            base_url: process.env.REACT_APP_TMDB_IMG_BASE_URL,
            secure_base_url: process.env.REACT_APP_TMDB_SEC_IMG_BASE_URL,
            backdrop_sizes: [
                "w300",
                "w780",
                "w1280",
                "original"
            ],
            logo_sizes: [
                "w45",
                "w92",
                "w154",
                "w185",
                "w300",
                "w500",
                "original"
            ],
            poster_sizes: [
                "w92",
                "w154",
                "w185",
                "w342",
                "w500",
                "w780",
                "original"
            ],
            profile_sizes: [
                "w45",
                "w185",
                "h632",
                "original"
            ],
            still_sizes: [
                "w92",
                "w185",
                "w300",
                "original"
            ]
        }
    }
    
    static getConfigs(){
        return TMDB_Configuration.CONFIGS
    }
}

export default TMDB_Configuration