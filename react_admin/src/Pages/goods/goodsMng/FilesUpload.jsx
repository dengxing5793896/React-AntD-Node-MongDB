import React from 'react'
import { Upload, Icon, Modal, message } from 'antd';
import axios from '../../../api/axios/axios'

// import { reqDeleteImg } from '../../api'
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class PicturesWall extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
    };

    componentWillMount(){
        if(this.props.imgs){
            let imgsArr = this.props.imgs.split(',')
            let fileList = imgsArr.map(item=>{
                return {
                    uid:item,
                    name:item,
                    status:'done',
                    url:`http://localhost:8080/public/images/${item}`,

                }
            })
           this.setState({fileList})
        }
      
    }
    setFile=()=>{

    }
    // 获取所有已上传图片的数组 
    getImgs = () => this.state.fileList.map(file => file.url.substr(file.url.lastIndexOf('/') + 1))

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }


        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handleChange = async ({ file, fileList }) => {
        //   console.log(file === fileList[fileList.length-1])

        if (file.status === 'done') {
            // 上传成功
            // 取出上传文件数据(后台响应数据)
            file = fileList[fileList.length - 1]
            const { name, url } = file.response.data

            // 保存到上传对象中
            file.url = url
            file.name = name

        } else if (file.status === 'removed') {
            let delName = file.url.substr(file.url.lastIndexOf('/') + 1)
            const result = await axios.post('/manage/img/delete', { name: delName })
            // console.log(result)
            if (result.status === 0) {
                message.success('删除后台上传图片成功!')
            } else {
                message.error('删除后台图片失败!')
            }
        }

        this.setState({ fileList })
    }

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传文件</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action="/manage/img/upload" // 上传图片的url
                    name="image" // 发到后台的文件参数名
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}
