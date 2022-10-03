import React from 'react';
import { useState } from 'react';



const initialInput = {
    title: "",
}


const MoimAdd = () => {
    const [inputData, setInputData] = useState(initialInput);

    const {title} = inputData;


    const inputEventAction = (event) => {
        const {name, value} = event.target;
        console.log(name, value);

        const tempInputData = {
            ...inputData,
            [name]: value
        };

        setInputData(tempInputData);
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
                            <span>+<br/> 이미지를 추가해주세요.</span>
                            <input type="file" multiple accept=".gif, .jpg, .png"/>
                        </div>
                    </div>
                </div>
                <div className='right'>
                    <label htmlFor='title'>
                        <input name='title' id='title' 
                            placeholder='제목을 입력하세요.'
                            defaultValue={title}
                            onChange={(event) => inputEventAction(event)}/>
                    </label>
                </div>
            </form>
        </div>
    );
};

export default MoimAdd;