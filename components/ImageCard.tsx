import Image from 'next/image';

const ImageCard = ({ src, alt, caption }: { src: string; alt: string; caption: string }) => {
    return (
        <div style={{ textAlign: 'center', margin: '1rem' }}>
            {/* Next.js Image */}
            <Image src={src} alt={alt} width={300} height={200} style={{ borderRadius: '8px' }} />
            {/* Caption */}
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#555' }}>{caption}</p>
        </div>
    );
};

export default ImageCard;
