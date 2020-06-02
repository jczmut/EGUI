import React from 'react'

export default function MainWrapper(props) {
    return (
        <div id="mainwrapper" className={props.smallversion ? "small-version" : ""}>
            {props.children}
            <footer>
                <p>Calendar by Czmut</p>
            </footer> 
        </div>
    )
}
