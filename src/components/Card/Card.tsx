import { Component } from 'react';
import type { PokeData } from '../../api/types';
import { Loading } from '../Loading';

type State = {
  imageLoaded: boolean;
};

export class Card extends Component<PokeData, State> {
  state: State = { imageLoaded: false };

  handleImageLoad = () => {
    this.setState({ imageLoaded: true });
  };

  render() {
    const { name, data } = this.props;
    const { imageLoaded } = this.state;

    return (
      <div className="flex flex-col shadow-lg/10 rounded-xl text-blue-950">
        <div className="relative h-[250px]">
          {!imageLoaded && <Loading />}

          <div className="h-full flex items-center justify-center">
            <img
              src={data.imgUrl}
              alt={name}
              className={`h-full w-auto transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              data-testid="card-image"
              onLoad={this.handleImageLoad}
            />
          </div>
        </div>

        <div className="bg-blue-100 p-4 flex flex-col gap-2 rounded-b-xl">
          <div className="flex flex-col justify-center items-center">
            <p className="text-2xl font-semibold" data-testid="card-name">
              {name.toUpperCase()}
            </p>
          </div>

          <div className="flex justify-between gap-4 p-2 bg-blue-50 rounded-md">
            <div className="flex gap-1 items-center">
              <div className="text-l font-normal">HEIGHT: </div>
              <div className="text-xl font-bold" data-testid="card-height">
                {data.height / 10}M
              </div>
            </div>

            <div className="flex gap-1 items-center">
              <div className="text-l font-normal">WEIGHT: </div>
              <div className="text-xl font-bold" data-testid="card-weight">
                {data.weight / 10}KG
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
