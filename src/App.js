import React from 'react';
import Greeting from './components/book_session_forms/greeting_container'
import Modal from './components/session_forms/modal'
import Reader from './components/reader'
import Highlights from './components/highlights'
import Books from './components/books'
import { ProtectedRoute } from './util/route_util';
import { Switch } from 'react-router-dom';
import './assests/App.css';

function App() {
  return (
    <div className="App" style={{position: "absolute", height: "100%", width: "100%"}}>
      <Greeting />
      <Modal className="modal"/>
      <Switch>
        <ProtectedRoute path="/:book" component={Reader} />
        <ProtectedRoute path="/" component={Books} />
      </Switch>
      <ProtectedRoute path="/:book" component={Highlights} />
    </div>
  );
}

export default App;
