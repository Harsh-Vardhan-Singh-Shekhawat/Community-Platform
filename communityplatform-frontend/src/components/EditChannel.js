import React, {useState} from 'react'
import {useChatContext} from 'stream-chat-react'
import { CloseCreateChannel } from '../assets/CloseCreateChannel'
import Userlist from './Userlist'

const ChannelNameInput = ({channelName='', setChannelName}) =>{

  
  const changeHandler = (e) =>{
    e.preventDefault();
    setChannelName(e.target.value);
  }
  
  return (
    <div className='channel-name-input__wrapper'>
      <p>Name</p>
      <input value={channelName} onChange={changeHandler} placeholder='channel name without space'/>
      <p>Add members</p>
    </div>
  )
}

const EditChannel = ({setIsEditing}) => {

  const channel = useChatContext();
  const [channelName, setChannelName] = useState(channel?.data?.name);
  const [selectedUsers, setSelectedUsers] = useState('');

  const updateChannel = async (e) => {
    e.preventDefault();

    const nameChanged = channelName !== (channel.data.name || channel.data.id);

    if(nameChanged){
        await channel.update({name:channelName}, {text: `Channel Name changed to ${channelName}`});  
    }

    if(selectedUsers.length){
      await channel.addMembers(selectedUsers);
    }
    setChannelName(null);
    setSelectedUsers([]);
    setIsEditing(false);
  }

  return (
    <div className='edit-channel__container'>
     <div className='edit-channel__header'>
        <p>Edit Channel</p>
        <CloseCreateChannel setIsEditing={setIsEditing} />
     </div>
     <ChannelNameInput 
        channelName={channelName}  
        setChannelName={setChannelName}
      />
     <Userlist setSlelectedUsers={setSelectedUsers}/>
     <div className='edit-channel__button-wrapper' onClick={updateChannel}>

      <p>
        Save Changes
      </p>
     </div>
    </div>
  )
}

export default EditChannel
