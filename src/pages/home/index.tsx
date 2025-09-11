import { Link } from "wouter";
import INatSite from "../../components/inat-site";
import useSite from "../../hooks/useSite";
import { Group } from "@mantine/core";
import useAuthentication from "../../hooks/useAuthentication";
import { useCurrentUser } from "../../hooks/useCurrentUser";

function Home() {
	const [site] = useSite();
	const [auth] = useAuthentication(site);
	const currentUser = useCurrentUser(auth);
	return (
		<main>
			<h1>iNaturalist Tools by agoranomos</h1>
			<p>
				Small tools to enhance the functionality of iNaturalist. <br />
				The first (and so far only) tool is a mobile friendly annotator
			</p>
			<Group>
				Choose your site (optional):
				<Link href="/site-selection">
					<INatSite site={site} isShort />
				</Link>
			</Group>
			<h3>
				<Link href="/annotator">Annotator</Link>
			</h3>
			<p>
				A mobile friendly annotator that allows you to annotate iNaturalist
				observations on the go.
			</p>
			<p>Here are some suggested predefined filters to get you started:</p>
			<ul>
				<li>
					<Link href="/annotator?without_term_id=1">
						Insects without a Life Stage annotation
					</Link>
				</li>
				<li>
					<Link href="/annotator?without_term_id=2">
						Flowering Plants without a Flowering annotation
					</Link>
				</li>
				{currentUser ? (
					<li>
						<Link href={`/annotator?user_id=${currentUser?.id}`}>
							Your observations
						</Link>
					</li>
				) : null}
			</ul>
		</main>
	);
}

export default Home;
