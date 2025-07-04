import "./SiteList.css";
import INatSite from "../../components/inat-site";

interface SitesListProps {
	sites: Site[];
	currentSite: Site;
	setCurrentSite: React.Dispatch<React.SetStateAction<Site>>;
}

function SitesList({ sites, currentSite, setCurrentSite }: SitesListProps) {
	const listItems = sites.map((site) => (
		<div
			key={site.id}
			className={
				`list-item${site.id === currentSite.id ? " selected-item" : ""}`
			}
			onClick={() => setCurrentSite(site)}
			onKeyDown={e => e.key === "Enter" && setCurrentSite(site)}
		>
			<INatSite site={site} />
		</div>
	));
	return <div className="list-container">{listItems}</div>;
}

export default SitesList;
