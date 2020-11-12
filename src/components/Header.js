import React from "react";
import Scroll from "react-scroll";
var scroll = Scroll.animateScroll;

export default function Header(props) {
    return (
        <header className="pbj-header">
            <nav className="navbar navbar-expand-sm">
                <p
                    className="navbar-title"
                    onClick={() => {
                        scroll.scrollToTop({ containerId: "feed" });
                    }}>
                    {props.title}
                </p>
            </nav>
        </header>
    );
}
