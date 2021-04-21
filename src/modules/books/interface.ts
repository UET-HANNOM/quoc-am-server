export default interface IBook{
    _id: string;
    imgSrc: string;
    title: string;
    author: string;
    description: string;
    contributors: string;
    pages: IPage[];
}
export interface IPage{
    _id: string;
    pageNumber: string;
    quocam: string;
    hannom: string;
    imgSrc: string;
    words: IWord[];
}

export interface IWord{
    _id: string;
    type: boolean;
    rawWord: string;
    transliteration: string;
    translation: string;
    soundSrc: string;
    dictionarySrc: string;
}