import React, { Component } from 'react';
import { Menu, Icon, Button, Row, Col, Tabs, Modal, Form, Input, message } from 'antd';
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
        .then((res)=>{res.json()}).then((json)=>{
            this.setState({userName:json.NickUserName,userId:json.userId})
        })
        message.info('注册成功')
        this.setModal(false)
      }
  render() {
      let {getFieldDecorator} = this.props.form
    return (
      <div className="mobile-header">
        <header>
            <img alt="logo"/>
            <span>ReactNews</span>
            <div className="header-right" onClick={()=>this.setModal(true)}>
              <Icon type="setting"></Icon>
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
        </header>
        
      </div>
    );
  }
}

export default MobileHeader = Form.create()(MobileHeader);
