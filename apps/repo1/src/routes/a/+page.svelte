<script>
	// import { serverConfig } from '$common/scripts/test.config';
	import { libTestA } from '$common';
	import ComponentTest1 from '$common/components/ComponentTest1.svelte';
	// import { SERVER_VALUE } from '$common/src/lib/scripts/config.server';

	import { internalTestA } from '$lib/scripts/test';
	const a = function () {
		return 1;
	};
	function ab() {
		return 2;
	}
	let b = a();
	/**@type {{d: number, bn: number}}*/
	let { d = 10, bn = $bindable(5) } = $props();
	// SERVER_VALUE;
	bn = 500;
	internalTestA;
</script>

<!-- {serverConfig.SERVER_VALUE} -->
{libTestA + internalTestA}
<h1>Welcome to SvelteKit</h1>
<!-- <div>{SERVER_VALUE}</div> -->
<p class="global-test">
	Visit <a data-sveltekit-preload-data href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to
	read the documentation
</p>
<ComponentTest1></ComponentTest1>
