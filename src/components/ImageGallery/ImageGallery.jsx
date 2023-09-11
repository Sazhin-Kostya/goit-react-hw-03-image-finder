import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ cards }) {
  return (
    <ul className="gallery">
      {cards.map(card => (
        <ImageGalleryItem
          key={card.id}
          id={card.id}
          src={card.webformatURL}
          alt={card.tags}
          largeImg={card.largeImageURL}
        />
      ))}
    </ul>
  );
}
