export const generalMetadata = {
    title: 'Photobooth | Explore and Share Amazing Photos',
    description: "Discover a world of captivating photos on Photobooth. Search and browse millions of images, or upload your own to share with the community.",
    keywords: [
        'photo sharing',
        'unsplash clone',
        'pexels clone',
        'freepik clone',
        'photo booth',
        'image search',
        'photography',
        'photographers',
        'creativity',
        'inspiration',
        'fabiconcept',
        'favour ajokubi',
        'fabian ajokubi',
        'fabian tochukwu',
        'nigeria',
        'nigerian',
        'nigerian developer',
        'community',
        'explore photos',
        'share photos',
    ],
    authors: [{name: "Favour Ajokubi", url: "https://github.com/fabiconcept"}, {name: "Fabiconcept", url: "fabiconcept.online"}],
    openGraph: {
        title: 'Photobooth | Explore and Share Amazing Photos',
        description: "Discover a world of captivating photos on Photobooth. Search and browse millions of images, or upload your own to share with the community.",
        url: 'https://photobooth-alpha.vercel.app/', // Replace with your actual website URL
        locale: 'en_US',
        images: [
            {
                url: '/meta images/image-twt.png', // Replace with a relevant Photobooth image URL
                width: 1904,
                height: 958,
                alt: 'Photobooth - Explore Photos',
            },
        ],
    },
    twitter: {
        card: 'summary_large_ image',
        title: 'Explore and Share Photos | Photobooth',
        description: "Dive into a world of captivating photos on Photobooth. Search and browse millions of images, or upload your own to share with the community.",
        images: ['/meta images/image-twt.png'], // Replace with the same image URL as openGraph
    },
    icons: {
        // Consider using a favicon generator for various icon sizes
        icon: '/favicons/android-chrome-192x192.png', // Replace with a Photobooth favicon
        shortcut: '/favicons/android-chrome-512x512.png', // Replace with a Photobooth favicon
        apple: '/favicons/apple-touch-icon.png', // Replace with a Photobooth favicon
        other: {
            rel: '/favicons/favicon-16x16.png', // Replace with a Photobooth favicon
            url: '/favicons/favicon-16x16.png', // Replace with a Photobooth favicon
        },
    },
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};
