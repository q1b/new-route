<script lang="ts">
    import { ArrowLeftCircleIcon } from "lucide-svelte";
    import * as Card from "$lib/components/ui/card/index.js";
    import CreateENTITYForm from "./create-entity-form.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    const { data } = $props();
</script>

<main class="w-full max-w-7xl px-8 flex flex-col gap-12">
    <Button variant="link" href="/admin/PARENT_DIR">
        <ArrowLeftCircleIcon class="mr-2" />
        Go Back
    </Button>

    <Card.Root class="mx-auto max-w-sm w-full">
        <Card.Header>
            <Card.Title class="text-2xl">ENTITY_TITLE</Card.Title>
            <Card.Description>ENTITY_DESCRIPTION</Card.Description>
        </Card.Header>
        <Card.Content>
            <CreateENTITYForm data={data.entityForm} />
        </Card.Content>
    </Card.Root>
</main>
