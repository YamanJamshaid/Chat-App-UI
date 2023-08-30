import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useChat } from '../context/ChatProvider';
import useChatActions from '../hooks/useChatActions';
import useDebounce from '../hooks/useDebounce';
import { Description } from '../styled/Description';

const RoomListContainer = styled.div`
    --space: 1em;
    --horizontal-space: 2vw;
    
    display: flex;
    flex-direction: column;
    width: 26%;
    height: 100%;
    padding-top: var(--vertical-padding);
    overflow: auto;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    background: #4FCE5D;
    color: #000000;
    
    & h3 {
        font-size: 1.5em;
        font-weight: 500;
        padding: 0.9em var(--horizontal-space);
    }

    @media (max-width: 820px) {
        position: absolute;
        opacity: ${ props => props.open ? '1' : '0'};
        pointer-events: ${ props => props.open ? 'null' : 'none'};
        right: 0;
        width: 100%;
        border-radius: 0;
        z-index: 1;
    }
`;

const RoomItem = styled.li`
    display: flex;
    gap: 1vw;
    width: 100%;
    flex: 1;
    padding: var(--space) var(--horizontal-space);
    list-style: none;
    background: ${ props => props.active ?  'var(--blue-active-color)' : 'transparent'};
    cursor: pointer;
    transition: all .05s;

    &:hover {
        background: var(--blue-active-color);
    }

    & img {
        height: 3vw;
        width: 3vw;
        border-radius: 30px;
        object-fit: cover;
    }

    & div {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    & span {
        font-weight: 500;
        font-size: 0.8em;
    }
`;


// Static rooms in the chat
const rooms = [
    {
        id: 1,
        name: 'Usman Jam',
        src: './rooms-images/profile.jpg',
        description: 'The one and only ME!'
    },

    {
        id: 2,
        name: 'Project Bano-Qabil',
        src: './rooms-images/profile.jpg',
        description: 'Community for developers, we help each other.'
    },
    
    {
        id: 3,
        name: 'Mazz',
        src: './rooms-images/profile.jpg',
        description: 'Freind'
    },

    {
        id: 4,
        name: 'Zayan',
        src: './rooms-images/profile.jpg',
        description: 'A freind of mine, whose helps me making apps'
    },

    {
        id: 5,
        name: 'Muhammad Ali',
        src: './rooms-images/profile.jpg',
        description: 'freind'
    },

    {
        id: 6,
        name: 'Zohaib Tariq',
        src: './rooms-images/profile.jpg',
        description: 'A freind of mine'
    },

    // {
    //     id: 7,
    //     name: 'Fitness Enthusiasts 💪🏽',
    //     src: './rooms-images/fitness.jpg',
    //     description: 'Individuals who have a love for films and enjoy watching and discussing different genres, styles, and storylines.'
    // }
];

const RoomList = ({ query, isNavOpen, setIsNavOpen }) => {
    const debouncedSearch = useDebounce(query, 350);
    const { joinRoom } = useChatActions();
    const { currentRoom, setCurrentRoom, userName } = useChat();


    const filteredRooms = useMemo(() => {
        const filter = rooms.filter(room => {
            const includesCaseInsensitive  = {
                name: room.name.toLowerCase(),
                description: room.description.toLowerCase()
            };
    
            const { name, description } = includesCaseInsensitive;
    
            return name.includes(debouncedSearch.toLowerCase()) || description.includes(debouncedSearch.toLowerCase());
        });

        return filter;
    }, [debouncedSearch]);

    const handleRoomClick = (roomID) => {
        if(currentRoom?.id === roomID) {
            return;
        }

        const selectedRoom = rooms.find(room => room.id === roomID);
        setCurrentRoom(selectedRoom);

        joinRoom({ roomID, userName });

        setIsNavOpen(false);
    }
    

    return (
        <RoomListContainer open={ isNavOpen }>
            <h3>Chats</h3>

            <ul>
                {   
                    
                    filteredRooms.map(room => {
                        const { id, name, src, description} = room;

                        return (
                            <RoomItem active={ currentRoom?.id === id } key={ id } onClick={ () => handleRoomClick(id) }>
                                <img alt='room-img' src={ src } />

                                <div>
                                    <span>{ name }</span>
                                    <Description color='rgba(254,254,254,0.5)' size='0.7em'>{ description }</Description>
                                </div>
                            </RoomItem>
                        );
                    })
                }
            </ul>
        </RoomListContainer>
    );
};

export default RoomList;