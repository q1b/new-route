<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form';
	import { createENTITYSchema } from './create-entity-schema.js';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import type { CreateENTITYFormType } from './index.js';

	const {
		data,
		onresult = () => {},
		class: className = ''
	}: {
		data: CreateENTITYFormType;
		onresult?: () => void;
		class?:string
	} = $props();
	
	let toastId = $state<number | string>(0);
	const form = superForm(data, {
		validators: zodClient(createENTITYSchema),
		onResult: () => {
			toast.dismiss(toastId);
			toast.message('Your entity is being created');
			onresult();
		},
		onSubmit: () => {
			toastId = toast.loading('Creating ENTITY ...');
		},
		delayMs: 100,
	});
	const { form: formData, enhance, delayed } = form;
</script>

<form class={className} method="POST" use:enhance action="/admin/PARENT_DIR/create-entity?/default">
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input type="text" {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="code">
		<Form.Control let:attrs>
			<Form.Label>ENTITY Code ( Optional )</Form.Label>
			<Input type="text" {...attrs} bind:value={$formData.code} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="w-full mt-2" disabled={$delayed}>Add New ENTITY</Form.Button>
</form>
