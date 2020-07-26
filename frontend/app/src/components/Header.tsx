import React from 'react';

function Header (props: any) {

    function handleChange(event: any) {
        props.onChange(event);
    }

    console.log(props)
    
    return (
        <div className="header">
            <ul className="nav">
                <li className="title">
                    <p>{props.headerTitle}</p>
                </li>
                <li>

                    {
                        props.page == 'albums' ? 
                        <>
                            <input autoFocus value={props.value}  onChange={handleChange} className="search" type="search" placeholder="Search" id="search" name="search" />
                            <img className="searchIcon" src="./shape@2x.png" />
                        </>
                        : <></>
                    }
                </li>
            </ul>
            
        </div>
    )
}

export default Header