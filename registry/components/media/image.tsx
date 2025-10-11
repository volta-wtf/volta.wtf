import { cn } from "@/lib/utils";

import {
  Image as ImagePrimitive,
  type ImageProps,
  type ImageThemedProps
} from "@/primitives/image";

// Image component with default classes
const ImageBase = ({ className, ...props }: ImageProps) => {
  return <ImagePrimitive className={cn("", className)} {...props} />;
};

// Theme-aware image component
const ImageThemed = ({ srcLight, srcDark, className, ...props }: ImageThemedProps) => {
  return (
    <>
      <ImageBase {...props} src={srcLight} className={cn("show-on-light", className)} />
      <ImageBase {...props} src={srcDark} className={cn("show-on-dark", className)} />
    </>
  );
};

// Combine Image with themed property
const Image = Object.assign(ImageBase, { themed: ImageThemed });

export { Image, type ImageProps, type ImageThemedProps };
