import { useLocation } from "wouter";
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
	const [_, setLocation] = useLocation();
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
					<GridCol
						span={{ base: 12, sm: 5, lg: 4 }}
						offset={{ base: 0, sm: 1, lg: 2 }}
					>
						<Card shadow="sm" padding="lg" withBorder mih={295}>
							<Card.Section>
								<Center>
									<Text fz="3em">🕊️📑</Text>
								</Center>
							</Card.Section>
							<Center>
								<h3>Annotator</h3>
							</Center>
							<Stack gap="lg">
								<Text>
									A mobile friendly annotator that allows you to annotate
									iNaturalist observations on the go.
								</Text>
								<Button onClick={() => setLocation("/annotator")}>Open</Button>
							</Stack>
						</Card>
					</GridCol>
					<GridCol span={{ base: 12, sm: 5, lg: 4 }}>
						<Card
							shadow="sm"
							padding="lg"
							withBorder
							visibleFrom="sm"
							mih={295}
						>
							<Center>
								<Stack gap={0}>
									<Center>
										<Text size="xl" fw="bold">
											Open in Mobile
										</Text>
									</Center>
									<Image src="/qr-code.png" w={220}></Image>
								</Stack>
							</Center>
						</Card>
					</GridCol>
				</Grid>
			</main>
			<footer>
				<Center>
					<Stack>
						<Text size="sm">© Sean Clifford</Text>
						<Anchor href="https://github.com/seanclifford/inaturalist-tools">
							<Group gap="0" wrap="nowrap">
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
