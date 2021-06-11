import React from 'react';
import './App.css';
import Header from './hook-components/Header';
import FormSearch from './hook-components/FormSearch';
import ImageCard from './hook-components/ImageCard';
import Loading from './hook-components/Loading';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      images: []
    }
  }

  changeDataImages = (data, offset) => {
    this.setState((oldState) => {
      const { images } = oldState;
      if (!offset) {
        return { images: data}
      }
      return { images: [...images, ...data]}
    })
  }

  changeLoading = (bool) => {
    this.setState({
      loading: bool
    })
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <FormSearch 
          changeDataImages={this.changeDataImages}
          changeLoading={this.changeLoading}
        />
        <div className="container">
          {this.state.loading && <Loading/>}
          {
            this.state.images.map((image, idx) => {
              return (
                <ImageCard
                  key={idx}
                  src={image.src}
                  alt={image.alt}
                  title={image.title}
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default App;