import React from 'react'
import { AddChannel } from '../assets'
const TeamChannelList = ({children, error = true, loading, type,isCreating, setIsCreating, isEditing, setIsEditing}) => {
    // if(error){
    //     return type === 'team' ? (
    //         <div className='team-channel-list'>
    //             <p className='team-channel-list__message'>
    //                 Connection Error. Please, Try again
    //             </p>
    //         </div>
    //     ) : null 
    // }
    if(loading){
        return (
            <div className='team-channel-list'>
                <p className='team-channel-list loading'>
                    {type==='team' ? 'Channels' : 'Messages'} Loading...
                </p>
            </div>
        )
    }

    return (
        <div className='team-channel-list'>
            <div className='team-channel-list__header'>
                <p className='team-channel-list__header__title'>
                    {type === 'team' ? 'Channels' : 'Direct Messages'}
                </p>
                <AddChannel
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                isEditing={setIsEditing}
                setIsEditing={setIsEditing}
                type={type==='team' ? 'team' :'messaging'}
                 

                />
            </div>
                {children}
        </div>
  )
}

export default TeamChannelList
