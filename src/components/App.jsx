import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import SearchBar from './Searchbar/Searchbar';
import { getCards } from './GetCards/GetCArds';
import LoadMoreButton from './Button/Button';

export class App extends Component {
  state = {
    cards: [],
    page: 1,
    query: '',
    loading: false,
    error: false,
    value: '',
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
    console.log(e.target.value);
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ query: this.state.value, page: 1, cards: [] });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });
      try {
        const cards = await getCards(this.state.query, this.state.page);
        this.setState({ cards: cards });
        const processedImages = cards.map(card => ({
          key: card.id,
          id: card.id,
          webformatURL: card.webformatURL,
          largeImageURL: card.largeImageURL,
        }));
        // this.setState({ images: processedImages });
        this.setState(prevState => ({
          cards: [...prevState.cards, ...processedImages],
        }));
        // this.setState({ images: processedImages });
      } catch (error) {
        console.log('OOPs...');
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleLoadMore = async () => {
    const { page } = this.state;
    const nextPage = page + 1;
    this.setState({ page: nextPage, cards: [] });
  };

  render() {
    return (
      <>
        <SearchBar
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          value={this.state.value}
        />
        {this.state.loading && <div>Загрузка</div>}
        <ImageGallery cards={this.state.cards} />
        <LoadMoreButton handleLoadMore={this.handleLoadMore} />
      </>
    );
  }
}