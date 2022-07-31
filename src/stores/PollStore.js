import { writable } from "svelte/store";

const PollStore = writable([
    {
        id: 1,
        question: "WHich is better",
        answerA: "python",
        answerB: "javaScript",
        voteA: 9,
        voteB: 1,
    },
    {
        id: .33,
        question: "Which is better",
        answerA: "js",
        answerB: "java",
        voteA: 9,
        voteB: 15,
    },
])

export default PollStore;