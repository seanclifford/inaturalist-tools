import { Anchor, List, Text, Title } from "@mantine/core";

export default function HelpSection() {
	return (
		<>
			<Title order={3}>Welcome to the mobile fast annotator!</Title>
			<Text>
				This was created to allow fast annotating of observations on{" "}
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
			<br />
			<Title order={4}>Choosing an annotation</Title>
			<Text>
				Annotations have specific meanings. If you're unsure of which annotation
				values are appropriate for each situation, please refer to{" "}
				<Anchor
					href="https://help.inaturalist.org/en/support/solutions/articles/151000191830-what-are-the-definitions-of-inaturalist-annotations-"
					target="_blank"
				>
					this iNaturalist help article
				</Anchor>
				.
			</Text>
			<br />
			<Title order={4}>Annotating on a laptop or desktop computer</Title>
			<Text>
				This site has been made for mobile and tablets in mind. While it will
				work on laptops and desktop computers, you may find using the Identify
				page to be a better experience. Read{" "}
				<Anchor
					href="https://www.inaturalist.org/pages/annotations"
					target="_blank"
				>
					this iNaturalist page on annotations
				</Anchor>{" "}
				if you're new to annotating using the Identify page.
			</Text>
		</>
	);
}
