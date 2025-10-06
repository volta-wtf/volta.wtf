import Image, { type ImageProps } from "@/primitives/image";

// Theme-aware image component that shows different images for light and dark themes
type ImageThemeProps = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

export const ImageTheme = (props: ImageThemeProps) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="show-on-light" />
      <Image {...rest} src={srcDark} className="show-on-dark" />
    </>
  );
};

// Default export for convenience
export default Image;
