import BoardService from "api/board/BoardService";
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faForward } from "@fortawesome/free-solid-svg-icons";

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
    fileList: [],
};

const BoardView = () => {
    const [contents, setContents] = useState(initialCon);
    const [commentList, setCommentList] = useState([]);
    const [commentPage, setCommentPage] = useState({});

    const [comments, setComments] = useState({
        comment: "",
        reply: "",
    });

    const modal = useSelector((state) => state.modal);
    const user = useSelector((state) => state.user);

    const { board, fileList } = contents;
    const { comment, reply } = comments;

    const commentBox = commentList.map((item, idx) => {
        const commentItem = item.boardCommentsVO;
        const replyList = item.replyList;

        const dbDate = new Date(commentItem.regdate);

        const date = new Date(+dbDate + 3240 * 10000)
            .toISOString()
            .split("T")[0];
        const time = dbDate.toTimeString().split(" ")[0];

        return (
            <div className="item" key={commentItem.no}>
                <div className="comment-main">
                    <div className="comment-exp">
                        <p className="comment-name">{commentItem.username}</p>
                    </div>
                    <div className="comment-content">
                        <div className="comment">
                            {commentItem.commentText}
                        </div>
                        <div className="comment-regdate">
                            {date} <br />
                            {time}
                        </div>
                    </div>
                </div>
                {replyList !== null &&
                    replyList.map((rItem, rIdx) => (
                        <div className="comment-reply" key={rItem.no}>
                            <div className="comment-exp">
                                <p className="comment-name">
                                    <FontAwesomeIcon icon={faArrowRight} />
                                    {rItem.username}
                                </p>
                            </div>
                            <div className="comment-content">
                                <div className="comment">
                                    {rItem.commentText}
                                </div>
                                <div className="comment-regdate">
                                    2022-10-10 <br />
                                    22:33:00
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        );
    });

    const commentPageBox = () => {
        if (Object.keys(commentPage).length === 0) return;

        let tempPageArr = [];
        for (let i = commentPage.startPage; i < commentPage.lastPage + 1; i++) {
            tempPageArr.push(i);
        }

        const page = tempPageArr.map((item, idx) => (
            <span
                key={idx}
                className={
                    item === commentPage.currentPage
                        ? "page-item on"
                        : "page-item"
                }
                onClick={() => commentListApi(item)}
            >
                {item}
            </span>
        ));

        return (
            <div className="pagination-info">
                <div>
                    {commentPage.startPage !== 1 && (
                        <span
                            onClick={() =>
                                commentListApi(commentPage.startPage - 1)
                            }
                            className="prev"
                        >
                            <FontAwesomeIcon icon={commentPage} />
                        </span>
                    )}
                    {page}
                    {commentPage.lastPage !== commentPage.totalPage && (
                        <span
                            onClick={() =>
                                commentListApi(commentPage.lastPage + 1)
                            }
                            className="next"
                        >
                            <FontAwesomeIcon icon={faForward} />
                        </span>
                    )}
                </div>
            </div>
        );
    };






    









    useEffect(() => {
        boardViewApi();
        commentListApi(1);
    }, []);

    const boardViewApi = async () => {
        const response = await BoardService.boardView(modal.modalParam);

        const dbDate = new Date(response.data.meetingBoardVO.regdate);

        const date = new Date(+dbDate + 3240 * 10000)
            .toISOString()
            .split("T")[0];
        const time = dbDate.toTimeString().split(" ")[0];

        setContents({
            ...contents,
            board: {
                ...response.data.meetingBoardVO,
                regdate: date + " " + time,
            },
            fileList: response.data.fileList,
        });
    };

    // 댓글 불러오기 api
    // 댓글 불러오기 api
    // 댓글 불러오기 api
    const commentListApi = async (page) => {
        const response = await BoardService.commentList(modal.modalParam, page);
        setCommentList(response.data.list);
        setCommentPage(response.data.pageInfo);
    };

    //댓글 onChange
    //댓글 onChange
    //댓글 onChange
    const commentActionEvent = (target) => {
        let { value, name } = target;

        if (value.length > 150) {
            alert("댓글은 150자 이내로 입력해주세요.");
            value = value.substr(0, 150);
        }

        setComments({
            ...comments,
            [name]: value,
        });
    };

    //댓글 등록 API
    //댓글 등록 API
    //댓글 등록 API
    const addCommentApi = async (parentNo = null, parentUserNo = null) => {
        let text = comment;

        if (parentNo !== null && parentUserNo !== null) text = reply;

        if (comment === "" || comment === null) {
            alert("댓글을 입력해주세요.");
            return;
        }

        const rest = {
            boardNo: modal.modalParam,
            userNo: user.userInfo.no,
            commentText: text,
            parentNo,
            parentUserNo,
        };

        const response = await BoardService.commentInsert(rest);
        if (response.data === 1) commentListApi(1);
    };

    const commentComp = () => {
        return (
            <div className="comment-input-box">
                <p>{user.userInfo.username}</p>
                <div className="comment-input">
                    <textarea
                        name="comment"
                        value={comment}
                        onChange={(event) => commentActionEvent(event.target)}
                    />
                    <button onClick={() => addCommentApi()}>등록하기</button>
                </div>
            </div>
        );
    };

    return (
        <div className="board-view popup">
            <h2 className="board-title-wrap">
                <p className="board-title">{board.title}</p>
                <div className="sub-title">
                    <p className="board-date">{board.regdate}</p>
                    <p className="board-info">
                        {board.name} <span>({board.userId})</span>
                    </p>
                </div>
            </h2>
            <p className="board-content">{board.content}</p>
            <div className="line"></div>
            <div className="comment-wrap">
                <div className="comment-list">{commentBox}</div>
                {commentPageBox()}
                {commentComp()}
            </div>
        </div>
    );
};

export default BoardView;
