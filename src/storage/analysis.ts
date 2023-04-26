import { MAX_RATING, getEntries, splitToWords } from "./userdata"

/**
 * Returns top words for a rating.
 * @param rating Rating to search words for
 * @returns 
 */
export const ratingWords: (rating: number) => Promise<[string, number][]> = async (rating) => {
    const entries = await getEntries({minRating: rating, maxRating: rating});
    let ratingWords: [string, number][] = []
    let foundWords: string[] = []
    for (const entry of entries) {
        const words = splitToWords(entry.text);
        for (const word of words) {
            if (foundWords.includes(word)) {
                const index = foundWords.indexOf(word);
                ratingWords[index][1]++;
            } else {
                foundWords.push(word);
                ratingWords.push([word, 1]);
            }
        }
    }

    // Sort by descending word count
    return ratingWords.sort((a, b) => b[1] - a[1]);
}
