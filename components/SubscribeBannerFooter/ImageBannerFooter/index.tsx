import Image from "next/image";

const ImageBannerFooter = (props: any) => {
    const { img } = props;

    return (
      <>
        <Image
          src={img}
          layout="fill"
          objectFit="cover"
          quality={100}
          alt="image"
        />
      </>
    );
  };
  
export default ImageBannerFooter;
