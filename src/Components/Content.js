import React from 'react'
import { FaAngleRight, FaAngleLeft, FaTimes, FaMapMarkerAlt, FaLanguage  } from "react-icons/fa";
import Carousel from './carousel';



const insideSlider = () => {
    const imageContainers = document.querySelectorAll(".explore-container");

    imageContainers.forEach(imageContainer => {
        const beforeButton = imageContainer.querySelector(".before-icon");
        const afterButton = imageContainer.querySelector(".after-icon");
        const imgBox = imageContainer.querySelector(".img-box"); 

        if (beforeButton) {
            beforeButton.addEventListener('click', () => {
                const moveAmount = -imgBox.clientWidth;
                imgBox.scrollBy({ left: moveAmount, behavior: "smooth" });
            });
        }

        if (afterButton) {
            afterButton.addEventListener('click', () => {
                const moveAmount = imgBox.clientWidth;
                imgBox.scrollBy({ left: moveAmount, behavior: "smooth" });
            });
        }
    });
};

const secondSlide = () => {
    const destinationSlideButtons = document.querySelectorAll(".change_button");
    const destinationContainer = document.querySelector(".destination-inner-container");
    const changeScroll = destinationContainer.scrollWidth - destinationContainer.clientWidth;
    
    destinationSlideButtons.forEach(item => {
        item.addEventListener("click", () => {
            const flow = item.id === "before_slide" ? -1 : 1;
            const changeAmount = destinationContainer.clientWidth * flow;
            destinationContainer.scrollBy({ left: changeAmount, behavior: "smooth" });
        })
    })
    
    const handleDestinationButtons = () => {
        destinationSlideButtons[0].style.display = destinationContainer.scrollLeft <= 0 ? "none" : "block";
        destinationSlideButtons[1].style.display = destinationContainer.scrollLeft >= changeScroll ? "none" : "block";
    }
    
    destinationContainer.addEventListener('scroll', () => {
        handleDestinationButtons();
    })
}

const thirdSlider = () => {
    const exploreButtons = document.querySelectorAll(".icon_button");
    const exploreContainer = document.querySelector(".explore-inner-container");
    const alterScrollLeft = exploreContainer.scrollWidth - exploreContainer.clientWidth;

    exploreButtons.forEach(exploreButton => {
        exploreButton.addEventListener("click", () => {
            const alter = exploreButton.id === "former_slide" ? -1 : 1;
            const alterAmount = exploreContainer.clientWidth * alter;
            exploreContainer.scrollBy({ left: alterAmount, behavior: "smooth" });
        })
    })


    const handleExploreButtons = () => {
        exploreButtons[0].style.display = exploreContainer.scrollLeft <= 0 ? "none" : "block";
        exploreButtons[1].style.display = exploreContainer.scrollLeft >= alterScrollLeft ? "none" : "block";
    }


    exploreContainer.addEventListener('scroll', () => {
        handleExploreButtons();
    })

}

const initSlider = () => {
    const slideButtons = document.querySelectorAll(".slide_button");
    const stayContainer = document.querySelector(".stay-inner-container");
    const maxScrollLeft = stayContainer.scrollWidth - stayContainer.clientWidth;

    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev_slide" ? -1 : 1;
            const scrollAmount = stayContainer.clientWidth * direction;
            stayContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
        })
    })


    const handlebuttons = () => {
        slideButtons[0].style.display = stayContainer.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display = stayContainer.scrollLeft >= maxScrollLeft ? "none" : "block";
    }


    stayContainer.addEventListener('scroll', () => {
        handlebuttons();
    })

}

