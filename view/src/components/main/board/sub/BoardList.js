import BoardService from 'api/board/BoardService';
import React, { useSelector, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MODAL_OPEN } from 'reducer/module/modal';

const BoardList = ({meetingNo}) => {
    const [addBtn, setAddBtn] = useState(false);
    const [boardBool, setBoardBool] = useState(false);
    const [boardList, setBoardList] = useState([]);
    // const [boardList, setBoardList] = useState([]);

    const dispatch = useDispatch();


    useEffect(() => {
        boardApi(1);
    }, []);


    const boardApi = (page) => {
        BoardService.moimBoardSelect(meetingNo, page).then(response => {
            const {status, data} = response;
            console.log(response);

            if(status === 200) {
                if(data.SUCCESS) {
                    setBoardList(data.list);
                }else {
                    alert(data.SUCCESS_TEXT);
                }
            }else {
                alert("Server Error");
            }
        });
    }



    // 실제적으로 list가 되는 div 요소 셋팅
    // console.log("boardList : " +  boardList);
    const conList = boardList.map((item,idx) => {
        const date = new Date(item.REGDATE);
        const dateStr = (date.getFullYear()) + "-" + ((date.getMonth() + 1) >= 10 ? 
                    (date.getMonth() + 1) : ("0" + (date.getMonth() + 1))) + "-" + (date.getDate() >= 10 ? 
                        date.getDate() : ("0" + date.getDate()));

        return (
            <div key={item.NO} className="list-line">
                <div className="list-col-1">{item.NO}</div>
                <div className="list-col-2">
                    <button>{item.TITLE}</button>
                </div>
                <div className="list-col-3">{item.NAME}</div>
                <div className="list-col-4">{4}</div>
                <div className="list-col-5">{dateStr}</div>
            </div>
        )
    });


    const dateReturn = useCallback((date) => {
        return `${date.getFullYear()} - ${(date.getMonth() + 1) >= 10 ? 
            (date.getMonth() + 1) : ("0" + (date.getMonth() + 1))} - ${date.getDate() >= 10 ? 
                date.getDate() : ("0" + date.getDate())}`;
    });


    const addModal = () => {
        dispatch({type:MODAL_OPEN, data:"boardAdd", param: meetingNo});
    }


    return (
        <div className="board-list-component">
            <div className='top'>
                <div className="title-wrap">
                    <div className='title'>커뮤니티</div>
                    <div className="search-part">
                        <h2>Filter</h2>
                        <form name="search">
                            <select name="search-type">
                                <option value="title">제목</option>
                                <option value="content">내용</option>
                                <option value="name">이름</option>
                            </select>
                            <input name="search-text"/>
                        </form>
                    </div>
                </div>
                <div className='add-btn' onClick={() => addModal()}>+</div>
            </div>
            <div className="list-part">
                <form>
                    <div className="list-title">
                        <div className="list-col-1">번호</div>
                        <div className="list-col-2">제목</div>
                        <div className="list-col-3">등록자</div>
                        <div className="list-col-4">조회수</div>
                        <div className="list-col-5">등록일</div>
                    </div>
                    {conList}
                    
                    {/* <div className="list-line">
                        <div className="list-col-1">10</div>
                        <div className="list-col-2">귀찮고 어렵다</div>
                        <div className="list-col-3">너굴맨</div>
                        <div className="list-col-4">2022-07-01</div>
                    </div> */}
                </form>
            </div>
        </div>
    );
};

export default BoardList;