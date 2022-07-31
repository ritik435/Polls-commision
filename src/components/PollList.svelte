<script>
    import { fade, slide, scale } from "svelte/transition";
    import { flip } from "svelte/animate";
    import PollStore from "../stores/PollStore.js";
    import PollDetails from "./PollDetails.svelte";
    // let polls = $PollStore;
    // console.table(polls);
    import { initializeApp } from "firebase/app";
    import { getFirestore, collection, onSnapshot } from "firebase/firestore";
    import { firebaseConfig } from "../lib/firebaseConfig";

    const firebaseApp = initializeApp(firebaseConfig);
    const db = getFirestore();

    const colRef = collection(db, "polls");
    let polls = $PollStore;
    // console.table(polls);
    const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
        let fbPolls = [];
        querySnapshot.forEach((doc) => {
            let poll = { ...doc.data(), id: doc.id };
            console.log(poll, "hello");
            polls = [poll, ...polls];
        });
        console.table(polls);
    });
    // import { onDestroy, onMount } from "svelte";
    // const unsub = PollStore.subscribe((data) => {
    //     polls = data;
    //     // console.log("subscribe");
    // });
    // onMount(() => {
    //     console.log("mounted");
    // });
    // onDestroy(() => {
    //     console.log("destroyed");
    //     unsub();
    // });
</script>

<div class="poll-list">
    {#each $PollStore as poll (poll.id)}
        <div in:fade out:slide|local animate:flip={{ duration: 1000 }}>
            <PollDetails {poll} />
        </div>
    {/each}
</div>

<style>
    .poll-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 25px;
    }
</style>
