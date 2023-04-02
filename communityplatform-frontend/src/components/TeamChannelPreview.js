import React from 'react'
import { Avatar,useChatContext } from 'stream-chat-react'
const TeamChannelPreview = (setActiveChannel,setToggleContainer, setIsCreating, setIsEditing,channel, type) => {

  const {channel: activeChannel, client} = useChatContext();

  const ChannelPreview = () => (
    <p className='channel-preview__item'>
      #{channel?.data?.name || channel?.data?.id}
    </p>
  ) 

  const DirectPreview = () =>{
    const members = Object.values (channel.state.members).filter(({user}) => user.id !==client.userID)

    return (
        <div className='channel-preview__list single'>
          <Avatar 
            image={members[0]?.user?.image}
            name={members[0]?.user?.name || members[0]?.user?.id}
            size={24}
            // The question marks ahead of dot check whether there is user or not.
          />
          <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
        </div>
  )
    }
  return (
    <div 
    className={
      channel?.id === activeChannel?.id ? 'channel-preview__wrapper__selected' : 'channel-preview__wrapper'
    }
    onClick={() => {
      setIsCreating(false);
      setIsEditing(false);
      setActiveChannel(channel)
      if(setToggleContainer){
        setToggleContainer(prevToggleState => !prevToggleState)
      }
    }}
    >
      {type==='team' ? <ChannelPreview /> : <DirectPreview />}
    </div>
  )
}

export default TeamChannelPreview
