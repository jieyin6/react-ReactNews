import React, { Component } from 'react';
import { Icon, Button,Tabs, Modal, Form, Input, message } from 'antd';
import { Link } from 'react-router-dom'
import '../css/mobile.css'
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;


class MobileHeader extends Component {
    constructor() {
        super();
        this.state = {
            key:'top',
            islogined:false,
            userName:'',
            visible:false
        };
        //this.setModal = this.setModal.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this)
      }
      
      setModal(val) {
        if(localStorage.userId !== ''){
          this.setState({visible:false})
        }else{
          this.setState({visible:val})
        }
        
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
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=register&username="+formData.r_username+"&password="+formData.r_password+"&r_userName="+formData.r_username+"&r_password="+formData.r_password+"&r_confirmPassword="+formData.r_confrimpassword+"",myFetchOptions)
        .then(res => res.json()).then(json =>{
          console.log(json);
          
        })
        message.info('注册成功')
       this.setModal(false)
      }
      handleSubmitLogin(e) {
        e.preventDefault()
        let myFetchOptions = {
            method:'GET'
        }
        console.log(this.props.form);
        let formData = this.props.form.getFieldsValue()
        console.log(formData);
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=login&username="+formData.username+"&password="+formData.password+"&r_userName="+formData.r_username+"&r_password="+formData.r_password+"&r_confirmPassword="+formData.r_confrimpassword+"",myFetchOptions)
        .then(res => res.json()).then(json =>{
          console.log(json);
          this.setState({islogined:true,userName:json.NickUserName,userId:json.UserId})
          localStorage.userId = json.UserId
          localStorage.username = json.NickUserName
        })
        message.info('登录成功')
       this.setModal(false)
      }
  render() {
      let {getFieldDecorator} = this.props.form
      let icon = this.state.islogined ?
        <Icon type="mail"></Icon>
        : <Icon type="setting"></Icon>
    return (
      <div className="mobile-header">
        <header>
            <img  src={require('../images/logo.png')} alt='logo'/>
            <span>ReactNews</span>
            <div className="header-right" onClick={()=>this.setModal(true)}>
            <Link to={'/usercenter'}>
              {icon}
            </Link>
            </div>
            <Modal
          title="用户中心"
          visible={this.state.visible}
          onOk={()=>this.setModal(false)}
          onCancel={()=>this.setModal(false)}
          okText="确认"
        >
          <Tabs defaultActiveKey="1" >
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
            <Form onSubmit={this.handleSubmit}>
              <FormItem label="用户名"  >
                <Input placeholder="请输入用户名" />
              </FormItem>
              <FormItem label="密码"  >
                <Input type="password" placeholder="请输入密码" />
              </FormItem>
              <FormItem >
                <Button type="primary" htmlType="submit">登录</Button>
              </FormItem>
            </Form>
          </TabPane>
          </Tabs>
        </Modal>
        </header>
        
      </div>
    );
  }
}

export default MobileHeader = Form.create()(MobileHeader);
