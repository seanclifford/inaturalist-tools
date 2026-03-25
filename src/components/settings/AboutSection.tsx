import { Anchor, Code, Group, Image, Stack, Text, Title } from "@mantine/core";

export default function AboutSection() {
	return (
		<Stack>
			<Title order={3}>Authored By</Title>
			<Text>
				Sean Clifford {"("}
				<Anchor href="https://www.inaturalist.org/people/agoranomos">
					agoranomos
				</Anchor>
				{")"}
			</Text>
			<Title order={3}>Source code</Title>
			<Text>The code is open source and available here:</Text>
			<Anchor href="https://github.com/seanclifford/inaturalist-tools">
				<Group gap="xs">
					<Image src="/GitHub_Invertocat_Black.svg" w="2em" />
					<Code>https://github.com/seanclifford/inaturalist-tools</Code>
				</Group>
			</Anchor>
		</Stack>
	);
}
