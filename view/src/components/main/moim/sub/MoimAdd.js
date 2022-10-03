import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';



const initialInput = {
    title: "",
}


const MoimAdd = () => {
    const [inputData, setInputData] = useState(initialInput);
    const [fileStatus, setFileStatus] = useState(false);

    const inputRef = useRef({});

    
    const {title} = inputData;


    useEffect(() => {
        
    })


    const inputEventAction = (event) => {
        const {name, value} = event.target;
        console.log(name, value);

        const tempInputData = {
            ...inputData,
            [name]: value
        };

        setInputData(tempInputData);
    }


    const uploadImageAction = (event) => {
        const fileArr = Array.from(event.target.files);


        if(0 === fileArr.length || fileArr.length > 1) {
            alert("하나의 이미지를 선택해주세요.");
            return;
        }


        fileArr.forEach((item, idx) => {
            const reader = new FileReader();

            reader.onload = e => {
                if(idx === 0) {
                    inputRef.current.fileBox.style.backgroundImage = `url(${e.target.result})`;
                    setFileStatus(true);
                } 
            }

            reader.readAsDataURL(item);
        });
    }


    const initialFileInput = (event) => {
        inputRef.current.file.value = "";
        inputRef.current.fileBox.style.backgroundImage = 'url()';
        inputRef.current.fileRemove.className += 'fade-out';

        setTimeout(() => {
            setFileStatus(false);
        }, 300);

        return false;
    }


    return (
        <div id='moim-add-page' className='page-wrap'>
            <div className='title-wrap'>
                <h3>모임 개설하기</h3>
            </div>
            <form name='moim-form'>
                <div className='left'>
                    <div className='image-upload'>
                        <div className='main-image'>
                            <span 
                                className={fileStatus ? 'on' : ''}
                                ref={element => inputRef.current.fileBox = element}>
                                    +
                            </span>
                            <input ref={(element) => inputRef.current.file = element} type="file" 
                                onChange={(event) => uploadImageAction(event)}
                                multiple 
                                accept=".gif, .jpg, .png"/>
                        </div>
                        {fileStatus && 
                            <button 
                                ref={element => inputRef.current.fileRemove = element}
                                type='button' 
                                onClick={(event) => initialFileInput(event)}>이미지 삭제</button>}
                    </div>
                </div>
                <div className='right'>
                    <label htmlFor='title'>
                        <input name='title' 
                            placeholder='제목을 입력하세요.'
                            defaultValue={title}
                            onChange={(event) => inputEventAction(event)}/>
                    </label>
                    <div className='line'>
                        <label htmlFor='loc'>
                            <p>위치</p>
                            <input name='loc' 
                                placeholder='제목을 입력하세요.'
                                defaultValue={title}
                                onChange={(event) => inputEventAction(event)}/>
                        </label>
                        <label htmlFor='dues'>
                            <p>회비</p>
                            <input name='dues'
                                type='number' 
                                placeholder='없음'
                                defaultValue={title}
                                onChange={(event) => inputEventAction(event)}/>
                        </label>
                    </div>
                    
                </div>
            </form>
        </div>
    );
};

export default MoimAdd;