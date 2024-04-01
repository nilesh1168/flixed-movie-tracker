class TMDB_Configuration{
    static CONFIGS = {
        base_url: "http://127.0.0.1:8000",
        default_lang: "en-US",
        default_page_number: 1,
        images: {
            base_url: "http://image.tmdb.org/t/p/",
            secure_base_url: "https://image.tmdb.org/t/p/",
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