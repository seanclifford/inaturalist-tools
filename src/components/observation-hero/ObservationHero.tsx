import { Anchor, Box, Group, Paper, Stack, Text } from "@mantine/core";
import { SquareArrowOutUpRight } from "lucide-react";
import type React from "react";
import { useContext } from "react";
import { SiteContext } from "../../Contexts";
import UserAccount from "../user-account/UserAccount";
import { outerWidth } from "./dimensions";
import ObservationPhotos from "./ObservationPhotos";

interface ObservationHeroProps {
	observation?: Observation;
}

const ObservationHero: React.FC<ObservationHeroProps> = ({ observation }) => {
	const [site] = useContext(SiteContext);
	if (!observation) {
		return <span>loading</span>;
	}
	const { id, photos, user, taxon } = observation;

	const url = new URL(site.url);
	url.pathname = `/observations/${id}`;

	return (
		<Paper w={outerWidth} radius="md" shadow="sm" withBorder>
			<Box style={{ position: "relative" }}>
				<ObservationPhotos photos={photos} />
				<Box
					style={{
						position: "absolute",
						left: "0",
						top: "0",
						height: "100%",
						width: "100%",
						background: "linear-gradient(0deg, rgba(0,0,0,0.3), rgba(0,0,0,0))",
						pointerEvents: "none",
					}}
				/>
				<Box
					style={{
						position: "absolute",
						left: "10px",
						bottom: "10px",
						color: "white",
					}}
				>
					{taxon && !taxon.preferred_common_name ? (
						<Text size="lg" fs="italic">
							{taxon?.name}
						</Text>
					) : (
						<>
							<Text size="lg">{taxon?.preferred_common_name ?? "Unknown"}</Text>
							<Text size="md" fs="italic" hidden={!taxon}>
								{` (${taxon?.name})`}
							</Text>
						</>
					)}
				</Box>
			</Box>
			<Stack p="xs">
				<Group>
					<UserAccount user={user} />
					<Anchor
						ml="auto"
						href={url.toString()}
						target="_blank"
						rel="noreferrer"
						aria-label={`See it on ${site.name}`}
					>
						<SquareArrowOutUpRight />
					</Anchor>
				</Group>
			</Stack>
		</Paper>
	);
};

export default ObservationHero;
