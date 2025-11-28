import { Group } from "@mantine/core";
import { Link } from "wouter";
import SiteCombobox from "../../components/site-combobox/SiteCombobox";
import useAuthentication from "../../hooks/useAuthentication";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import useSite from "../../hooks/useSite";

function Home() {
	const [site] = useSite();
	const auth = useAuthentication(site);
	const currentUser = useCurrentUser(auth);
	return (
		<main>
			<h1>iNaturalist Tools by agoranomos</h1>
			<p>
				Small tools to enhance the functionality of iNaturalist. <br />
				The first (and so far only) tool is a mobile friendly annotator
			</p>
			<Group>
				<SiteCombobox label="Choose your site (optional)" />
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
					<Link href="/annotator?taxon_id=47158&without_term_id=1&photos=true">
						Insects without a Life Stage annotation
					</Link>
				</li>
				<li>
					<Link href="/annotator?taxon_id=47125&without_term_id=12&photos=true">
						Flowering Plants without a Flowers and Fruit annotation
					</Link>
				</li>
				{currentUser ? (
					<li>
						<Link href={`/annotator?user_id=${currentUser?.id}&reviewed=any`}>
							Your observations
						</Link>
					</li>
				) : null}
			</ul>
		</main>
	);
}

export default Home;
