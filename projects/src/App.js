import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

class App extends Component {
  state = {
    projects: []
  }
  componentDidMount(){
    axios.get('http://localhost:5000/api/projects')
      .then(res => {
        this.setState({
          projects: res.data
        })
      })
      .catch(err => {
        console.log('Err', err)
      })
  }

  render() {
    return (
      <div>
        {this.projects}
      </div>
    )
  }
}

// function App() {
//   return (
//     <div className="App">
//       <h2>Welcome to the api</h2>
//     </div>
//   );
// }

export default App;
