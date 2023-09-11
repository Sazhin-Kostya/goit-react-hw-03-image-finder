export default function ImageGalleryItem({ src, alt, largeImg }) {
  return (
    <>
      <li className="gallery-item">
        <img src={src} alt={alt} />
      </li>
    </>
  );
}
