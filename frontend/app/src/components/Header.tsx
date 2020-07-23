import React from 'react';

function Header (props: any) {
    
    return (
        <div className="header">
            <ul className="nav">
                <li className="title">
                    <p>{props.headerTitle}</p>
                </li>
                <li>
                    <input className="search" type="search" placeholder="Search" id="search" name="search" />
                    <div className="searchIcon">&#9906;</div>
                </li>
            </ul>
            
        </div>
    )
}

export default Header