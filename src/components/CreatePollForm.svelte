<script>
    import PollStore from "../stores/PollStore.js";
    import Button from "../shared/Button.svelte";
    import { createEventDispatcher } from "svelte";

    let fields = { question: "", answerA: "", answerB: "" };
    let errors = { question: "", answerA: "", answerB: "" };
    let valid = false;
    const dispatch = createEventDispatcher();

    const submitDefault = () => {
        valid = true;
        //validate question
        if (fields.question.trim().length < 5) {
            valid = false;
            errors.question = "Question is less than 5 letters";
        } else {
            errors.question = "";
        }

        //validate answerA
        if (fields.answerA.trim().length < 1) {
            valid = false;
            errors.answerA = "Cant be empty";
        } else {
            errors.answerA = "";
        }

        //validate answerB
        if (fields.answerB.trim().length < 1) {
            valid = false;
            errors.answerB = "Cant be empty";
        } else {
            errors.answerB = "";
        }

        //add new poll
        if (valid) {
            let poll = { ...fields, voteA: 0, voteB: 0, id: Math.random() };
            PollStore.update((currentPolls) => {
                return [poll, ...currentPolls];
            });
            dispatch("addPoll");
        }
    };
</script>

<form on:submit|preventDefault={submitDefault}>
    <div class="input-field">
        <label for="Question">Question :</label>
        <input
            type="text"
            placeholder="Question"
            id="question"
            bind:value={fields.question}
        />
        <div class="error">{errors.question}</div>
    </div>
    <div class="input-field">
        <label for="Answer-a">AnswerB :</label>
        <input
            type="text"
            placeholder="Answer-a"
            id="Answer-a"
            bind:value={fields.answerA}
        />
        <div class="error">{errors.answerA}</div>
    </div>
    <div class="input-field">
        <label for="Answer-b">AnswerB :</label>
        <input
            type="text"
            placeholder="Answer-b"
            id="Answer-b"
            bind:value={fields.answerB}
        />
        <div class="error">{errors.answerA}</div>
    </div>
    <Button type="secondary">Create</Button>
</form>

<style>
    form {
        width: 400px;
        margin: 0 auto;
        text-align: center;
    }
    .input-field {
        margin: 18px auto;
    }
    input {
        width: 100%;
        border-radius: 6px;
        margin: 10px auto;
        text-align: left;
    }
    label {
        margin: 10px auto;
        text-align: left;
    }
    .error {
        font-weight: bold;
        font-size: 15px;
        color: rgb(197, 23, 23);
    }
</style>
