import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { MODAL_OPEN } from 'reducer/module/modal';

const BoardList = ({meetingNo}) => {
    const [addBtn, setAddBtn] = useState(false);
    const [boardBool, setBoardBool] = useState(false);
    const[boardList, setBoardList] = useState([
        {no: 10, content: "귀찮고 어렵다", name: "너굴맨", regdate: "2022-07-01"},
        {no: 9, content: "취업 할 수 있겠지", name: "로켓맨", regdate: "2022-07-01"},
        {no: 8, content: "나는 독서실에서 하는중", name: "나일론머스크", regdate: "2022-07-01"},
        {no: 7, content: "집에서는 집중이 안된다", name: "너굴맨", regdate: "2022-07-01"},
        {no: 6, content: "집에서하면 30분하고 1시간 쉬고 반복", name: "너굴맨", regdate: "2022-07-01"},
        {no: 5, content: "더 이상 쓸 말이 없다", name: "너굴맨", regdate: "2022-07-01"},
        {no: 4, content: "리액트로 게시판 만들기", name: "너굴맨", regdate: "2022-07-01"},
        {no: 3, content: "귀찮고 어렵다", name: "너굴맨", regdate: "2022-07-01"},
        {no: 2, content: "귀찮고 어렵다", name: "너굴맨", regdate: "2022-07-01"},
        {no: 1, content: "귀찮고 어렵다", name: "너굴맨", regdate: "2022-07-01"},
    ]);
    // const [boardList, setBoardList] = useState([]);

    const dispatch = useDispatch();


    // 실제적으로 list가 되는 div 요소 셋팅
    // console.log("boardList : " +  boardList);
    const conList = boardList.map((item,idx) => {
        const date = new Date(item.REGDATE);
        return (
            <div key={idx} className="list-line">
                <div className="list-col-1">{1}</div>
                <div className="list-col-2">
                    <button>제목</button>
                </div>
                <div className="list-col-3">이름</div>
                <div className="list-col-4">{4}</div>
                <div className="list-col-5">{1111}</div>
            </div>
        )
    });

    const addBtnOnClickEvent = () => {
        if (addBtn) {
            setBoardBool(!boardBool);
            setTimeout(() => setAddBtn(!addBtn), 460);
        } else {
            setBoardBool(!boardBool);
            setAddBtn(!addBtn);
        }
    }



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