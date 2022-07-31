<script>
    import Card from "../shared/Card.svelte";
    import PollStore from "../stores/PollStore.js";
    import Button from "../shared/Button.svelte";
    import { tweened } from "svelte/motion";

    export let poll;
    //reactive value
    $: totalVotes = poll.voteA + poll.voteB;
    $: percentA = Math.floor((100 / totalVotes) * poll.voteA) || 0;
    $: percentB = Math.floor((100 / totalVotes) * poll.voteB) || 0;

    //tweened percentage
    const tweenedA = tweened(0);
    const tweenedB = tweened(0);

    $: tweenedA.set(percentA);
    $: tweenedB.set(percentB);
    // $: console.log($tweenedA, "  ", $tweenedB);

    const handleVote = (option, id) => {
        PollStore.update((currentPolls) => {
            let copiedPoll = [...currentPolls];
            let updatePoll = copiedPoll.find((poll) => {
                if (poll.id == id) return poll;
            });
            if (option === "a") {
                updatePoll.voteA++;
            }
            if (option === "b") {
                updatePoll.voteB++;
            }

            return copiedPoll;
        });
    };
    const handleDelete = (id) => {
        PollStore.update((currentPolls) => {
            return currentPolls.filter((poll) => poll.id != id);
        });
    };
</script>

<Card>
    <div class="poll">
        <h3>
            {poll.question}
        </h3>
        <p>Total votes:{totalVotes}</p>

        <div class="answer" on:click={() => handleVote("a", poll.id)}>
            <div class="percent percent-a" style="width: {$tweenedA}%;" />
            <span>{poll.answerA}({poll.voteA})</span>
        </div>
        <div class="answer" on:click={() => handleVote("b", poll.id)}>
            <div class="percent percent-b" style="width: {$tweenedB}%;" />
            <span>{poll.answerB}({poll.voteB})</span>
        </div>
        <div class="delete">
            <Button
                flat={true}
                on:click={() => {
                    handleDelete(poll.id);
                }}>Delete</Button
            >
        </div>
    </div>
</Card>

<style>
    h3 {
        margin: 0 auto;
        color: #555;
    }
    p {
        margin-top: 6px;
        font-size: 14px;
        color: rgb(185, 183, 183);
        margin-bottom: 30px;
    }
    .answer {
        background: #f2f2f2;
        cursor: pointer;
        margin: 10px auto;
        position: relative;
    }

    .answer:hover {
        opacity: 0.6;
    }
    span {
        display: inline-block;
        padding: 10px 20px;
    }
    .percent {
        height: 100%;
        position: absolute;
        box-sizing: border-box;
        opacity: 0.2;
    }
    .percent-a {
        background-color: red;
    }
    .percent-b {
        background-color: green;
    }
    .delete {
        margin-top: 30px;
        text-align: center;
    }
</style>
