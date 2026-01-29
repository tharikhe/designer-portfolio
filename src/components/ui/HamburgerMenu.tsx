import React from 'react';
import styled from 'styled-components';

interface HamburgerMenuProps {
    isOpen: boolean;
    onClick: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onClick }) => {
    return (
        <StyledWrapper>
            <button className="btn" onClick={onClick} aria-label="Toggle menu">
                <span className="icon">
                    <svg viewBox="0 0 175 80" width={40} height={40}>
                        <rect width={80} height={15} fill="#C41E3A" rx={10} />
                        <rect y={30} width={80} height={15} fill="#C41E3A" rx={10} />
                        <rect y={60} width={80} height={15} fill="#C41E3A" rx={10} />
                    </svg>
                </span>
                <span className="text">{isOpen ? 'CLOSE' : 'MENU'}</span>
            </button>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .btn {
    width: 150px;
    height: 50px;
    border-radius: 5px;
    border: none;
    transition: all 0.5s ease-in-out;
    font-size: 20px;
    font-family: 'Anton', sans-serif;
    font-weight: 600;
    display: flex;
    align-items: center;
    background: #F5F0E8;
    color: #C41E3A;
    cursor: pointer;
  }

  .btn:hover {
    box-shadow: 0 0 20px 0px rgba(196, 30, 58, 0.2);
  }

  .btn .icon {
    position: absolute;
    height: 40px;
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
  }

  .btn .text {
    transform: translateX(55px);
    letter-spacing: 0.05em;
  }

  .btn:hover .icon {
    width: 175px;
  }

  .btn:hover .text {
    transition: all 0.5s;
    opacity: 0;
  }

  .btn:focus {
    outline: none;
  }

  .btn:active .icon {
    transform: scale(0.85);
  }
`;

export default HamburgerMenu;
