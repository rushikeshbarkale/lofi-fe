import axios from "axios";

import { API_URL } from "../config/config";

export interface Video {
    title: string;
    videoId: string;
    thumbnail: string;
    description: string;
    publishedAt: string;
    channelTitle: string;
}

export const fetchMusicVideos = async (isGenshin: boolean): Promise<Video[]> => {
    try {
        const response = await axios.get<{ videos: Video[] }>(`${API_URL}?genshin=${isGenshin}`);
        return response.data.videos;
    } catch (error) {
        console.error("Error fetching music videos:", error);
        return [];
    }
};

//specific category/theme
// export const fetchMusicByTheme = async (theme: string): Promise<Video[]> => {
//     try {
//         const response = await axios.get<{ videos: Video[] }>(`${API_URL}?query=${theme}`);
//         return response.data.videos;
//     } catch (error) {
//         console.error("Error fetching music videos:", error);
//         return [];
//     }
// };