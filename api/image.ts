import { StaticImageData } from "next/image";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export function image(image: string, path?: string) {
  const staticImage: StaticImageData = {
    src: publicRuntimeConfig.strapiUrl + "/" + path + image,
    width: 100,
    height: 100,
  };
  return staticImage;
}

export function imageUrl(image?: string) {
  if (!image) return "";
  return publicRuntimeConfig.strapiUrl + image;
}

export function strapiUrl(url?: string) {
  return publicRuntimeConfig.strapiUrl + url;
}
