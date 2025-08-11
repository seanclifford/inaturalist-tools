import "./SiteList.css";
import INatSite from "../../components/inat-site";
import { useContext } from "react";
import { SiteContext } from "../../Contexts";

interface SitesListProps {
	sites: Site[];
}

function SitesList({ sites }: SitesListProps) {
	const [currentSite, setCurrentSite] = useContext(SiteContext);
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
