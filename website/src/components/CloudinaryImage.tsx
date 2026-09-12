"use client";

import { cloudinaryLoader, isCloudinarySrc } from "@/lib/cloudinary";
import Image, { type ImageProps } from "next/image";

export function CloudinaryImage({ placeholder: _placeholder, ...props }: ImageProps) {
  return <Image {...props} placeholder="empty" loader={cloudinaryLoader} />;
}

export function MediaImage({ placeholder: _placeholder, ...props }: ImageProps) {
  if (isCloudinarySrc(props.src)) {
    return <CloudinaryImage {...props} />;
  }
  return <Image {...props} placeholder="empty" />;
}
