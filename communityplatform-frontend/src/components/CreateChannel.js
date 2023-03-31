import React from 'react'
import { useState } from 'react'
import { useChatContext } from 'stream-chat-react'
import {UserList} from './'
import {CloseCreateChannel} from '../assets'

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

const CreateChannel = (createType,setIsCreating) => {

  const [channelName, setChannelName] = useState('');

  return (
    <div className='create-channel__container'>
      {/* <ChannelNameInput /> */}
       <div className='create-channel__header'>
          <p>{createType=== 'team' ? 'Create a newChannel' : 'Send a Direct message'}</p>
          <CloseCreateChannel setIsCreating={setIsCreating} />
       </div>
       {createType === 'team' && <ChannelNameInput  channelName={channelName} setChannelName={setChannelName}/>}
    </div>
  )
}

export default CreateChannel
