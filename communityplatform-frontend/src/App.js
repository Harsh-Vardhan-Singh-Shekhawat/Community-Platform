import {StreamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannelContainer, ChannelListContainer,Auth } from './components';
import './App.css'

const key = '7x7sc5xxfwek';
const authToken = cookies.get('token');
const client = StreamChat.getInstance(key);
const cookies = new Cookies();

if(authToken){
   client.connectUser({
      id:cookies.get('user_id'),
      name:cookies.get('username'),
      fullName:cookies.get('fullName'),
      image:cookies.get('avatarURL'),
      hashedPassword:cookies.get('hashedPassword'),
      phoneNumber:cookies.get('phoneNumber'),
    }, authToken)
}


function App() {

  if(!authToken) return <Auth />

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team dark">
        <ChannelListContainer />
        <ChannelContainer />
      </Chat>
    </div>
  );
}

export default App;
