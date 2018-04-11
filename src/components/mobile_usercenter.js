import React, { Component } from 'react';
import { Col, Row, BackTop, Tabs,Upload, Icon, Modal, Card} from 'antd';
import { Router, Route, Link} from 'react-router-dom';
import MobileHeader from './mobile_header'
import MobileFooter from './mobile_footer'
const TabPane = Tabs.TabPane;

class MobileUsercenter extends Component {
    constructor() {
        super()
        this.state = {
          previewVisible: false,
          previewImage: '',
          fileList: [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          }],
          collections:'',
          comments:''
        }
    }
    componentWillMount() {
        let fetchOptions = {
            methods:'GET'
        }
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userId, fetchOptions)
            .then(response=>response.json())
            .then(json=>{
                this.setState({collections:json});
            });
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userId, fetchOptions)
            .then(response=>response.json())
            .then(json=>{
                this.setState({comments:json});
            });
      }
    handleCancel = () => this.setState({ previewVisible: false })
    handlePreview = (file) => {
      this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
      });
    }
    handleChange = ({ fileList }) => this.setState({ fileList })
 
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const props = {
        action: 'http://newsapi.gugujiankong.com/handler.ashx',
        headers: {
            "Access-Control-Allow-Origin":"*"
        },
    }
    let collections = this.state.collections
    let collList = collections.length > 0 
    ? 
    collections.reverse().map((item,index)=>(
        <Card key={index} type="inner"
        title={item.uniquekey}
        extra={<a  href={`/details/${item.uniquekey}`}>查看</a>}
        style={{marginTop:10}}>
        {item.Title}
        </Card>
    ))
    :'暂无收藏'
    let comments = this.state.comments
    let commList = comments.length > 0 
    ? 
    comments.reverse().map((item,index)=>(
        <Card key={index} type="inner"
        title={`于 ${item.datetime} 评论了文章 ${item.uniquekey}`}
        extra={<a  href={`/details/${item.uniquekey}`}>查看</a>}
        style={{marginTop:10}}>
        {item.Comments}
        </Card>
    ))
    :'暂无评论'
    return (
      <div>
        <MobileHeader/>
        <Row>
            
            <Col span={24}>
             <Tabs defaultActiveKey="1" >
                 <TabPane tab="我的收藏" key="1">
                 <Row>
					<Col span={24}>
					  {collList}
					</Col>
				  </Row>
                 </TabPane>
                 <TabPane tab="我的评论" key="2">
                 <Row>
					<Col span={24}>
					  {commList}
					</Col>
				  </Row>
                 </TabPane>
                 <TabPane tab="上传头像" key="3">
                 <div className="clearfix">
                  <Upload
                    {...props}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
               </div>
                 </TabPane>
             </Tabs>
            </Col>
            
        </Row>
        <MobileFooter/>
        <BackTop/>
      </div>
    );
  }
}

export default MobileUsercenter;