import React, { Component } from "react";
import { auth } from "../services/firebase";
import { Link } from "react-router-dom";
import Scroll from "react-scroll";
import { ReactSVG } from "react-svg";
var scroll = Scroll.animateScroll;

var noUserPhoto = "https://image.flaticon.com/icons/svg/61/61205.svg";

export default class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: auth().currentUser,
            heading: "PBJ Chan"
        };
    }

    // Used to create dynamic elements.
    modClasses = (class_name) => {
        var arr = this.state.dynamicElements;
        // Get index of class in dynamicElements
        var idx = arr.indexOf(class_name);
        // If exists in array, remove
        if (idx >= 0) arr.splice(idx, 1);
        // Else add to array
        else arr.push(class_name);
        this.setState({ dynamicElements: arr });
    };

    render() {
        return (
            <div className="sidebar">
                <ul>
                    <li>
                        <Link to="/feed" className="sidebar__icon">
                            {/* Feed SVG */}
                            {/* <svg
                                height="512"
                                viewBox="0 0 48 60"
                                width="512"
                                xmlns="http://www.w3.org/2000/svg">
                                <g id="021---Grilled-Cheese">
                                    <path
                                        id="Shape"
                                        d="m43 0h-38c-2.76005315.00330612-4.99669388 2.23994685-5 5v2c.00117044 2.45826313 1.29174664 4.7357505 3.4 6-2.10825336 1.2642495-3.39882956 3.5417369-3.4 6v31c.00330612 2.7600532 2.23994685 4.9966939 5 5h3.184c.26321382.7487793.81324768 1.3622381 1.5289781 1.705286.7157304.3430479 1.5384626.3875528 2.2870219.123714-.0305462 1.0717968.5130247 2.0784741 1.4259548 2.6408263s2.0565237.5949446 3.0000001.0855c.9434763-.5094446 1.5434989-1.4835295 1.5740451-2.5553263v-2h8v2c.0305462 1.0717968.6305688 2.0458816 1.5740452 2.5553262.9434763.5094446 2.0870698.4768522 3-.0855.9129301-.5623522 1.456501-1.5690294 1.4259548-2.6408262.648358.2209598 1.351642.2209598 2 0-.0305462 1.0717968.5130247 2.078474 1.4259548 2.6408262.9129302.5623522 2.0565237.5949446 3 .0855.9434764-.5094446 1.543499-1.4835294 1.5740452-2.5553262v-2h3c2.7600532-.0033061 4.9966939-2.2399468 5-5v-31c-.0011704-2.4582631-1.2917466-4.7357505-3.4-6 2.1082534-1.2642495 3.3988296-3.54173687 3.4-6v-2c-.0033061-2.76005315-2.2399468-4.99669388-5-5zm-38 49c-.80017481.0000301-1.56720337-.319607-2.13056591-.887852-.56336253-.568245-.87636894-1.3380032-.86954692-2.138148.86050169.6618067 1.91464356 1.0223232 3.00011283 1.026h38c1.0854693-.0036768 2.1396111-.3641933 3.0001128-1.026.006822.8001448-.3061844 1.569903-.8695469 2.138148s-1.3303911.8878821-2.1305659.887852zm-3 .974c.86038886.6618067 1.91453073 1.0223232 3 1.026h3v2h-3c-.80017481.0000301-1.56720337-.319607-2.13056591-.887852-.56336253-.568245-.87636894-1.3380032-.86943409-2.138148zm14 7.026c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1v-3c0-.5522847-.4477153-1-1-1s-1 .4477153-1 1-.4477153 1-1 1-1-.4477153-1-1v-3h6zm2-4v-2h8v2zm20 4c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1v-3c0-.5522847-.4477153-1-1-1s-1 .4477153-1 1-.4477153 1-1 1-1-.4477153-1-1-.4477153-1-1-1-1 .4477153-1 1v3c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1v-6h10zm5-4h-3v-2h3c1.0854693-.0036768 2.1396111-.3641933 3-1.026.0069348.8001448-.3060716 1.569903-.8694341 2.138148s-1.3303911.8878821-2.1305659.887852zm3-46c-.0033061 2.76005315-2.2399468 4.9966939-5 5-.5522847 0-1 .4477153-1 1s.4477153 1 1 1c2.7600532.0033061 4.9966939 2.2399468 5 5v23c0 1.6568542-1.3431458 3-3 3h-38c-1.65685425 0-3-1.3431458-3-3v-23c.00330612-2.7600532 2.23994685-4.9966939 5-5 .55228475 0 1-.4477153 1-1s-.44771525-1-1-1c-2.76005315-.0033061-4.99669388-2.23994685-5-5v-2c0-1.65685425 1.34314575-3 3-3h38c1.6568542 0 3 1.34314575 3 3z"
                                    />
                                    <path
                                        id="Shape"
                                        d="m36.707 17.293c-.3904999-.3903819-1.0235001-.3903819-1.414 0l-22 22c-.2599566.2510745-.3642126.6228779-.2726972.9725073.0915155.3496295.3645604.6226744.7141899.7141899.3496294.0915154.7214328-.0127406.9725073-.2726972l22-22c.3903819-.3904999.3903819-1.0235001 0-1.414z"
                                    />
                                    <path
                                        id="Shape"
                                        d="m38.707 6.293c-.3904999-.39038194-1.0235001-.39038194-1.414 0l-31 31c-.25995658.2510745-.3642126.6228779-.27269716.9725073.09151544.3496295.3645604.6226744.71418984.7141899.34962943.0915154.72143285-.0127406.97250732-.2726972l31-31c.3903819-.39049985.3903819-1.02350015 0-1.414z"
                                    />
                                    <path
                                        id="Shape"
                                        d="m7 30c.26519481-.0000566.51950727-.1054506.707-.293l22-22c.2599566-.25107447.3642126-.62287789.2726972-.97250732-.0915155-.34962944-.3645604-.6226744-.7141899-.71418984-.3496294-.09151544-.7214328.01274058-.9725073.27269716l-22 22c-.28590792.2859943-.37142191.7160366-.21667798 1.0896546.15474393.3736179.51928208.6172591.92367798.6173454z"
                                    />
                                    <path
                                        id="Shape"
                                        d="m7 21c.26519481-.0000566.51950727-.1054506.707-.293l13-13c.2599566-.25107447.3642126-.62287789.2726972-.97250732-.0915155-.34962944-.3645604-.6226744-.7141899-.71418984-.3496294-.09151544-.7214328.01274058-.9725073.27269716l-13 13c-.28590792.2859943-.37142191.7160366-.21667798 1.0896546.15474393.3736179.51928208.6172591.92367798.6173454z"
                                    />
                                    <path
                                        id="Shape"
                                        d="m9 10c.543 0 .565-.151 2.707-2.293.2599566-.25107447.3642126-.62287789.2726972-.97250732-.0915155-.34962944-.3645604-.6226744-.7141899-.71418984-.3496294-.09151544-.7214328.01274058-.9725073.27269716l-2 2c-.28590792.28599425-.37142191.71603662-.21667798 1.08965456s.51928208.61725909.92367798.61734544z"
                                    />
                                    <path
                                        id="Shape"
                                        d="m22.293 40.707c.3904999.3903819 1.0235001.3903819 1.414 0l18-18c.3789722-.3923789.3735524-1.0160848-.0121814-1.4018186s-1.0094397-.3911536-1.4018186-.0121814l-18 18c-.3903819.3904999-.3903819 1.0235001 0 1.414z"
                                    />
                                    <path
                                        id="Shape"
                                        d="m40.293 30.293-9 9c-.3789722.3923789-.3735524 1.0160848.0121814 1.4018186s1.0094397.3911536 1.4018186.0121814l9-9c.3789722-.3923789.3735524-1.0160848-.0121814-1.4018186s-1.0094397-.3911536-1.4018186-.0121814z"
                                    />
                                </g>
                            </svg> */}
                            <svg
                                height="512"
                                viewBox="0 0 48 60"
                                width="512"
                                xmlns="http://www.w3.org/2000/svg">
                                <g id="021---Grilled-Cheese" fill="none">
                                    <g id="Icons" transform="translate(1 1)">
                                        <path
                                            id="Shape"
                                            d="m40 12c3.3137085 0 6 2.6862915 6 6v23c0 2.209139-1.790861 4-4 4h-38c-2.209139 0-4-1.790861-4-4v-23c0-3.3137085 2.6862915-6 6-6-3.3137085 0-6-2.6862915-6-6v-2c0-2.209139 1.790861-4 4-4h38c2.209139 0 4 1.790861 4 4v2c0 3.3137085-2.6862915 6-6 6z"
                                            fill="#e8edfc"
                                        />
                                        <path
                                            id="Shape"
                                            d="m46 6v-2c0-2.209139-1.790861-4-4-4h-3c2.209139 0 4 1.790861 4 4v2c0 3.3137085-2.6862915 6-6 6 3.3137085 0 6 2.6862915 6 6v23c0 2.209139-1.790861 4-4 4h3c2.209139 0 4-1.790861 4-4v-23c0-3.3137085-2.6862915-6-6-6 3.3137085 0 6-2.6862915 6-6z"
                                            fill="#cad9fc"
                                        />
                                        <path
                                            id="Rectangle-path"
                                            d="m16 49h10v4h-10z"
                                            fill="#7facfa"
                                        />
                                        <path
                                            id="Shape"
                                            d="m8 49v4h-4c-2.209139 0-4-1.790861-4-4v-4c0 2.209139 1.790861 4 4 4z"
                                            fill="#7facfa"
                                        />
                                        <path
                                            id="Shape"
                                            d="m46 41v4c0 2.209139-1.790861 4-4 4h-38c-2.209139 0-4-1.790861-4-4v-4c0 2.209139 1.790861 4 4 4h38c2.209139 0 4-1.790861 4-4z"
                                            fill="#a4c2f7"
                                        />
                                        <path
                                            id="Shape"
                                            d="m43 44.859c.038273 1.0850793-.366197 2.1390994-1.1205308 2.9200235-.7543338.780924-1.7937154 1.2216513-2.8794692 1.2209773l3-.0000008c2.209139 0 4-1.790861 4-4v-4c-.0028421 1.8199962-1.2369138 3.4074237-3 3.859z"
                                            fill="#7facfa"
                                        />
                                        <path
                                            id="Shape"
                                            d="m46 45v4c0 2.209139-1.790861 4-4 4h-4v-4h4c2.209139 0 4-1.790861 4-4z"
                                            fill="#7facfa"
                                        />
                                        <g fill="#e8edfc">
                                            <path
                                                id="Shape"
                                                d="m38 49v7c0 1.1045695-.8954305 2-2 2s-2-.8954305-2-2v-3c0 1.1045695-.8954305 2-2 2s-2-.8954305-2-2v3c0 1.1045695-.8954305 2-2 2s-2-.8954305-2-2v-7z"
                                            />
                                            <path
                                                id="Shape"
                                                d="m16 49v7c0 1.1045695-.8954305 2-2 2s-2-.8954305-2-2v-3c0 1.1045695-.8954305 2-2 2s-2-.8954305-2-2v-4z"
                                            />
                                        </g>
                                    </g>
                                    <g
                                        id="Layer_3"
                                        fill="#fff"
                                        transform="translate(1)">
                                        <path
                                            id="Shape"
                                            d="m11 55h-3c-.00003976.8322288.51679194 1.5769583 1.29643405 1.8680989.77964215.2911407 1.65810775.067455 2.20356595-.5610989-.3199584-.3604295-.4977008-.8250482-.5-1.307z"
                                        />
                                        <path
                                            id="Shape"
                                            d="m3 50v-31c.00117044-2.4582631 1.29174664-4.7357505 3.4-6-2.10825336-1.2642495-3.39882956-3.54173687-3.4-6v-2c0-2.76142375 2.23857625-5 5-5h-3c-2.76142375 0-5 2.23857625-5 5v2c.00117044 2.45826313 1.29174664 4.7357505 3.4 6-2.10825336 1.2642495-3.39882956 3.5417369-3.4 6v31c0 2.7614237 2.23857625 5 5 5h3c-1.32608245 0-2.59785201-.5267842-3.53553391-1.4644661-.93768189-.9376819-1.46446609-2.2094515-1.46446609-3.5355339z"
                                        />
                                    </g>
                                    <g id="Layer_2" fill="#1E90FF">
                                        <path
                                            id="Shape"
                                            d="m1.02 24c-.55228475 0-1-.4477153-1-1s.44771525-1 1-1 1 .4477153 1 1-.44771525 1-1 1z"
                                        />
                                        <path
                                            id="Shape"
                                            d="m43 0h-38c-2.76005315.00330612-4.99669388 2.23994685-5 5v2c.00117044 2.45826313 1.29174664 4.7357505 3.4 6-2.10825336 1.2642495-3.39882956 3.5417369-3.4 6 0 .5522847.44771525 1 1 1s1-.4477153 1-1c.00330612-2.7600532 2.23994685-4.9966939 5-5 .55228475 0 1-.4477153 1-1s-.44771525-1-1-1c-2.76005315-.0033061-4.99669388-2.23994685-5-5v-2c0-.79564947.31607052-1.55871121.87867966-2.12132034.56260913-.56260914 1.32567087-.87867966 2.12132034-.87867966h38c1.6568542 0 3 1.34314575 3 3v2c-.0033061 2.76005315-2.2399468 4.9966939-5 5-.5522847 0-1 .4477153-1 1s.4477153 1 1 1c2.7600532.0033061 4.9966939 2.2399468 5 5v23c0 1.6568542-1.3431458 3-3 3h-38c-1.65685425 0-3-1.3431458-3-3v-15c0-.5522847-.44771525-1-1-1s-1 .4477153-1 1v23c.00330612 2.7600532 2.23994685 4.9966939 5 5h3.184c.26321382.7487793.81324768 1.3622381 1.5289781 1.705286.7157304.3430479 1.5384626.3875528 2.2870219.123714-.0305462 1.0717968.5130247 2.0784741 1.4259548 2.6408263s2.0565237.5949446 3.0000001.0855c.9434763-.5094446 1.5434989-1.4835295 1.5740451-2.5553263v-2h8v2c.0305462 1.0717968.6305688 2.0458816 1.5740452 2.5553262.9434763.5094446 2.0870698.4768522 3-.0855.9129301-.5623522 1.456501-1.5690294 1.4259548-2.6408262.648358.2209598 1.351642.2209598 2 0-.0305462 1.0717968.5130247 2.078474 1.4259548 2.6408262.9129302.5623522 2.0565237.5949446 3 .0855.9434764-.5094446 1.543499-1.4835294 1.5740452-2.5553262v-2h3c2.7600532-.0033061 4.9966939-2.2399468 5-5v-31c-.0011704-2.4582631-1.2917466-4.7357505-3.4-6 2.1082534-1.2642495 3.3988296-3.54173687 3.4-6v-2c-.0033061-2.76005315-2.2399468-4.99669388-5-5zm-35 53h-3c-.80017481.0000301-1.56720337-.319607-2.13056591-.887852-.56336253-.568245-.87636894-1.3380032-.86943409-2.138148.86038886.6618067 1.91453073 1.0223232 3 1.026h3zm8 4c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1v-3c0-.5522847-.4477153-1-1-1s-1 .4477153-1 1-.4477153 1-1 1-1-.4477153-1-1v-3h6zm10-4h-8v-2h8zm12 4c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1v-3c0-.5522847-.4477153-1-1-1s-1 .4477153-1 1-.4477153 1-1 1-1-.4477153-1-1-.4477153-1-1-1-1 .4477153-1 1v3c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1v-6h10zm5-4h-3v-2h3c1.0854693-.0036768 2.1396111-.3641933 3-1.026.0069348.8001448-.3060716 1.569903-.8694341 2.138148s-1.3303911.8878821-2.1305659.887852zm0-4h-38c-.80017481.0000301-1.56720337-.319607-2.13056591-.887852-.56336253-.568245-.87636894-1.3380032-.86954692-2.138148.86050169.6618067 1.91464356 1.0223232 3.00011283 1.026h38c1.0854693-.0036768 2.1396111-.3641933 3.0001128-1.026.006822.8001448-.3061844 1.569903-.8695469 2.138148s-1.3303911.8878821-2.1305659.887852z"
                                        />
                                        <path
                                            id="Shape"
                                            d="m36.707 17.293c-.3904999-.3903819-1.0235001-.3903819-1.414 0l-22 22c-.2599566.2510745-.3642126.6228779-.2726972.9725073.0915155.3496295.3645604.6226744.7141899.7141899.3496294.0915154.7214328-.0127406.9725073-.2726972l22-22c.3903819-.3904999.3903819-1.0235001 0-1.414z"
                                        />
                                        <path
                                            id="Shape"
                                            d="m6.293 38.707c.39049985.3903819 1.02350015.3903819 1.414 0l31-31c.2599566-.25107447.3642126-.62287789.2726972-.97250732-.0915155-.34962944-.3645604-.6226744-.7141899-.71418984-.3496294-.09151544-.7214328.01274058-.9725073.27269716l-31 31c-.39038194.3904999-.39038194 1.0235001 0 1.414z"
                                        />
                                        <path
                                            id="Shape"
                                            d="m6.293 29.707c.39049985.3903819 1.02350015.3903819 1.414 0l22-22c.2599566-.25107447.3642126-.62287789.2726972-.97250732-.0915155-.34962944-.3645604-.6226744-.7141899-.71418984-.3496294-.09151544-.7214328.01274058-.9725073.27269716l-22 22c-.39038194.3904999-.39038194 1.0235001 0 1.414z"
                                        />
                                        <path
                                            id="Shape"
                                            d="m6.293 20.707c.39049985.3903819 1.02350015.3903819 1.414 0l13-13c.2599566-.25107447.3642126-.62287789.2726972-.97250732-.0915155-.34962944-.3645604-.6226744-.7141899-.71418984-.3496294-.09151544-.7214328.01274058-.9725073.27269716l-13 13c-.39038194.3904999-.39038194 1.0235001 0 1.414z"
                                        />
                                        <path
                                            id="Shape"
                                            d="m11.707 7.707c.2599566-.25107447.3642126-.62287789.2726972-.97250732-.0915155-.34962944-.3645604-.6226744-.7141899-.71418984-.3496294-.09151544-.7214328.01274058-.9725073.27269716l-2 2c-.28590792.28599425-.37142191.71603662-.21667798 1.08965456s.51928208.61725909.92367798.61734544c.543 0 .565-.151 2.707-2.293z"
                                        />
                                        <path
                                            id="Shape"
                                            d="m41.707 21.293c-.3904999-.3903819-1.0235001-.3903819-1.414 0l-18 18c-.2599566.2510745-.3642126.6228779-.2726972.9725073.0915155.3496295.3645604.6226744.7141899.7141899.3496294.0915154.7214328-.0127406.9725073-.2726972l18-18c.3903819-.3904999.3903819-1.0235001 0-1.414z"
                                        />
                                        <path
                                            id="Shape"
                                            d="m40.293 30.293-9 9c-.3789722.3923789-.3735524 1.0160848.0121814 1.4018186s1.0094397.3911536 1.4018186.0121814l9-9c.3789722-.3923789.3735524-1.0160848-.0121814-1.4018186s-1.0094397-.3911536-1.4018186-.0121814z"
                                        />
                                    </g>
                                </g>
                            </svg>
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile" className="sidebar__icon">
                            {/* Profile SVG */}
                            <svg
                                version="1.1"
                                id="Capa_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 490.667 490.667"
                                style={{
                                    enableBackground: "new 0 0 490.667 490.667"
                                }}
                                space="preserve">
                                <g>
                                    <g>
                                        <path
                                            d="M245.333,0C110.059,0,0,110.059,0,245.333s110.059,245.333,245.333,245.333s245.333-110.059,245.333-245.333
			S380.608,0,245.333,0z M245.333,469.333c-123.52,0-224-100.48-224-224s100.48-224,224-224s224,100.48,224,224
			S368.853,469.333,245.333,469.333z"
                                        />
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <path
                                            d="M245.333,234.667c-76.459,0-138.667,62.208-138.667,138.667c0,5.888,4.779,10.667,10.667,10.667S128,379.221,128,373.333
			C128,308.629,180.629,256,245.333,256s117.333,52.629,117.333,117.333c0,5.888,4.779,10.667,10.667,10.667
			c5.888,0,10.667-4.779,10.667-10.667C384,296.875,321.792,234.667,245.333,234.667z"
                                        />
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <path
                                            d="M245.333,64c-41.173,0-74.667,33.493-74.667,74.667s33.493,74.667,74.667,74.667S320,179.84,320,138.667
			S286.507,64,245.333,64z M245.333,192C215.936,192,192,168.064,192,138.667s23.936-53.333,53.333-53.333
			s53.333,23.936,53.333,53.333S274.731,192,245.333,192z"
                                        />
                                    </g>
                                </g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                            </svg>

                            <h2 className="sidebar-link__header">Profile</h2>
                        </Link>
                    </li>
                    <li>
                        <Link to="/settings" className="sidebar__icon">
                            {/* Settings SVG */}
                            <svg
                                height="512pt"
                                viewBox="0 0 512 512"
                                width="512pt"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="m90.050781 395.949219c-7.167969 0-14.058593 1.789062-20.171875 5.148437-32.203125-41.28125-49.878906-92.5625-49.878906-145.097656 0-130.132812 105.867188-236 236-236 15.820312 0 31.632812 1.574219 47 4.679688 5.40625 1.09375 10.6875-2.40625 11.78125-7.820313s-2.40625-10.6875-7.820312-11.785156c-16.667969-3.367188-33.8125-5.074219-50.960938-5.074219-68.378906 0-132.667969 26.628906-181.019531 74.980469-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 57.519531 19.53125 113.652344 55.089844 158.652344-4.578125 6.839844-7.039063 14.878906-7.039063 23.296875 0 11.21875 4.371094 21.765625 12.304688 29.695312 7.929687 7.933594 18.476562 12.304688 29.695312 12.304688s21.765625-4.371094 29.699219-12.304688c7.933594-7.929687 12.300781-18.480469 12.300781-29.699219 0-11.214843-4.367187-21.765624-12.300781-29.695312-7.933594-7.933594-18.480469-12.300781-29.699219-12.300781zm15.554688 57.554687c-4.152344 4.15625-9.679688 6.445313-15.554688 6.445313s-11.398437-2.289063-15.554687-6.445313-6.445313-9.679687-6.445313-15.554687c0-5.878907 2.289063-11.402344 6.445313-15.558594 4.152344-4.15625 9.679687-6.441406 15.554687-6.441406s11.398438 2.289062 15.554688 6.441406c4.15625 4.15625 6.445312 9.679687 6.445312 15.558594 0 5.875-2.289062 11.398437-6.445312 15.554687zm0 0" />
                                <path d="m456.902344 97.335938c10.871094-16.308594 9.125-38.605469-5.253906-52.984376-7.933594-7.929687-18.480469-12.300781-29.699219-12.300781s-21.765625 4.371094-29.699219 12.300781c-7.933594 7.933594-12.300781 18.480469-12.300781 29.699219s4.367187 21.765625 12.300781 29.699219 18.480469 12.300781 29.699219 12.300781c7.167969 0 14.058593-1.789062 20.171875-5.148437 32.203125 41.285156 49.878906 92.5625 49.878906 145.097656 0 130.132812-105.867188 236-236 236-15.664062 0-31.328125-1.542969-46.550781-4.589844-5.414063-1.082031-10.683594 2.429688-11.769531 7.84375-1.082032 5.417969 2.429687 10.683594 7.84375 11.769532 16.511718 3.300781 33.496093 4.976562 50.476562 4.976562 68.378906 0 132.667969-26.628906 181.019531-74.980469 48.351563-48.351562 74.980469-112.640625 74.980469-181.019531 0-57.523438-19.535156-113.660156-55.097656-158.664062zm-50.507813-7.726563c-4.15625-4.15625-6.445312-9.679687-6.445312-15.558594 0-5.875 2.289062-11.398437 6.445312-15.554687 4.152344-4.15625 9.679688-6.445313 15.554688-6.445313s11.402343 2.289063 15.558593 6.445313c8.574219 8.578125 8.574219 22.535156 0 31.113281-4.15625 4.152344-9.683593 6.441406-15.558593 6.441406-5.878907 0-11.402344-2.289062-15.554688-6.441406zm0 0" />
                                <path d="m214.734375 428c0 5.523438 4.480469 10 10 10h62.527344c5.523437 0 10-4.476562 10-10v-19.386719c13.148437-3.539062 25.71875-8.75 37.53125-15.554687l13.6875 13.6875c1.875 1.875 4.417969 2.929687 7.074219 2.929687 2.648437 0 5.195312-1.054687 7.070312-2.933593l44.195312-44.226563c3.902344-3.90625 3.902344-10.238281 0-14.140625l-13.671874-13.671875c6.804687-11.8125 12.015624-24.382813 15.554687-37.53125h19.3125c5.523437 0 10-4.476563 10-10v-62.527344c0-5.523437-4.476563-10-10-10h-19.316406c-3.539063-13.144531-8.746094-25.714843-15.550781-37.527343l13.597656-13.597657c1.875-1.875 2.929687-4.421875 2.929687-7.074219-.003906-2.652343-1.058593-5.199218-2.933593-7.074218l-44.230469-44.195313c-3.902344-3.902343-10.234375-3.902343-14.140625.003907l-13.578125 13.582031c-11.8125-6.804688-24.382813-12.015625-37.53125-15.554688v-19.207031c0-5.523438-4.476563-10-10-10h-62.527344c-5.519531 0-10 4.476562-10 10v19.210938c-13.144531 3.535156-25.714844 8.746093-37.527344 15.550781l-13.582031-13.582031c-3.902344-3.902344-10.234375-3.90625-14.140625-.003907l-44.226563 44.199219c-1.878906 1.875-2.933593 4.417969-2.933593 7.070312 0 2.652344 1.054687 5.199219 2.929687 7.074219l13.597656 13.597657c-6.804687 11.8125-12.015624 24.378906-15.554687 37.527343h-19.277344c-5.523437 0-10 4.476563-10 9.996094l-.035156 62.527344c-.003906 2.652343 1.050781 5.199219 2.925781 7.074219s4.417969 2.929687 7.074219 2.929687h19.3125c3.539063 13.148437 8.75 25.71875 15.554687 37.53125l-13.671874 13.671875c-3.902344 3.902344-3.90625 10.234375 0 14.140625l44.195312 44.226563c1.875 1.875 4.417969 2.933593 7.070312 2.933593h.003907c2.652343 0 5.195312-1.054687 7.070312-2.929687l13.683594-13.6875c11.816406 6.804687 24.386719 12.015625 37.53125 15.554687zm-33.609375-55.972656c-3.957031-2.558594-9.164062-2.003906-12.5 1.328125l-12.175781 12.175781-30.058594-30.082031 12.164063-12.167969c3.332031-3.332031 3.886718-8.539062 1.328124-12.496094-9.066406-14.03125-15.441406-29.410156-18.941406-45.714844-.992187-4.605468-5.0625-7.898437-9.777344-7.898437h-17.175781l.023438-42.527344h17.152343c4.714844 0 8.785157-3.289062 9.777344-7.898437 3.5-16.300782 9.875-31.679688 18.941406-45.710938 2.558594-3.957031 2.003907-9.164062-1.328124-12.496094l-12.085938-12.089843 30.082031-30.058594 12.074219 12.078125c3.335938 3.332031 8.539062 3.882812 12.5 1.328125 14.027344-9.066406 29.40625-15.441406 45.710938-18.941406 4.605468-.992188 7.898437-5.066407 7.898437-9.777344v-17.078125h42.527344v17.074219c0 4.714843 3.289062 8.789062 7.898437 9.777343 16.300782 3.503907 31.683594 9.875 45.710938 18.941407 3.957031 2.558593 9.164062 2.007812 12.496094-1.328125l12.078124-12.074219 30.082032 30.058594-12.085938 12.085937c-3.335937 3.335938-3.886718 8.542969-1.328125 12.5 9.066407 14.03125 15.4375 29.410156 18.941407 45.710938.988281 4.609375 5.0625 7.898437 9.777343 7.898437h17.183594v42.527344h-17.183594c-4.714843 0-8.785156 3.292969-9.777343 7.898437-3.5 16.300782-9.875 31.683594-18.941407 45.710938-2.558593 3.960938-2.003906 9.167969 1.328125 12.5l12.164063 12.164062-30.058594 30.082032-12.175781-12.171875c-3.335938-3.335938-8.542969-3.886719-12.5-1.328125-14.03125 9.066406-29.410156 15.4375-45.710938 18.941406-4.609375.992188-7.898437 5.0625-7.898437 9.777344v17.253906h-42.527344v-17.253906c0-4.710938-3.292969-8.785156-7.898437-9.777344-16.300782-3.5-31.679688-9.875-45.710938-18.941406zm0 0" />
                                <path d="m338.628906 256c0-45.5625-37.066406-82.628906-82.628906-82.628906s-82.628906 37.066406-82.628906 82.628906 37.066406 82.628906 82.628906 82.628906 82.628906-37.066406 82.628906-82.628906zm-145.257812 0c0-34.535156 28.09375-62.628906 62.628906-62.628906s62.628906 28.097656 62.628906 62.628906-28.09375 62.628906-62.628906 62.628906-62.628906-28.09375-62.628906-62.628906zm0 0" />
                                <path d="m348.078125 37.820312c2.632813 0 5.210937-1.070312 7.070313-2.929687 1.859374-1.871094 2.929687-4.449219 2.929687-7.082031 0-2.617188-1.066406-5.199219-2.929687-7.070313-1.859376-1.859375-4.4375-2.929687-7.070313-2.929687-2.640625 0-5.207031 1.070312-7.066406 2.929687-1.863281 1.871094-2.933594 4.441407-2.933594 7.070313 0 2.640625 1.070313 5.210937 2.933594 7.082031 1.859375 1.859375 4.425781 2.929687 7.066406 2.929687zm0 0" />
                                <path d="m164.359375 474.359375c-2.628906 0-5.210937 1.070313-7.070313 2.929687-1.859374 1.859376-2.929687 4.441407-2.929687 7.070313 0 2.640625 1.070313 5.210937 2.929687 7.070313 1.859376 1.859374 4.441407 2.929687 7.070313 2.929687s5.210937-1.070313 7.070313-2.929687c1.859374-1.859376 2.929687-4.441407 2.929687-7.070313s-1.070313-5.210937-2.929687-7.070313c-1.859376-1.859374-4.441407-2.929687-7.070313-2.929687zm0 0" />
                            </svg>
                            <h2 className="sidebar-link__header">Settings</h2>
                        </Link>
                    </li>
                    <li>
                        <div
                            className="sidebar__icon"
                            onClick={() => {
                                scroll.scrollToTop({ containerId: "feed" });
                            }}>
                            {/* Scroll to Top SVG */}
                            <svg
                                version="1.1"
                                id="Capa_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 512.005 512.005"
                                style={{
                                    enableBackground: "new 0 0 512.005 512.005",
                                    transform: "scale(0.9)"
                                }}
                                space="preserve">
                                <g>
                                    <g>
                                        <path
                                            d="M466.211,205.787L263.544,3.12c-4.16-4.16-10.923-4.16-15.083,0L45.795,205.787c-21.803,21.803-21.803,57.28,0,79.083
                                            s57.28,21.803,79.083,0l77.781-77.781v251.584c0,29.397,23.936,53.333,53.333,53.333s53.333-23.936,53.333-53.333V207.088
                                            l77.803,77.781c21.803,21.803,57.28,21.803,79.083,0S488.013,227.589,466.211,205.787z M451.128,269.787
                                            c-13.056,13.056-35.861,13.056-48.917,0l-96-96c-3.051-3.029-7.637-3.947-11.627-2.304c-3.989,1.643-6.592,5.547-6.592,9.856
                                            v277.333c0,17.643-14.357,32-32,32s-32-14.357-32-32V181.339c0-4.309-2.603-8.213-6.592-9.856
                                            c-1.323-0.555-2.709-0.811-4.075-0.811c-2.773,0-5.504,1.088-7.531,3.115l-96,96c-13.056,13.056-35.861,13.056-48.917,0
                                            c-13.483-13.483-13.483-35.435,0-48.917L255.992,25.755l195.136,195.115C464.611,234.352,464.611,256.304,451.128,269.787z"
                                        />
                                    </g>
                                </g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                            </svg>

                            <h2 className="sidebar-link__header">Top</h2>
                        </div>
                    </li>
                    <li>
                        <div
                            className="sidebar__icon"
                            onClick={() => {
                                if (window.innerWidth >= 700)
                                    this.props.invokeKitchen(false);
                                else this.props.invokeKitchen(false);
                            }}>
                            {/* Compose SVG */}
                            <svg
                                style={{ transform: "scale(0.8)" }}
                                height="401pt"
                                viewBox="0 -1 401.52289 401"
                                width="401pt"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="m370.589844 250.972656c-5.523438 0-10 4.476563-10 10v88.789063c-.019532 16.5625-13.4375 29.984375-30 30h-280.589844c-16.5625-.015625-29.980469-13.4375-30-30v-260.589844c.019531-16.558594 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.519531-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.59375c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.792969c0-5.523437-4.476563-10-10-10zm0 0" />
                                <path d="m376.628906 13.441406c-17.574218-17.574218-46.066406-17.574218-63.640625 0l-178.40625 178.40625c-1.222656 1.222656-2.105469 2.738282-2.566406 4.402344l-23.460937 84.699219c-.964844 3.472656.015624 7.191406 2.5625 9.742187 2.550781 2.546875 6.269531 3.527344 9.742187 2.566406l84.699219-23.464843c1.664062-.460938 3.179687-1.34375 4.402344-2.566407l178.402343-178.410156c17.546875-17.585937 17.546875-46.054687 0-63.640625zm-220.257812 184.90625 146.011718-146.015625 47.089844 47.089844-146.015625 146.015625zm-9.40625 18.875 37.621094 37.625-52.039063 14.417969zm227.257812-142.546875-10.605468 10.605469-47.09375-47.09375 10.609374-10.605469c9.761719-9.761719 25.589844-9.761719 35.351563 0l11.738281 11.734375c9.746094 9.773438 9.746094 25.589844 0 35.359375zm0 0" />
                            </svg>
                            <h2 className="sidebar-link__header">Kitchen</h2>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}