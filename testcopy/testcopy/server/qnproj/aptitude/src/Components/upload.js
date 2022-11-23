import './main.scss';
import _ from 'lodash'; 

import API from '../../services';
import { Progress } from 'reactstrap';
import React,{ useState } from 'react';
import UploadIcon from './img/upload.png';

export const MultiUploader = (props) => {
    let {id,label,uploadUrl}=props
    const { id, label} = props;
    const {Progress,setProgress}=useState(0);
    const {isUploading,setUploading } = useState(false);
    const {uploadedImages,setuploadedImages} = useState([]);
    const onChange = async e =>{
        let formData = new FormData();
        setuploadedImages([]);
        // formData.append('file',e.target.files[0]);
        setUploading(true);
        let { data}=await API.posrt('images/multi-upload',formData,{
            onUploadProgress:({total,loaded})=>{
                setProgress(((loaded/total)*100).toFixed(2));
            }
        });
        setUploading(false);
        setProgress(0);
        setuploadedImages(data);
    }
    return(
        <div className='form-group'>
            <label
            htmlFor={id}
            className='text-primary font-weight-bold font-size-sm'>
                {label}
            </label>
            <div className='d-flex'>
                <div>
                    <input 
                    id={id}
                    type="file"
                    onchange={onChange}
                    className="form-control uploader-input"/>
                    <div
                    className="uploader-mask d-flex justify-content-center align-items-center">
                    <img src={UploadIcon} alt='upload-icons' className="upload-icon"/>
                    </div>

                </div>
                {
                    isUploading?(
                        <div className='flex-grow-1 mx-3'>
                            <div className='text-center'>{progress}%</div>
                            <Progress value={progress}/>
                        </div>
                    ):null
                }
            </div>
        </div>
    )
}