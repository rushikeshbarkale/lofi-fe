import axios from "axios";

const API_URL = "http://localhost:5000/api/music";

export interface Video {
    title: string;
    videoId: string;
    thumbnail: string;
}

export const fetchMusicVideos = async (): Promise<Video[]> => {
    try {
        const response = await axios.get<{ videos: Video[] }>(API_URL);
        return response.data.videos;
    } catch (error) {
        console.error("Error fetching music videos:", error);
        return [];
    }
};
