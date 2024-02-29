import Image from 'next/image';
import React from 'react';
import SkeletonImagenLogin from './SkeletonImagenLogin';

const myLoader = ({ src, width, quality }: any) => {
  const url = `https://images.pexels.com/photos/5025635/pexels-photo-5025635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`;
  return url;
};

const ImageLogin = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <>
      {!isLoading && <SkeletonImagenLogin />}
      <div className="hidden lg:block relative w-0 flex-1">
        <Image
          onLoad={() => setIsLoading(true)}
          loader={myLoader}
          layout="fill"
          objectFit="cover"
          src="https://images.pexels.com/photos/920382/pexels-photo-920382.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-920382.jpg&fm=jpg"
          alt="Imagen de login weexa"
          className="absolute inset-0 min-h-screen w-full object-cover"
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
      </div>
    </>
  );
};

export default ImageLogin;
