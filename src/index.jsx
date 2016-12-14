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

class FileUpload extends React.Component {
	constructor () {
		super()
		this.state = {
			uploadValue: 0
		} 
	}

	handleOnChange (event) {
		const file = event.target.files[0]
		const storageRef = firebase.storage().ref(`pictures/${file.name}`)
		const task = storageRef.put(file)

		task.on('state_changed', (snapshot) => {
			let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
			this.setState({
				uploadValue: percentage
			})
		}, (error) => {
			this.setState({
				message: `Ha ocurrido un error: ${error.message}`
			})
		}, () => {
			this.setState({
				message: 'Archivo subido',
				picture: task.snapshot.downloadURL
			})
		})
	}

	render () {
		return (
			<div>
				<progress value={this.state.uploadValue} max='100'></progress>
				<br />
				<input type="file" onChange={this.handleOnChange.bind(this)} />
				<br />
				{this.state.nessage}
				<br />
				<img width='100' src={this.state.picture} />
			</div>
		)
	}
}

ReactDOM.render(<FileUpload />), document.getElementById('root')