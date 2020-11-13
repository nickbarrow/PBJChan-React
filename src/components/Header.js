import React from "react";
import Scroll from "react-scroll";
var scroll = Scroll.animateScroll;

export default function Header(props) {
    return (
        <header className="pbj-header">
            <p
                className="header-title"
                onClick={() => {
                    scroll.scrollToTop({ containerId: "feed" });
                }}>
                {props.title}
            </p>
        </header>
    );
}
