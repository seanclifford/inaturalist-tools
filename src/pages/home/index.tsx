import "./index.css";
import {
	Anchor,
	Button,
	Card,
	Center,
	Code,
	Grid,
	GridCol,
	Group,
	Image,
	Stack,
	Text,
} from "@mantine/core";

function Home() {
	return (
		<>
			<header>
				<h1>📱 iNaturalist Tools by agoranomos</h1>
				<p>
					Small, mobile friendly tools to enhance the functionality of
					iNaturalist. <br />
				</p>
			</header>
			<main>
				<Grid>
					<GridCol span={{ base: 12, sm: 4 }} offset={{ base: 0, sm: 4 }}>
						<Card shadow="sm" padding="lg" withBorder>
							<Card.Section>
								<Center>
									<Text fz="3em">🕊️📑</Text>
								</Center>
							</Card.Section>
							<h3>Annotator</h3>
							<Stack gap="lg">
								<Text>
									A mobile friendly annotator that allows you to annotate
									iNaturalist observations on the go.
								</Text>
								<Button onClick={() => navigation.navigate("/annotator")}>
									Open
								</Button>
							</Stack>
						</Card>
					</GridCol>
				</Grid>
			</main>
			<footer>
				<Center>
					<Stack>
						<Text size="sm">© Sean Clifford</Text>
						<Anchor href="https://github.com/seanclifford/inaturalist-tools">
							<Group gap="xs">
								<Image src="/GitHub_Invertocat_Black.svg" w="2em" c={"white"} />
								<Code c={"white"} bg={"transparent"}>
									https://github.com/seanclifford/inaturalist-tools
								</Code>
							</Group>
						</Anchor>
					</Stack>
				</Center>
			</footer>
		</>
	);
}

export default Home;
