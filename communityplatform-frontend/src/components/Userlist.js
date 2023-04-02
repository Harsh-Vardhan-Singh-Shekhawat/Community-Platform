import React, {useState,useEffect} from 'react'
import  {Avatar, useChatChannel, useChatContext} from 'stream-chat-react';
import { InviteIcon } from '../assets';

const ListContainer = ({children}) => {
    return (
        <div className='user-list__container'>
            <div className='user-list__header'>
                <p>User</p>
                <p>Invite</p>
            </div>
            {children}
        </div>
    )
} 

const UserItem = ({user,setSelectedUsers}) =>{

    const [selected, setSelected] = useState(false);
    
    const handleSelect = () => {
        if(selected) {
            setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !==user.id))
        }
        else {
            setSelectedUsers((prevUsers) => [ ...prevUsers,user.id])
        }
        setSelected((prevSelected) => !prevSelected);
    }
    
    return (
        <div onClick={handleSelect} className='user-item__wrapper'>
            <div className='user-item__name-wrapper'>
                <Avatar image={user.image} name={user.fullName || user.id} size={32} />
                <p>{user.fullName || user.id}</p>
            </div>
            {selected ? <InviteIcon /> :<div className='user-item__invite-empty'></div>}
        </div>
    )
}

const Userlist = ({setSelectedUsers}) => {

    const client = useChatContext();
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listEmpty, setListEmpty] = useState(false);
    const [error,setError] = useState();

    useEffect(() => {
        const getUsers = async () => {
            if(loading) return ;

            setLoading(true);
            try {
                const response = await client.queryUsers(
                    {id:{$ne: client.userID}},
                    {id:1},
                    {limit:8 }
                );

                if(response.users.length){
                    setUser(response.user);
                }
                else {
                    setListEmpty(true);
                }
            } catch (error) {
                console.log(error);
            }setLoading(false);
        }

        if(client) getUsers()
    }, []);

    if(error){
        return (
            <ListContainer>
                <div className='user-list__message'>
                    Error , Please refresh and try again.
                </div>
            </ListContainer>
        )
    }

    if(listEmpty) {
        return (
            <ListContainer>
                <div className='user-list__message'>
                    No user found.
                </div>
            </ListContainer>
        )
    }
  return (
    <ListContainer>
        {loading ? <div className='user-list__message'>
            Loading users...
        </div> : (
            user?.map((user,i) =>(<UserItem index={i} key={user.id} user={user} setSelectedUsers={setSelectedUsers}/>) 
            )
        )

        }
    </ListContainer>
  )
}

export default Userlist
