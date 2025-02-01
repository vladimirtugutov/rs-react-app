import React from 'react';

type SearchButtonProps = {
  onClick: () => void;
};

class SearchButton extends React.Component<SearchButtonProps> {
  render() {
    return <button onClick={this.props.onClick}>SearchButton</button>;
  }
}

export default SearchButton;
