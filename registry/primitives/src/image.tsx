import Image, { type ImageProps } from "next/image";

// Theme-aware image props
type ImageThemedProps = Omit<ImageProps, "src"> & {
    srcLight: string;
    srcDark: string;
};

// Re-export the Next.js Image component and its props
export { Image, type ImageProps, type ImageThemedProps };

// Default export for convenience
export default Image;
