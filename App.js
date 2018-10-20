import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { Header, ButtonGroup } from 'react-native-elements';
import { getNews } from './src/news';
import Article from './src/components/Article';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [], refreshing: true, selectedIndex: 0, country:''};
    this.fetchNews = this.fetchNews.bind(this);
    this.updateIndex = this.updateIndex.bind(this)
  }
  // Called after a component is mounted
  componentDidMount() {
    this.fetchNews();
   }

  fetchNews(country) {
    let location = country || ''
    getNews(location)
      .then(articles => this.setState({ articles, refreshing: false }))
      .catch(() => this.setState({ refreshing: false }));
  }

  handleRefresh() {
    const {country} = this.state
    this.setState(
      {
        refreshing: true
    },
      () => this.fetchNews()
    );
  }
  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
    let country = selectedIndex === 1 ? 'us':selectedIndex === 2 ?'au':selectedIndex === 3?'in':''
    this.setState(
      {
        refreshing: true,
        country:country
      
    },
      () => this.fetchNews(country)
    )
  }

  render() {
    const { heading } = styles;
    const buttons = ['World','USA', 'AUSTRALIA', 'INDIA',]
    const { selectedIndex } = this.state
    return (
<View>
      <Header
        centerComponent={{ text: 'My Times', style: { color: '#fff', fontSize: 20 } }}
      />
      <ButtonGroup
      onPress={this.updateIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      selectedButtonStyle={{backgroundColor:'#1487df'}}
      selectedTextStyle={{color: '#fff'}}
      containerStyle={{height: 40}}
    />
      <FlatList
        data={this.state.articles}
        renderItem={({ item }) => <Article article={item} />}
        keyExtractor={item => item.url}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh.bind(this)}
      />
      </View>
  );
  }
}

const styles = {
  heading: {
    paddingLeft: 10,
    fontStyle: 'italic',
    color: '#b2bec3',
    fontSize: 10
  },
};
