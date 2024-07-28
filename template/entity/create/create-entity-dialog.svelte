<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
    import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';
	import { type CreateENTITYFormType } from './index.js';
	import CreateENTITYForm from './create-entity-form.svelte';

    let { data, open = $bindable(), }: {
        open?: boolean;
        data: CreateENTITYFormType;
    } = $props();

	let isDesktop = $state(true);
	$effect(() => {
		isDesktop = window.matchMedia('(min-width: 768px)').matches;
	});
</script>

{#if isDesktop}
	<Dialog.Root bind:open>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>ENTITY_TITLE</Dialog.Title>
				<Dialog.Description>ENTITY_DESCRIPTION</Dialog.Description>
			</Dialog.Header>
			<CreateENTITYForm onresult={() => (open = false)} data={data} />
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<Drawer.Content>
			<Drawer.Header class="text-left">
				<Drawer.Title>ENTITY_TITLE</Drawer.Title>
				<Drawer.Description>
					ENTITY_DESCRIPTION
				</Drawer.Description>
			</Drawer.Header>
			<CreateENTITYForm class="px-4" onresult={() => (open = false)} data={data} />
			<Drawer.Footer class="pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}