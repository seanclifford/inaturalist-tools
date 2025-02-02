type PhotoSize = "square" | "small" | "medium" | "large" | "original";

function getPhotoUrl(photo: Photo, size: PhotoSize): string {
    switch(size) {
        case "square":
            return photo.url;
        default:
            return convertSquareUrlToSize(photo.url, size);
    }
}

function convertSquareUrlToSize(url: string, size: PhotoSize): string {
    return url.replace("/square.", `/${size}.`);
}

export default getPhotoUrl;