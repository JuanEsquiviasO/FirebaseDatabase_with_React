import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'

const config = {
	apiKey: 'AIzaSyAlSpfHxwziVsy1cIXXmxOn-VGZt7XX6tA',
	authDomain: 'react-firebase-ee573.firebaseapp.com',
	databaseURL: 'https://react-firebase-ee573.firebaseio.com',
	storageBucket: 'react-firebase-ee573.appspot.com',
	messagingSenderId: '389380482863'
}
firebase.initializeApp(config)

class App extends React.Component {
	constructor () {
		super()
		this.state = {
			name: 'Hunter'
		}
	}

componentWillMount () {
	const nameRef = firebase.database().ref().child('object').child('name')

	nameRef.on('value', (snapshot) => {
		this.set.state({
			name: snapshot.val()
		})
	})
}

	render () {
		return <h1>Hi {this.state.name}</h1>
	}
}

ReactDOM.render(<App />, document.getElementById('root'))