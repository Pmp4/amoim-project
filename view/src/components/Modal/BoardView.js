import BoardService from 'api/board/BoardService';
import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


const initialCon = {
    board: {
        no: "",
        title: "",
        content: "",
        userNo: "",
        meetingNo: "",
        regdate: "",
        viewCount: "",
        name: "",
        userId: "",
    },
    fileList: []
}


const BoardView = () => {
    const [contents, setContents] = useState(initialCon);
    const [comment, setComment] = useState("");
    const modal = useSelector(state => state.modal);
    const user = useSelector(state => state.user);

    const {board, fileList} = contents;
    const regdate = new Date(board.regdate);
    

    useEffect(() => {
        boardViewApi();
    }, []);

    
    const boardViewApi = async() => {
        const response = await BoardService.boardView(modal.modalParam);


        const dbDate = new Date(response.data.meetingBoardVO.regdate);

        const date = new Date(+dbDate + 3240 * 10000).toISOString().split("T")[0];
        const time = dbDate.toTimeString().split(" ")[0];

        setContents({
            ...contents, 
            board: {
                ...response.data.meetingBoardVO, 
                regdate: date + " " + time
            }, 
            fileList: response.data.fileList
        });
    }



    //댓글 onChange
    //댓글 onChange
    //댓글 onChange
    const commentActionEvent = (target) => {
        setComment(target.value);
    }


    const commentComp = () => {
        return(
            <div className='comment-input-box'>
                    <p>{user.userInfo.username}</p>
                    <div className='comment-input'>
                        <textarea 
                            value={comment}
                            onChange={(event) => commentActionEvent(event.target)}/>
                        <button>등록하기</button>
                    </div>
                </div>
        ) 
    }

    return (
        <div className="board-view popup">
            <h2 className="board-title-wrap">
                <p className='board-title'>{board.title}</p>
                <div className="sub-title">
                    <p className='board-date'>{board.regdate}</p>
                    <p className='board-info'>{board.name} <span>({board.userId})</span></p>
                </div>
            </h2>
            <p className='board-content'>
                {board.content}
            </p>
            <div className='line'></div>
            <div className='comment-wrap'>
                <div className='comment-list'>
                    <div className='item'>
                        <div className='comment-main'>
                            <div className='comment-exp'>
                                <p className='comment-name'>이름입니다.</p>
                                {/* <p>X</p> */}
                            </div>
                            <div className='comment-content'>
                                <div className='comment'>댓글 내용입니다.</div>
                                <div className='comment-regdate'>2022-10-10 <br/>22:33:00</div>
                            </div>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='comment-main'>
                            <div className='comment-exp'>
                                <p className='comment-name'>이름입니다.</p>
                                {/* <p>X</p> */}
                            </div>
                            <div className='comment-content'>
                                <div className='comment'>댓글 내용입니다.</div>
                                <div className='comment-regdate'>2022-10-10 <br/>22:33:00</div>
                            </div>
                        </div>
                        <div className='comment-reply'>
                            <div className='comment-exp'>
                                <p className='comment-name'>
                                    <FontAwesomeIcon icon={faArrowRight}/>이름입니다.
                                </p>
                            </div>
                            <div className='comment-content'>
                                <div className='comment'>댓글 내용입니다.</div>
                                <div className='comment-regdate'>2022-10-10 <br/>22:33:00</div>
                            </div>
                        </div>
                        <div className='comment-reply'>
                            <div className='comment-exp'>
                                <p className='comment-name'>
                                    <FontAwesomeIcon icon={faArrowRight}/>이름입니다.
                                </p>
                            </div>
                            <div className='comment-content'>
                                <div className='comment'>댓글 내용입니다.</div>
                                <div className='comment-regdate'>2022-10-10 <br/>22:33:00</div>
                            </div>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='comment-main'>
                            <div className='comment-exp'>
                                <p className='comment-name'>이름입니다.</p>
                                {/* <p>X</p> */}
                            </div>
                            <div className='comment-content'>
                                <div className='comment'>댓글 내용입니다.</div>
                                <div className='comment-regdate'>2022-10-10 <br/>22:33:00</div>
                            </div>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='comment-main'>
                            <div className='comment-exp'>
                                <p className='comment-name'>이름입니다.</p>
                                {/* <p>X</p> */}
                            </div>
                            <div className='comment-content'>
                                <div className='comment'>댓글 내용입니다.</div>
                                <div className='comment-regdate'>2022-10-10 <br/>22:33:00</div>
                            </div>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='comment-main'>
                            <div className='comment-exp'>
                                <p className='comment-name'>이름입니다.</p>
                                {/* <p>X</p> */}
                            </div>
                            <div className='comment-content'>
                                <div className='comment'>댓글 내용입니다.</div>
                                <div className='comment-regdate'>2022-10-10 <br/>22:33:00</div>
                            </div>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='comment-main'>
                            <div className='comment-exp'>
                                <p className='comment-name'>이름입니다.</p>
                                {/* <p>X</p> */}
                            </div>
                            <div className='comment-content'>
                                <div className='comment'>댓글 내용입니다.</div>
                                <div className='comment-regdate'>2022-10-10 <br/>22:33:00</div>
                            </div>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='comment-main'>
                            <div className='comment-exp'>
                                <p className='comment-name'>이름입니다.</p>
                                {/* <p>X</p> */}
                            </div>
                            <div className='comment-content'>
                                <div className='comment'>댓글 내용입니다.</div>
                                <div className='comment-regdate'>2022-10-10 <br/>22:33:00</div>
                            </div>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='comment-main'>
                            <div className='comment-exp'>
                                <p className='comment-name'>이름입니다.</p>
                                {/* <p>X</p> */}
                            </div>
                            <div className='comment-content'>
                                <div className='comment'>댓글 내용입니다.</div>
                                <div className='comment-regdate'>2022-10-10 <br/>22:33:00</div>
                            </div>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='comment-main'>
                            <div className='comment-exp'>
                                <p className='comment-name'>이름입니다.</p>
                                {/* <p>X</p> */}
                            </div>
                            <div className='comment-content'>
                                <div className='comment'>댓글 내용입니다.</div>
                                <div className='comment-regdate'>2022-10-10 <br/>22:33:00</div>
                            </div>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='comment-main'>
                            <div className='comment-exp'>
                                <p className='comment-name'>이름입니다.</p>
                                {/* <p>X</p> */}
                            </div>
                            <div className='comment-content'>
                                <div className='comment'>댓글 내용입니다.</div>
                                <div className='comment-regdate'>2022-10-10 <br/>22:33:00</div>
                            </div>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='comment-main'>
                            <div className='comment-exp'>
                                <p className='comment-name'>이름입니다.</p>
                                {/* <p>X</p> */}
                            </div>
                            <div className='comment-content'>
                                <div className='comment'>댓글 내용입니다.</div>
                                <div className='comment-regdate'>2022-10-10 <br/>22:33:00</div>
                            </div>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='comment-main'>
                            <div className='comment-exp'>
                                <p className='comment-name'>이름입니다.</p>
                                {/* <p>X</p> */}
                            </div>
                            <div className='comment-content'>
                                <div className='comment'>댓글 내용입니다.</div>
                                <div className='comment-regdate'>2022-10-10 <br/>22:33:00</div>
                            </div>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='comment-main'>
                            <div className='comment-exp'>
                                <p className='comment-name'>이름입니다.</p>
                                {/* <p>X</p> */}
                            </div>
                            <div className='comment-content'>
                                <div className='comment'>댓글 내용입니다.</div>
                                <div className='comment-regdate'>2022-10-10 <br/>22:33:00</div>
                            </div>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='comment-main'>
                            <div className='comment-exp'>
                                <p className='comment-name'>이름입니다.</p>
                                {/* <p>X</p> */}
                            </div>
                            <div className='comment-content'>
                                <div className='comment'>댓글 내용입니다.</div>
                                <div className='comment-regdate'>2022-10-10 <br/>22:33:00</div>
                            </div>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='comment-main'>
                            <div className='comment-exp'>
                                <p className='comment-name'>이름입니다.</p>
                                {/* <p>X</p> */}
                            </div>
                            <div className='comment-content'>
                                <div className='comment'>댓글 내용입니다.</div>
                                <div className='comment-regdate'>2022-10-10 <br/>22:33:00</div>
                            </div>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='comment-main'>
                            <div className='comment-exp'>
                                <p className='comment-name'>이름입니다.</p>
                                {/* <p>X</p> */}
                            </div>
                            <div className='comment-content'>
                                <div className='comment'>댓글 내용입니다.</div>
                                <div className='comment-regdate'>2022-10-10 <br/>22:33:00</div>
                            </div>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='comment-main'>
                            <div className='comment-exp'>
                                <p className='comment-name'>이름입니다.</p>
                                {/* <p>X</p> */}
                            </div>
                            <div className='comment-content'>
                                <div className='comment'>댓글 내용입니다.</div>
                                <div className='comment-regdate'>2022-10-10 <br/>22:33:00</div>
                            </div>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='comment-main'>
                            <div className='comment-exp'>
                                <p className='comment-name'>이름입니다.</p>
                                {/* <p>X</p> */}
                            </div>
                            <div className='comment-content'>
                                <div className='comment'>댓글 내용입니다.</div>
                                <div className='comment-regdate'>2022-10-10 <br/>22:33:00</div>
                            </div>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='comment-main'>
                            <div className='comment-exp'>
                                <p className='comment-name'>이름입니다.</p>
                                {/* <p>X</p> */}
                            </div>
                            <div className='comment-content'>
                                <div className='comment'>댓글 내용입니다.</div>
                                <div className='comment-regdate'>2022-10-10 <br/>22:33:00</div>
                            </div>
                        </div>
                    </div>
                </div>
                {commentComp()}
            </div>
        </div>
    );
};

export default BoardView;