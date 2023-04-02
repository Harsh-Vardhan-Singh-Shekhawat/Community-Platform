import React from 'react'
import { useState } from 'react'
import { useChatContext } from 'stream-chat-react'
import {Userlist} from './'
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
  const {client,setActiveChannel} = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);
  
   const createChannel = async (e) => {
      e.preventDefault();

      try{
          const newChannel = await client.channel(createType, channelName, {
            name:channelName,members:setSelectedUsers
          });

          await newChannel.watch();

          setChannelName('');
          setIsCreating(false);
          setSelectedUsers([client.userID]);
          setActiveChannel(newChannel);
      }
      catch(error) {
        console.log(error)
      }
   }

  return (
    <div className='create-channel__container'>
      {/* <ChannelNameInput /> */}
       <div className='create-channel__header'>
          <p>{createType=== 'team' ? 'Create a newChannel' : 'Send a Direct message'}</p>
          <CloseCreateChannel setIsCreating={setIsCreating} />
       </div>
       {createType === 'team' && <ChannelNameInput  channelName={channelName} setChannelName={setChannelName}/>}
       <Userlist  setSelectedUsers={setSelectedUsers}/>
       <div className='create-channel__button-wrapper' onClick={createChannel}>
        <p>
          {createType==='team' ? 'Create Channel' : 'Create Message Group'}
        </p>
       </div>
    </div>
  )
}

export default CreateChannel
