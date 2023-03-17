import { getEntries, setEntry } from "./userdata";


const words = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor\
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud\
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure\
                    dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit\
                    anim id est laborum"
    .split(/\s+/)
    .map(word => word.toLowerCase())
    .map(word => {
        // Remove dots and commas
        if (".,".includes(word.charAt(word.length - 1))) {
            return word.substring(0, word.length - 1);
        }
        return word;
    });

const randi = (i: number) => Math.floor(Math.random() * i)

const randomWord = () => words[randi(words.length)];

const capitalize = (word: string) => word.split("").map((c, i) => i == 0 ? c.toUpperCase() : c).join("");

const randomSentence = () => {
    const maxWords = 7;
    const wordCount = randi(maxWords);
    let sentence = capitalize(randomWord());
    for (let i = 1; i < wordCount; i++) {
        // Maybe insert comma
        if (Math.random() < 0.05) sentence = sentence.trimEnd() + ", ";

        // Insert random word
        sentence += randomWord() + " ";
    }
    return sentence.trimEnd() + ". ";
}

const loremLipsum = () => {
    const maxSentences = 10;
    const sentenceCount = randi(maxSentences);
    let lorem = randomSentence();
    for (let i = 1; i < sentenceCount; i++) {
        lorem += randomSentence() + " ";
    }
    return lorem.trimEnd();
}


/**
 * Fills 
 */
export const generateMockEntries = async () => {
    const maxEntries = 30;
    // Hugely inefficent but works in test conditions
    for (let i = 0; i < maxEntries; i++) {
        let date = new Date();
        date.setDate(date.getDate() - randi(4 + 2 * i));
        if ((await getEntries({ minDate: date, maxDate: date })).length == 0 ) {
            const entry = { date: date, rating: randi(5), text: loremLipsum()};
            await setEntry(entry);
        }
    }
}
