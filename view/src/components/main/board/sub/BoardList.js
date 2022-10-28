import BoardService from 'api/board/BoardService';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MODAL_OPEN } from 'reducer/module/modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { faForward } from '@fortawesome/free-solid-svg-icons';

const BoardList = ({meetingNo}) => {
    const [addBtn, setAddBtn] = useState(false);
    const [boardBool, setBoardBool] = useState(false);
    const [boardList, setBoardList] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    // const [boardList, setBoardList] = useState([]);

    const modal = useSelector(state => state.modal);

    const dispatch = useDispatch();


    useEffect(() => {
        boardApi(1);
    }, []);

    useEffect(() => {
        boardApi(1);
    }, [modal]);


    const boardApi = (page) => {
        BoardService.moimBoardSelect(meetingNo, page).then(response => {
            const {status, data} = response;
            console.log(response);

            if(status === 200) {
                if(data.SUCCESS) {
                    setBoardList(data.list);
                    setPageInfo(data.pageInfo);
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
                    <button type='button'>{item.TITLE}</button>
                </div>
                <div className="list-col-3">{item.NAME}</div>
                <div className="list-col-4">{item.VIEW_COUNT}</div>
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


    const pageSet = () => {
        if (boardList.length === 0) return;


        let tempPageArr = [];
        for(let i = pageInfo.startPage; i < pageInfo.lastPage + 1; i++) tempPageArr.push(i);
    

        const page = tempPageArr.map((item, idx) => (
            <span key={idx} 
                className={item === pageInfo.currentPage ? "page-item on" : "page-item"}
                onClick={() => boardApi(item)}
            >
                {item}
            </span>
        ))

        return page;
    }



    //글 상세보기
    const boardListButtonAction = (no) => {
        
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
                </form>
                {boardList.length > 0 ? <div className="pagination-info">
                    <div>
                        {pageInfo.startPage !== 1 && 
                            <span onClick={
                                    () => boardApi(pageInfo.startPage - 1)
                                } className='prev'>
                                <FontAwesomeIcon icon={faBackward}/>
                            </span>
                        }
                        {pageSet()}
                        {pageInfo.lastPage !== pageInfo.totalPage && 
                            <span onClick={
                                    () => boardApi(pageInfo.lastPage + 1)
                                } className='next'>
                                <FontAwesomeIcon icon={faForward}/>
                            </span>}
                    </div>
                </div> : ""}
            </div>
        </div>
    );
};

export default BoardList;