window.addEventListener("load", () => {
    initSlider();
    secondSlide();
    insideSlider(); 
    thirdSlider();
});
const Content = () => {
    // const sendNameToStayContainer = () => {
    //     // Send name to StayContainer component

    // }
    
    return (
     <> 
        <Carousel />
        <div className="change-language-modal">
            <div className="modal-container">
                <div className="modal-box">
                    <div className="close-modal">
                        <FaTimes size={20} />
                    </div> 
                    <div className="about-modal">
                        <p className="head-text">
                            Change to your preferred language.
                        </p>
                        <p className="body-text">
                        Dear Visitors,

                        <br /><br />We're excited to offer a new language option on our website! Please select your preferred language from the options below to enhance your browsing experience.
                        </p>
                    </div>
                </div>
                <div className="select-language-container">
                    <div className="select-language-box">
                        <div className="input-container input-holder">
                            <FaMapMarkerAlt size={18} />
                            <input type="text" id="place" required />
                            <label htmlFor="place" className="placeholder">Region?</label>
                        </div>
                        <div className="input-container input-holder">
                            <FaLanguage size={20} />
                            <input type="text" id="place" required />
                            <label htmlFor="place" className="placeholder">Language?</label>
                        </div>
                    </div>
                    <button type="submit">Submit</button>
                </div>
            </div>
        </div>

      <div className="stay-outer-container">
            <h1>Discover your new favorite stay!</h1>
                <FaAngleLeft id="prev_slide" className="slide_button back" onClick={initSlider} />
            <div className="stay-inner-container">
                <div className="stay-container">
                    <img src="../../images/stay/pet friendly.jpeg" alt="" />
                    <h3>Pet friendly</h3>
                </div>
                <div className="stay-container">
                    <img src="../../images/stay/chalet.jpeg" alt="" />
                    <h3>Chalet</h3>
                </div>
                <div className="stay-container">
                    <img src="../../images/stay/resort.jpeg" alt="" />
                    <h3>Resort</h3>
                </div>
                <div className="stay-container">
                    <img src="../../images/stay/cabin.jpeg" alt="" />
                    <h3>Cabin</h3>
                </div>
                <div className="stay-container">
                    <img src="../../images/stay/spa.jpeg" alt="" />
                    <h3>Spa</h3>
                </div>
                <div className="stay-container">
                    <img src="../../images/stay/hottub.jpeg" alt="" />
                    <h3>Hot tub</h3>
                </div>
                <div className="stay-container">
                    <img src="../../images/stay/ocean view.jpg" alt="" />
                    <h3>Ocean view</h3>
                </div>
                <div className="stay-container">
                    <img src="../../images/stay/pool.jpg" alt="" />
                    <h3>Pool</h3>
                </div>
                <div className="stay-container">
                    <img src="../../images/stay/castle.jpeg" alt="" />
                    <h3>Castle</h3>
                </div>
                <div className="stay-container">
                    <img src="../../images/stay/water park.jpg" alt="" />
                    <h3>Water park</h3>
                </div>
                <div className="stay-container">
                    <img src="../../images/stay/House boat.jpg" alt="" />
                    <h3>House boat</h3>
                </div>
                <div className="stay-container">
                    <img src="../../images/stay/villa.jpeg" alt="" />
                    <h3>Villa</h3>
                </div>
            </div>
                <FaAngleRight id="next_slide" className="slide_button next" onClick={initSlider} />
        </div>

        <div className="destination-outer-container">
            <h1>Explore your favorite destinations!</h1>
            <FaAngleLeft id="before_slide" className="change_button before" onClick={secondSlide} />
            <div className="destination-inner-container">
                <div className="destination-container">
                    <img src="../../images/destination/Lagos.jpeg" alt="" />
                    <div className="text">
                        <h3>Lagos</h3>
                        <p>Lagos, Nigeria</p>
                    </div>
                </div>
                <div className="destination-container">
                    <img src="../../images/destination/Las vegas.jpeg" alt="" />
                    <div className="text">
                        <h3>Las vegas</h3>
                        <p>Nevada, United States of America</p>
                    </div>
                </div>
                <div className="destination-container">
                    <img src="../../images/destination/Lome.jpeg" alt="" />
                    <div className="text">
                        <h3>Lome</h3>
                        <p>Maritime Region, Togo</p>
                    </div>
                </div>
                <div className="destination-container">
                    <img src="../../images/destination/port harcourt.jpeg" alt="" />
                    <div className="text">
                        <h3>Port Harcourt</h3>
                        <p>Rivers, Nigeria</p>
                    </div>
                </div>
                <div className="destination-container">
                    <img src="../../images/destination/portland.jpeg" alt="" />
                    <div className="text">
                        <h3>PortLand</h3>
                        <p>Oregon, United States of America</p>
                    </div>
                </div>
                <div className="destination-container">
                    <img src="../../images/destination/new york.jpeg" alt="" />
                    <div className="text">
                        <h3>New York</h3>
                        <p>United States of America</p>
                    </div>
                </div>
                <div className="destination-container">
                    <img src="../../images/destination/niagara falls.jpeg" alt="" />
                    <div className="text">
                        <h3>Niagara Falls</h3>
                        <p>Ontario, Canada</p>
                    </div>
                </div>
                <div className="destination-container">
                    <img src="../../images/destination/california.jpeg" alt="" />
                    <div className="text">
                        <h3>California</h3>
                        <p>California, United States of America</p>
                    </div>
                </div>
            </div>
            <FaAngleRight id="after_slide" className="change_button after" onClick={secondSlide} />
        </div>

        <div className="explore-outer-container">
            <h1>Explore these unique stays!</h1>
            <p className="display-deals">Showing deals for: <b>Aug 23 - Aug 25</b></p>
            <FaAngleLeft id="former_slide" className="icon_button former" onClick={thirdSlider} />
            <div className="explore-inner-container">
                <div className="explore-container">
                        <FaAngleLeft className="angle angle-left before-icon" onClick={insideSlider}/>
                    <div className="img-box">
                        <img src="../../images/Explore/First hotel/view1.jpeg" alt="" />
                        <img src="../../images/Explore/First hotel/view2.jpeg" alt="" />
                        <img src="../../images/Explore/First hotel/view3.jpeg" alt="" />
                    </div>
                        <FaAngleRight className="angle angle-right after-icon" onClick={insideSlider} />
                    <p className="review"><b>9.8/10</b> Exceptional (101 reviews)</p>
                    <p className="name">The Mark Hotel</p>
                    <p className="location">New York</p>
                    <div className="price">$401 per night</div>
                </div>

                <div className="explore-container">
                        <FaAngleLeft className="angle angle-left before-icon"/>
                    <div className="img-box">
                        <img src="../../images/Explore/second hotel/view1.jpeg" alt="" />
                        <img src="../../images/Explore/second hotel/view2.jpeg" alt="" />
                        <img src="../../images/Explore/second hotel/view3.jpeg" alt="" />
                    </div>
                        <FaAngleRight className="angle angle-right after-icon" />
                    <p className="review"><b>9.2/10</b> Exceptional (3 reviews)</p>
                    <p className="name">Naturluxe & Stars</p>
                    <p className="location">Watkins Glen</p>
                    <div className="price">$627 per night</div>
                </div>
                <div className="explore-container">
                        <FaAngleLeft className="angle angle-left before-icon"/>
                    <div className="img-box">
                        <img src="../../images/Explore/Third hotel/view1.jpeg" alt="" />
                        <img src="../../images/Explore/Third hotel/view2.jpeg" alt="" />
                        <img src="../../images/Explore/Third hotel/view3.jpeg" alt="" />
                    </div>
                        <FaAngleRight className="angle angle-right after-icon" />
                    <p className="review"><b>9.4/10</b> Exceptional (8 reviews)</p>
                    <p className="name">Casa Duro</p>
                    <p className="location">Dallas</p>
                    <div className="price">$1,203 per night</div>
                </div>
                <div className="explore-container">
                        <FaAngleLeft className="angle angle-left before-icon"/>
                    <div className="img-box">
                        <img src="../../images/Explore/Fourth hotel/view1.jpeg" alt="" />
                        <img src="../../images/Explore/Fourth hotel/view2.jpeg" alt="" />
                        <img src="../../images/Explore/Fourth hotel/view3.jpeg" alt="" />
                    </div>
                        <FaAngleRight className="angle angle-right after-icon" />
                    <p className="review"><b>9.7/10</b> Exceptional (47 reviews)</p>
                    <p className="name">The Cottages at PGA National Resort</p>
                    <p className="location">Palm Beach Gardens</p>
                    <div className="price">$747 per night</div>
                </div>
                <div className="explore-container">
                        <FaAngleLeft className="angle angle-left before-icon"/>
                    <div className="img-box">
                        <img src="../../images/Explore/Fifth hotel/view1.jpeg" alt="" />
                        <img src="../../images/Explore/Fifth hotel/view2.jpeg" alt="" />
                        <img src="../../images/Explore/Fifth hotel/view3.jpeg" alt="" />
                    </div>
                        <FaAngleRight className="angle angle-right after-icon" />
                    <p className="review"><b>9.5/10</b> Exceptional (17 reviews)</p>
                    <p className="name">Eureka Sunset Cabins</p>
                    <p className="location">Eureka Springs</p>
                    <div className="price">$450 per night</div>
                </div>
                <div className="explore-container">
                        <FaAngleLeft className="angle angle-left before-icon"/>
                    <div className="img-box">
                        <img src="../../images/Explore/sixth hotel/view1.jpeg" alt="" />
                        <img src="../../images/Explore/sixth hotel/view2.jpeg" alt="" />
                        <img src="../../images/Explore/sixth hotel/view3.jpeg" alt="" />
                    </div>
                        <FaAngleRight className="angle angle-right after-icon" />
                    <p className="review"><b>9.2/10</b> Exceptional (25 reviews)</p>
                    <p className="name">Elk Spring Resort</p>
                    <p className="location">Monterville</p>
                    <div className="price">$680 per night</div>
                </div>
                <div className="explore-container">
                        <FaAngleLeft className="angle angle-left before-icon"/>
                    <div className="img-box">
                        <img src="../../images/Explore/seventh hotel/view1.jpeg" alt="" />
                        <img src="../../images/Explore/seventh hotel/view2.jpeg" alt="" />
                        <img src="../../images/Explore/seventh hotel/view3.jpeg" alt="" />
                    </div>
                        <FaAngleRight className="angle angle-right after-icon" />
                    <p className="review"><b>9.3/10</b> Exceptional (32 reviews)</p>
                    <p className="name">Ocean Villa at Turtle Bay</p>
                    <p className="location">Kahuku</p>
                    <div className="price">$540 per night</div>
                </div>
                <div className="explore-container">
                        <FaAngleLeft className="angle angle-left before-icon"/>
                    <div className="img-box">
                        <img src="../../images/Explore/eight hotel/view1.jpeg" alt="" />
                        <img src="../../images/Explore/eight hotel/view2.jpeg" alt="" />
                        <img src="../../images/Explore/eight hotel/view3.jpeg" alt="" />
                    </div>
                        <FaAngleRight className="angle angle-right after-icon" />
                    <p className="review"><b>9.5/10</b> Exceptional (87 reviews)</p>
                    <p className="name">Zion Mountain Ranch</p>
                    <p className="location">Mount Carmel</p>
                    <div className="price">$1,008 per night</div>
                </div>
                <div className="explore-container">
                        <FaAngleLeft className="angle angle-left before-icon"/>
                    <div className="img-box">
                        <img src="../../images/Explore/Twenty-four hotel/view1.jpeg" alt="" />
                        <img src="../../images/Explore/ninth hotel/view2.jpeg" alt="" />
                        <img src="../../images/Explore/ninth hotel/view3.jpeg" alt="" />
                    </div>
                        <FaAngleRight className="angle angle-right after-icon" />
                    <p className="review"><b>9.7/10</b> Exceptional (65 reviews)</p>
                    <p className="name">Walden Retreats</p>
                    <p className="location">Johnson City</p>
                    <div className="price">$204 per night</div>
                </div>
                <div className="explore-container">
                        <FaAngleLeft className="angle angle-left before-icon"/>
                    <div className="img-box">
                        <img src="../../images/Explore/tenth hotel/view1.jpeg" alt="" />
                        <img src="../../images/Explore/tenth hotel/view2.jpeg" alt="" />
                        <img src="../../images/Explore/tenth hotel/view3.jpeg" alt="" />
                    </div>
                        <FaAngleRight className="angle angle-right after-icon" />
                    <p className="review"><b>10.0/10</b> Exceptional (21 reviews)</p>
                    <p className="name">Wa Minca Miami by Sofla Vacations</p>
                    <p className="location">Maimi</p>
                    <div className="price">$727 per night</div>
                </div>
                <div className="explore-container">
                        <FaAngleLeft className="angle angle-left before-icon"/>
                    <div className="img-box">
                        <img src="../../images/Explore/eleventh hotel/view1.jpeg" alt="" />
                        <img src="../../images/Explore/eleventh hotel/view2.jpeg" alt="" />
                        <img src="../../images/Explore/eleventh hotel/view3.jpeg" alt="" />
                    </div>
                        <FaAngleRight className="angle angle-right after-icon" />
                    <p className="review"><b>9.8/10</b> Exceptional (81 reviews)</p>
                    <p className="name">320 Guest Ranch</p>
                    <p className="location">Gallatin Gateway</p>
                    <div className="price">$278 per night</div>
                </div>
                <div className="explore-container">
                        <FaAngleLeft className="angle angle-left before-icon"/>
                    <div className="img-box">
                        <img src="../../images/Explore/twelth hotel/view1.jpeg" alt="" />
                        <img src="../../images/Explore/twelth hotel/view2.jpeg" alt="" />
                        <img src="../../images/Explore/twelth hotel/view3.jpeg" alt="" />
                    </div>
                        <FaAngleRight className="angle angle-right after-icon" />
                    <p className="review"><b>9.5/10</b> Exceptional (127 reviews)</p>
                    <p className="name">Cottages at Healdsburg</p>
                    <p className="location">Healdsburg</p>
                    <div className="price">$360 per night</div>
                </div>
                <div className="explore-container">
                        <FaAngleLeft className="angle angle-left before-icon"/>
                    <div className="img-box">
                        <img src="../../images/Explore/thirteenth hotel/view1.jpeg" alt="" />
                        <img src="../../images/Explore/thirteenth hotel/view2.jpeg" alt="" />
                        <img src="../../images/Explore/thirteenth hotel/view3.jpeg" alt="" />
                    </div>
                        <FaAngleRight className="angle angle-right after-icon" />
                    <p className="review"><b>9.6/10</b> Exceptional (157 reviews)</p>
                    <p className="name">Little Lake Lookout</p>
                    <p className="location">sivierville</p>
                    <div className="price">$1,501 per night</div>
                </div>
                <div className="explore-container">
                        <FaAngleLeft className="angle angle-left before-icon"/>
                    <div className="img-box">
                        <img src="../../images/Explore/Forteenth hotel/view1.jpeg" alt="" />
                        <img src="../../images/Explore/Forteenth hotel/view2.jpeg" alt="" />
                        <img src="../../images/Explore/Forteenth hotel/view3.jpeg" alt="" />
                    </div>
                        <FaAngleRight className="angle angle-right after-icon" />
                    <p className="review"><b>9.8/10</b> Exceptional (397 reviews)</p>
                    <p className="name">Tanque Verde Ranch</p>
                    <p className="location">Gatlinburg</p>
                    <div className="price">$840 per night</div>
                </div>
                <div className="explore-container">
                        <FaAngleLeft className="angle angle-left before-icon"/>
                    <div className="img-box">
                        <img src="../../images/Explore/Fifteenth hotel/view1.jpeg" alt="" />
                        <img src="../../images/Explore/Fifteenth hotel/view2.jpeg" alt="" />
                        <img src="../../images/Explore/Fifteenth hotel/view3.jpeg" alt="" />
                    </div>
                        <FaAngleRight className="angle angle-right after-icon" />
                    <p className="review"><b>9.7/10</b> Exceptional (91 reviews)</p>
                    <p className="name">Alpine Ski Lounge</p>
                    <p className="location">Tucson</p>
                    <div className="price">$607 per night</div>
                </div>
                <div className="explore-container">
                        <FaAngleLeft className="angle angle-left before-icon"/>
                    <div className="img-box">
                        <img src="../../images/Explore/sixteenth hotel/view1.jpeg" alt="" />
                        <img src="../../images/Explore/sixteenth hotel/view2.jpeg" alt="" />
                        <img src="../../images/Explore/sixteenth hotel/view3.jpeg" alt="" />
                    </div>
                        <FaAngleRight className="angle angle-right after-icon" />
                    <p className="review"><b>9.9/10</b> Exceptional (209 reviews)</p>
                    <p className="name">Clemson Memorabilia House</p>
                    <p className="location">Clemson</p>
                    <div className="price">$982 per night</div>
                </div>
                <div className="explore-container">
                        <FaAngleLeft className="angle angle-left before-icon"/>
                    <div className="img-box">
                        <img src="../../images/Explore/seventeenth hotel/view1.jpeg" alt="" />
                        <img src="../../images/Explore/seventeenth hotel/view2.jpeg" alt="" />
                        <img src="../../images/Explore/seventeenth hotel/view3.jpeg" alt="" />
                    </div>
                        <FaAngleRight className="angle angle-right after-icon" />
                    <p className="review"><b>9.2/10</b> Exceptional (19 reviews)</p>
                    <p className="name">Watchman Villa</p>
                    <p className="location">Springdale</p>
                    <div className="price">$845 per night</div>
                </div>
                <div className="explore-container">
                        <FaAngleLeft className="angle angle-left before-icon"/>
                    <div className="img-box">
                        <img src="../../images/Explore/Twenty-three hotel/view1.jpeg" alt="" />
                        <img src="../../images/Explore/Twenty-three hotel/view2.jpeg" alt="" />
                        <img src="../../images/Explore/Twenty-three hotel/view3.jpeg" alt="" />
                    </div>
                        <FaAngleRight className="angle angle-right after-icon" />
                    <p className="review"><b>9.7/10</b> Exceptional (109 reviews)</p>
                    <p className="name">Mission Springs Resort</p>
                    <p className="location">Ashland</p>
                    <div className="price">$791 per night</div>
                </div>
                <div className="explore-container">
                        <FaAngleLeft className="angle angle-left before-icon"/>
                    <div className="img-box">
                        <img src="../../images/Explore/eighteenth hotel/view1.jpeg" alt="" />
                        <img src="../../images/Explore/eighteenth hotel/view2.jpeg" alt="" />
                        <img src="../../images/Explore/eighteenth hotel/view3.jpeg" alt="" />
                    </div>
                        <FaAngleRight className="angle angle-right after-icon" />
                    <p className="review"><b>10.0/10</b> Exceptional (224 reviews)</p>
                    <p className="name">Joshua Creek Ranch</p>
                    <p className="location">Boerne</p>
                    <div className="price">$1,109 per night</div>
                </div>
                <div className="explore-container">
                        <FaAngleLeft className="angle angle-left before-icon"/>
                    <div className="img-box">
                        <img src="../../images/Explore/ninteenth hotel/view1.jpeg" alt="" />
                        <img src="../../images/Explore/ninteenth hotel/view2.jpeg" alt="" />
                        <img src="../../images/Explore/ninteenth hotel/view3.jpeg" alt="" />
                    </div>
                        <FaAngleRight className="angle angle-right after-icon" />
                    <p className="review"><b>9.5/10</b> Exceptional (173 reviews)</p>
                    <p className="name">Bandy Canyon Ranch</p>
                    <p className="location">Escondido</p>
                    <div className="price">$567 per night</div>
                </div>
                <div className="explore-container">
                        <FaAngleLeft className="angle angle-left before-icon"/>
                    <div className="img-box">
                        <img src="../../images/Explore/twentieth hotel/view1.jpeg" alt="" />
                        <img src="../../images/Explore/twentieth hotel/view2.jpeg" alt="" />
                        <img src="../../images/Explore/twentieth hotel/view3.jpeg" alt="" />
                    </div>
                        <FaAngleRight className="angle angle-right after-icon" />
                    <p className="review"><b>9.0/10</b> Wonderful (99 reviews)</p>
                    <p className="name">Sweetwater Inn and Spa</p>
                    <p className="location">Mendocino</p>
                    <div className="price">$278 per night</div>
                </div>
                <div className="explore-container">
                        <FaAngleLeft className="angle angle-left before-icon"/>
                    <div className="img-box">
                        <img src="../../images/Explore/Twenty-one hotel/view1.jpeg" alt="" />
                        <img src="../../images/Explore/Twenty-one hotel/view2.jpeg" alt="" />
                        <img src="../../images/Explore/Twenty-four hotel/view3.jpeg" alt="" />
                    </div>
                        <FaAngleRight className="angle angle-right after-icon" />
                    <p className="review"><b>8.7/10</b> Exceptional (199 reviews)</p>
                    <p className="name">Cougar Rich Resort, LLC</p>
                    <p className="location">Torrey</p>
                    <div className="price">$840 per night</div>
                </div>
                <div className="explore-container">
                        <FaAngleLeft className="angle angle-left before-icon"/>
                    <div className="img-box">
                        <img src="../../images/Explore/Twenty-two hotel/view1.jpeg" alt="" />
                        <img src="../../images/Explore/Twenty-two hotel/view2.jpeg" alt="" />
                        <img src="../../images/Explore/Twenty-two hotel/view3.jpeg" alt="" />
                    </div>
                        <FaAngleRight className="angle angle-right after-icon" />
                    <p className="review"><b>10.0/10</b> Wonderful (251 reviews)</p>
                    <p className="name">Conestoga Ranch</p>
                    <p className="location">Garden City</p>
                    <div className="price">$1,400 per night</div>
                </div>
            </div>
            <FaAngleRight id="later_slide" className="icon_button later" onClick={thirdSlider} />
        </div>
    </>
  )
}

export default Content
