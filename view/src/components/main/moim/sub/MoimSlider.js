import React from "react";
import Slider from "react-slick";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate } from "react-router";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const MoimSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
    };

    return (
        <div id="moim-item" className="draggable" onClick={() => Navigate("/")}>
            <div className='gradient left'></div>
            <Slider {...settings}>
                <div className="item">
                    <div className="image">
                        <img
                            src={`http://localhost:8080/rest/v1/images/10000000.jpg`}
                            alt="이미지"
                        />
                    </div>
                    <div className="exp-part">
                        <div className="title">
                            <span>TTT</span>
                        </div>
                        <div className="exp">
                            <div className="left">
                                <div className="items">
                                    <span className="person-number">인원</span>
                                    <span className="loc">
                                        <FontAwesomeIcon icon={faLocationDot} />
                                        &nbsp;aaaa
                                    </span>
                                    <span className="category">
                                        ddd &gt; fff
                                    </span>
                                </div>
                                <div className="tags">
                                    <span>aaa</span>
                                </div>
                            </div>
                            <div className="right">
                                <div className="like">
                                    <FontAwesomeIcon icon={faHeart} />
                                </div>
                                <p>TTTT</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="item">
                    <div className="image">
                        <img
                            src={`http://localhost:8080/rest/v1/images/10000000.jpg`}
                            alt="이미지"
                        />
                    </div>
                    <div className="exp-part">
                        <div className="title">
                            <span>TTT</span>
                        </div>
                        <div className="exp">
                            <div className="left">
                                <div className="items">
                                    <span className="person-number">인원</span>
                                    <span className="loc">
                                        <FontAwesomeIcon icon={faLocationDot} />
                                        &nbsp;aaaa
                                    </span>
                                    <span className="category">
                                        ddd &gt; fff
                                    </span>
                                </div>
                                <div className="tags">
                                    <span>aaa</span>
                                </div>
                            </div>
                            <div className="right">
                                <div className="like">
                                    <FontAwesomeIcon icon={faHeart} />
                                </div>
                                <p>TTTT</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="item">
                    <div className="image">
                        <img
                            src={`http://localhost:8080/rest/v1/images/10000000.jpg`}
                            alt="이미지"
                        />
                    </div>
                    <div className="exp-part">
                        <div className="title">
                            <span>TTT</span>
                        </div>
                        <div className="exp">
                            <div className="left">
                                <div className="items">
                                    <span className="person-number">인원</span>
                                    <span className="loc">
                                        <FontAwesomeIcon icon={faLocationDot} />
                                        &nbsp;aaaa
                                    </span>
                                    <span className="category">
                                        ddd &gt; fff
                                    </span>
                                </div>
                                <div className="tags">
                                    <span>aaa</span>
                                </div>
                            </div>
                            <div className="right">
                                <div className="like">
                                    <FontAwesomeIcon icon={faHeart} />
                                </div>
                                <p>TTTT</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="item">
                    <div className="image">
                        <img
                            src={`http://localhost:8080/rest/v1/images/10000000.jpg`}
                            alt="이미지"
                        />
                    </div>
                    <div className="exp-part">
                        <div className="title">
                            <span>TTT</span>
                        </div>
                        <div className="exp">
                            <div className="left">
                                <div className="items">
                                    <span className="person-number">인원</span>
                                    <span className="loc">
                                        <FontAwesomeIcon icon={faLocationDot} />
                                        &nbsp;aaaa
                                    </span>
                                    <span className="category">
                                        ddd &gt; fff
                                    </span>
                                </div>
                                <div className="tags">
                                    <span>aaa</span>
                                </div>
                            </div>
                            <div className="right">
                                <div className="like">
                                    <FontAwesomeIcon icon={faHeart} />
                                </div>
                                <p>TTTT</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="item">
                    <div className="image">
                        <img
                            src={`http://localhost:8080/rest/v1/images/10000000.jpg`}
                            alt="이미지"
                        />
                    </div>
                    <div className="exp-part">
                        <div className="title">
                            <span>TTT</span>
                        </div>
                        <div className="exp">
                            <div className="left">
                                <div className="items">
                                    <span className="person-number">인원</span>
                                    <span className="loc">
                                        <FontAwesomeIcon icon={faLocationDot} />
                                        &nbsp;aaaa
                                    </span>
                                    <span className="category">
                                        ddd &gt; fff
                                    </span>
                                </div>
                                <div className="tags">
                                    <span>aaa</span>
                                </div>
                            </div>
                            <div className="right">
                                <div className="like">
                                    <FontAwesomeIcon icon={faHeart} />
                                </div>
                                <p>TTTT</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="item">
                    <div className="image">
                        <img
                            src={`http://localhost:8080/rest/v1/images/10000000.jpg`}
                            alt="이미지"
                        />
                    </div>
                    <div className="exp-part">
                        <div className="title">
                            <span>TTT</span>
                        </div>
                        <div className="exp">
                            <div className="left">
                                <div className="items">
                                    <span className="person-number">인원</span>
                                    <span className="loc">
                                        <FontAwesomeIcon icon={faLocationDot} />
                                        &nbsp;aaaa
                                    </span>
                                    <span className="category">
                                        ddd &gt; fff
                                    </span>
                                </div>
                                <div className="tags">
                                    <span>aaa</span>
                                </div>
                            </div>
                            <div className="right">
                                <div className="like">
                                    <FontAwesomeIcon icon={faHeart} />
                                </div>
                                <p>TTTT</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Slider>
            <div className='gradient right'></div>
        </div>
    );
};

export default MoimSlider;
