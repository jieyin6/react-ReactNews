import React, { Component } from 'react';
import { Button, Row, Col, Form, Input,Card, notification, Icon } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

//import '../App.css'


class Comment extends Component {
  constructor() {
    super();
    this.state = {
        comment:''
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addCollection = this.addCollection.bind(this)
   }
  componentWillMount(){
    let myFetchOptions = {
        method:'GET'
    }
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey="+this.props.uniquekey,myFetchOptions)
    .then(res=>res.json()).then(json=>{
        console.log(json);
        let arr = []
        let reverseArr = json.reverse()
        reverseArr.map((item,index)=>{
            if(index <= 20){
                arr.push(item)
            }
            return arr
        })
        this.setState({comment:arr})
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    let myFetchOptions = {
        method:'GET'
    }
    let formData = this.props.form.getFieldsValue()
    console.log(formData);
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid="+localStorage.userId+"&uniquekey="
    +this.props.uniquekey+"&comment="+formData.r_comment,myFetchOptions).then((res)=>res.json())
    .then(json => {
        this.componentWillMount()
    })
  }
  addCollection() {
    let myFetchOptions = {
        method:'GET'
    }
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid="+localStorage.userId+"&uniquekey="+this.props.uniquekey,myFetchOptions)
    .then(res=>res.json).then(json=>{
        notification.open({
            message: 'React News',
            description: '收藏成功',
            icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
          });
    })
 }
  render() {
      //接受页面的参数
    let { getFieldDecorator } = this.props.form
    let comments = this.state.comment
    let commentList = comments.length ?
    comments.map((item,index)=>(
      <Card type="inner" style={{ marginTop: 10 }} key={index} title={item.UserName} extra={<a href="#">发布于 {item.datetime}</a>}>
        <p>{item.Comments}</p>
      </Card>
    ))
    
    : '暂无评论'
    return (
      <div className="comment">
        <Row>
          <Col span={24}>
          {commentList}
          <br/>
            <Form onSubmit={this.handleSubmit}>
              <FormItem label="您的评论" >
              {
                  getFieldDecorator('r_comment')(
                    <TextArea rows={4} placeholder="请输入您的评论"  />
                  )
              }
              </FormItem>
              <FormItem >
                <Button type="primary" htmlType="submit" >提交评论</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button type="primary" htmlType="button" onClick={this.addCollection}>收藏该新闻</Button>
              </FormItem>
            </Form>
          </Col>
         </Row>
        </div>
    );
  }
}

export default Comment =  Form.create()(Comment);
