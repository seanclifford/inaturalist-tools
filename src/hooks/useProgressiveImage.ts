import { useEffect, useState } from "react";

const useProgressiveImage = (lowQualitySrc: string, highQualitySrc: string) => {
	const [src, setSrc] = useState(lowQualitySrc);

	useEffect(() => {
		setSrc(lowQualitySrc);

		const img = new Image();
		img.src = highQualitySrc;

		img.onload = () => {
			setSrc(highQualitySrc);
		};
	}, [lowQualitySrc, highQualitySrc]);

	const loading = src === lowQualitySrc;
	return [src, loading];
};

export default useProgressiveImage;
