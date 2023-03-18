import {StreamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannelContainer, ChannelListContainer,Auth } from './components';
import './App.css'
import 'stream-chat-react/dist/css/index.css'
import { useState } from 'react';

const cookies = new Cookies();
const key = '6vn8xx3rzgmv';
const authToken = cookies.get('token');
const client = StreamChat.getInstance(key);

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

  const [createType,setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if(authToken) return <Auth />

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team dark">
        <ChannelListContainer 
          isCreating = {isCreating}
          setIsCreating = {setIsCreating}
          setCreateType = {setCreateType}
          setIsEditing = {setIsEditing}
        />
        <ChannelContainer
          isCreating = {isCreating}
          setIsCreating = {setIsCreating}
          isEditing = {isEditing}
          setIsEditing = {setIsEditing}
          createType = {createType}
        />
      </Chat>
    </div>
  );
}
 
export default App;
