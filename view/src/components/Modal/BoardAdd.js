import React from "react";
import { useState } from "react";
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BoardService from 'api/board/BoardService';

const BoardAdd = ({ modalClose }) => {
    const [contents, setContents] = useState({
        title: "",
        content: "",
    });

    const location = useLocation();
    const meetingNo = useSelector(state => state.modal.modalParam);
    
    // const meetingNo = parseInt(location.pathname.substring(location.pathname.lastIndexOf("/")+1));

    const { title, content } = contents;

    const inputChangeAction = (target) => {
        const { name, value } = target;
        const tempContents = {
            ...contents,
            [name]: value,
        };

        setContents(tempContents);
    };

    const submitEvent = () => {
        const files = document.querySelector("input[type=file]").files;
        
        if(title === "" || content === " ") {
            alert("제목이 비어있습니다.");
            return;
        }else if(content === "" || content === " ") {
            alert("내용이 비어있습니다.");
            return;
        }else if(files.length > 3) {
            alert("파일은 최대 3개까지 첨부 가능합니다.");
            return;
        }



        const formData = new FormData();
        const requestData = {...contents, meetingNo: meetingNo}

        for (let i = 0; i < files.length; i++)
            formData.append("file", files[i]);

        formData.append(
            "contents",
            new Blob([JSON.stringify(requestData)], { 
                type: "application/json",
            })
        );


        BoardService.insertBoard(formData).then(response => {
            console.log(response);
        })
    };

    return (
        <div className="board-add popup">
            <h2 className="title">글쓰기</h2>
            <label>
                <p>제목</p>
                <input
                    name="title"
                    onChange={(event) => inputChangeAction(event.target)}
                    value={title}
                />
            </label>
            <label>
                <p>내용</p>
                <textarea
                    name="content"
                    onChange={(event) => inputChangeAction(event.target)}
                    value={content}
                />
            </label>
            <input type="file" multiple />

            <button onClick={() => submitEvent()}>완료</button>
        </div>
    );
};

export default BoardAdd;
