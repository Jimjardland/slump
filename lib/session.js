import randomWords from 'random-words';
import { getSession } from './event';

const getRandomWords = () => randomWords({ exactly: 2, join: '-' })

const verifySessionDoesntExist = () => {
    
    getSession(session).then(story => {
        if(story.length) {

        }
    })


}; 

const getRandom = () => {
    const session = getRandomWords();

    return new Promise((resolve, reject) => {
        resolve({ session });
    });
}

module.exports = {
    getRandom
}