import { Anchor, List, Text, Title } from "@mantine/core";

export default function HelpSection() {
	return (
		<>
			<Title order={3}>Welcome to the mobile fast annotator!</Title>
			<Text>
				I created this to allow fast annotating of observations on{" "}
				<Anchor href="https://www.inaturalist.org">iNaturalist</Anchor> through
				a mobile device. <br />
				Before you can start annotating, you need to
			</Text>
			<List type="ordered">
				<List.Item>
					Set a filter on the <b>Filters</b> tab
				</List.Item>
				<List.Item>
					Authorize this app to use your iNaturalist account on the{" "}
					<b>Account</b> tab
				</List.Item>
			</List>
			<br />
			<Title order={4}>Filtering</Title>
			<Text>
				For speed, the recommended way to setup your filters is to set a
				particlar taxon of your choice using the <b>Taxon</b> filter and choose
				a annotation from the <b>Without Annotation</b> filter. This is so the
				available annotations stay consistent, and you have something to do on
				each observation.
				<br />
				You can set filters how you choose however, including adding any custom
				filters into the URL that are{" "}
				<Anchor
					href="https://forum.inaturalist.org/t/how-to-use-inaturalists-search-urls-wiki-part-1-of-2"
					target="_blank"
				>
					supported by iNaturalist
				</Anchor>
				.
			</Text>
		</>
	);
}
