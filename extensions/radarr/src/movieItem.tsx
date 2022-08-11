export interface movieItem {
    title: string;
    inCinemas: Date;
    physicalRelease: Date;
    digitalRelease: Date;
    monitored: boolean;
    hasFile: boolean;
    studio: string;
    overview: string;
    tmdbId: number;
    images: [
        {
            coverType: string,
            url: string,
            remoteUrl: string
        }
    ]
}