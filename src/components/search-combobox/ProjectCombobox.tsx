import { Group, Image } from "@mantine/core";
import { BriefcaseBusiness, Search } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useProject } from "../../hooks/useProject";
import { useProjectAutocomplete } from "../../hooks/useProjectAutocomplete";
import { SearchCombobox } from "./SearchCombobox";

interface ProjectComboboxProps {
	projectId: string | null;
	onSelect: (project: Project | null) => void;
}

export function ProjectCombobox({ projectId, onSelect }: ProjectComboboxProps) {
	const [search, setSearch] = useState("");
	const { data: value, isLoading } = useProject(projectId);
	const projects = useProjectAutocomplete(search);

	const comboSetValue = useCallback(
		(project: Project | null) => {
			if (project?.id === value?.id) return;

			onSelect(project);
		},
		[value, onSelect],
	);

	const getKey = useCallback((project: Project | null) => project?.id ?? 0, []);
	const getProjectName = useCallback(
		(project: Project | null) => project?.title || "",
		[],
	);
	const buildOption = useCallback(
		(project: Project) => (
			<Group gap="xs">
				{project?.icon ? (
					<Image src={project.icon} h={"24px"} w={"24px"} />
				) : null}
				{getProjectName(project)}
			</Group>
		),
		[getProjectName],
	);

	const leftSection = useMemo(() => {
		return value?.icon ? (
			<Image src={value.icon} h={"24px"} w={"24px"} />
		) : value ? (
			<BriefcaseBusiness />
		) : (
			<Search />
		);
	}, [value]);

	return (
		<SearchCombobox
			value={value ?? null}
			setValue={comboSetValue}
			loading={isLoading}
			autocompleteValues={projects}
			requestAutocomplete={setSearch}
			label="Project"
			placeholder="Search for a project"
			getKey={getKey}
			getValue={getProjectName}
			buildOption={buildOption}
			leftSection={leftSection}
		/>
	);
}
