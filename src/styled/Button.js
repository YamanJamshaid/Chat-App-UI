import styled from "styled-components";

export const ButtonContainer = styled.div`
    display: ${ props => props.device === 'mobile' ? 'none' : 'flex'};
    flex: ${ props => props.flex ? props.flex : '1'};
    align-items: flex-end;

    @media (max-width: 820px) {
        display: flex;
    }

    & a, button { 
        display: flex;
        justify-content: center;
        align-items: center;
        padding: ${ props => props.padding ? props.padding : '1.2em'};
        width: ${ props => props.size ? props.size : '3.9em'};
        height: ${ props => props.size ? 'auto' : '3.9em'};
        border: none;
        border-radius: ${ props => props.borderRadius ? props.borderRadius : '  .5em'};
        background: ${ props => props.active ? 'var(--white-active-color)' : 'var(--secondry-color-light-palette)' };
        box-shadow: ${ props => props.active ? '#000 0 0 10px' : null };
        aspect-ratio: 1/1;
        transition: .3s ease-in-out all;
        cursor: pointer;


        @media (max-width: 820px) {
            padding: 0.7em;
        }
    }
    
    & svg {
        fill: ${ props => props.active ? '#000000;' : '#000'};
        transition: .3s ease-in-out all;
    }
    
    & button:hover, a:hover {
        background: #435A64;
        box-shadow: rgba(32, 112, 198, 0.7) 0 0 10px;
        opacity: 0.8;
    }

    & a:hover svg {
        fill: #4FCE5D;;
    }
`;