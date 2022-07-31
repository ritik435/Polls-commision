<script>
	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";
	import PollList from "./components/PollList.svelte";
	import CreatePollForm from "./components/CreatePollForm.svelte";

	import Tabs from "./shared/Tabs.svelte";
	// import dotenv from "dotenv";
	// dotenv.config();

	let items = ["Current Poll", "Add new Poll"];
	let activeItem = "Current Poll";
	const tabsChange = (e) => {
		activeItem = e.detail;
	};

	let handlePoll = (e) => {
		activeItem = "Current Poll";
	};
</script>

<Header />
<main>
	<Tabs {items} {activeItem} on:tabsChange={tabsChange} />
	{#if activeItem === "Current Poll"}
		<PollList />
	{:else if activeItem === "Add new Poll"}
		<CreatePollForm on:addPoll={handlePoll} />
	{/if}
</main>
<Footer />

<style>
	main {
		max-width: 960px;
		margin: 40px auto;
	}
</style>
