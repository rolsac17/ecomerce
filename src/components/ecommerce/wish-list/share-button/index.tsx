import { CheckCircleIcon, LinkIcon } from '@heroicons/react/solid';
import { useAppSelector } from '@redux/app/hooks';
import { selectWishlist } from '@redux/states/Wishlist/wishlistSlice';
import { get } from 'http';
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'next-share';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const getShareUrl = (userType: string, userId: string, wishlistId: string) => {
  const domain = window.location.origin;
  let baseUrl = domain && `${domain}/wishlist/public/${wishlistId}`;

  switch (userType) {
    case 'CLIENT_USER':
      baseUrl += `?sellerId=${userId}`;
      break;
    case 'WAREHOUSE_USER':
      baseUrl += `?warehouseId=${userId}`;
      break;
    default:
      console.error(`Unknown user type: ${userType}`);
  }

  return baseUrl;
};

export const ShareButton = () => {
  const domain = window.location.origin;
  const [success, setSuccess] = useState(false);
  const { wishlist } = useAppSelector(selectWishlist);
  const { currentUser, user } = useAppSelector((state) => state.auth);

  const shareUrl = getShareUrl(
    user.type,
    currentUser.userId,
    String(wishlist?.id) || ''
  );
  const copiedShareUrl = async () => {
    await navigator.clipboard.writeText(shareUrl);

    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };
  return (
    <div className="flex flex-col gap-4">
      <FacebookShareButton
        aria-hidden="true"
        url={shareUrl}
        title={wishlist?.name}
      >
        <span className="text-sm font-medium text-gray-500 hover:text-gray-600 group flex items-center">
          <FacebookIcon className="mr-2" size={32} round />
          Facebook
        </span>
      </FacebookShareButton>
      <WhatsappShareButton
        aria-hidden="true"
        url={shareUrl}
        title={wishlist?.name}
      >
        <span className="text-sm font-medium text-gray-500 hover:text-gray-600 group flex items-center">
          <WhatsappIcon className="mr-2" size={32} round />
          Whatsapp
        </span>
      </WhatsappShareButton>
      <button
        className="text-sm font-medium text-gray-500 hover:text-gray-600 group flex items-center"
        onClick={copiedShareUrl}
      >
        <span className="mr-2 w-8 h-8 bg-warmGray-200 rounded-full flex items-center justify-center">
          <LinkIcon className="w-5 h-5" />
        </span>
        {success ? (
          <>
            {'Se copio el enlace'}{' '}
            <CheckCircleIcon className="w-6 h-6 text-green-600 ml-2" />
          </>
        ) : (
          'Copiar enlace'
        )}
      </button>
    </div>
  );
};
