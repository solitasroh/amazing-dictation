export default interface IGame {
    id: number;
    title: string;
    singer: string;
    preSectionLyrics?: string;
    postSectionLyrics?: string;
    questionLyrics?: string[];
    preSectionPlayStartTime?: number;
    preSectionPlayEndTime?: number;
    questionSectionPlayStartTime?: number;
    questionSectionPlayEndTime?: number;
    songYoutubeLinkUrl?: string;
    musicFileLinkUrl: string;
}