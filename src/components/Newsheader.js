import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Menu, Icon, Button, Row, Col, Tabs, Modal, Form, Input, message } from 'antd';
import { getFileItem } from 'antd/lib/upload/utils';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

//import '../App.css'


class Newsheader extends Component {
  constructor() {
    super();
    this.state = {
        key:'top',
        islogined:false,
        userName:'',
        visible:false,
        userId:0,
        action:'login'
    };
    //this.setModal = this.setModal.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentWillMount(){
    if(localStorage.userId !== ''){
      this.setState({
        islogined:true,
        userName:localStorage.userName,
        userId:localStorage.userId
      })
    }
  }
  setModal(val) {
    this.setState({visible:val})
  }
  handleClick(e) {
    if(e.key === 'login'){
        this.setState({visible:true,key:"login"})
    }else{
        this.setState({key:e.key})
    }
  }
  handleSubmit(e) {
    e.preventDefault()
    let myFetchOptions = {
        method:'GET'
    }
    console.log(this.props.form);
    
    let formData = this.props.form.getFieldsValue()
    console.log(formData);
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=register&username=userName&password=password&r_userName="+formData.r_username+"&r_password="+formData.r_password+"&r_confirmPassword="+formData.r_confrimpassword+"",myFetchOptions)
    .then(res => res.json()).then(json =>{
      console.log(json);
        this.setState({userName:json.NickUserName,userId:json.UserId})
        localStorage.userId = json.UserId
        localStorage.userName = json.NickUserName
    })
    if(this.state.action == 'login'){
      this.setState({islogined:true})
    }
    message.info('注册成功')
    this.setModal(false)
  }
  handleTab(key) {
    if(key == 1){
      this.setState({action:'login'})
    }else{
      this.setState({action:'register'})
    }
  }
  logout(){
    localStorage.userId = ''
    localStorage.userName = ''
    this.setState({islogined:false})
  }
  render() {
      //接受页面的参数
    let { getFieldDecorator } = this.props.form
    let loginBtn = this.state.islogined ?
      <Menu.Item key="user" className="user-container">
      <Button icon="user" style={{ marginTop: 7 }}>{this.state.userName}</Button>
      &nbsp;&nbsp;
      <Link to={'/'} target='_blank'>
        <Button type="dashed">个人中心</Button>
      </Link>
      &nbsp;&nbsp;
      <Button type="primary" style={{ marginTop: 7 }} onClick={this.logout.bind(this)}>退出</Button>
      </Menu.Item>
      :
      <Menu.Item key="login">
        <Icon type="appstore" />注册/登录
      </Menu.Item>
    return (
      <div className="news-header">
        <Row>
          <Col span={2}></Col>
          <Col span={2} className='logo-container'>
            <span>ReactNews</span>
          </Col>
          <Col span={18}>
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.key]}
              mode="horizontal"
            >
               <Menu.Item key="top">
                 <Icon type="appstore" />头条
               </Menu.Item>
               <Menu.Item key="shehui">
                 <Icon type="appstore" />社会
               </Menu.Item>
               <Menu.Item key="guonei">
                <Icon type="appstore" />国内
               </Menu.Item>
               <Menu.Item key="guoji">
                <Icon type="appstore" />国际
               </Menu.Item>
               <Menu.Item key="yule">
                 <Icon type="appstore" />娱乐
               </Menu.Item>
               <Menu.Item key="tiyu">
                 <Icon type="appstore" />体育
               </Menu.Item>
               <Menu.Item key="keji">
                 <Icon type="appstore" />科技
               </Menu.Item>
               <Menu.Item key="时尚">
                <Icon type="appstore" />时尚
               </Menu.Item>
               {loginBtn}
            </Menu>

            <Modal
          title="用户中心"
          visible={this.state.visible}
          onOk={()=>this.setModal(false)}
          onCancel={()=>this.setModal(false)}
          okText="确认"
        >
          <Tabs defaultActiveKey="1" onChange={this.handleTab.bind(this)}>
          <TabPane tab="注册" key="1">
            <Form onSubmit={this.handleSubmit}>
              <FormItem label="用户名" >
              {
                  getFieldDecorator('r_username')(
                    <Input placeholder="请输入用户名"  />
                  )
              }
                
              </FormItem>
              <FormItem label="密码" >
                {
                    getFieldDecorator('r_password')(
                        <Input placeholder="密码" type="password" />
                    )
                }
                 
              </FormItem>
              <FormItem label="确认密码"  >
                {
                    getFieldDecorator('r_confrimpassword')(
                        <Input type="password" placeholder="请再次输入密码" />
                    )
                }
                
              </FormItem>
              <FormItem >
                <Button type="primary" htmlType="submit" >注册</Button>
              </FormItem>
            </Form>
          </TabPane>
          <TabPane tab="登录" key="2">
            <Form >
              <FormItem label="用户名"  >
                <Input placeholder="请输入用户名" />
              </FormItem>
              <FormItem label="密码"  >
                <Input type="password" placeholder="请输入密码" />
              </FormItem>
              <FormItem >
                <Button type="primary">登录</Button>
              </FormItem>
            </Form>
          </TabPane>
          </Tabs>
        </Modal>

          </Col>
          <Col span={2}></Col>
       </Row>
      </div>
    );
  }
}

export default Newsheader =  Form.create()(Newsheader);

