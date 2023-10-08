import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, DatePicker, Divider, Form, Input, Row, Select, Typography, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'

import { doc, getDoc, setDoc } from 'firebase/firestore'
import { firestore } from 'config/firebase'
import dayjs from 'dayjs'
import { UserOutlined } from '@ant-design/icons';
// Icons 


const { Title } = Typography

const initialState = {
  name: "", username: "", email: "", password: "", confirmPassword: "", address: "", DoB: "",
}

export default function UpdateTodo() {

  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const navigate = useNavigate()
  const params = useParams()

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  const handleDate = (_, date) => setState(s => ({ ...s, date }))

  const getDocument = useCallback(async () => {

    const docRef = doc(firestore, "users", params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const user = docSnap.data()
      setState(user)
    } else {
      // docSnap.data() will be undefined in this case
      message.error("User not found")
    }
  }, [params.id])

  useEffect(() => {
    getDocument()
  }, [getDocument])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, username, email, address,status,DoB,roles } = state

    if (!name) { return message.error("Please enter name") }

    const user = {
      ...state,
      name, username, email,address , status,DoB,roles,
      dateModified: new Date().getTime(),
    }

    setIsProcessing(true)
    try {
      await setDoc(doc(firestore, "users", user.uid), user);
      message.success("Todo updated successfully")
      navigate("/dashboard/students")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setIsProcessing(false)
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card p-3 p-md-4">
              <Title level={2} className='m-0 text-center'>Update User Info</Title>

              <Divider />

              <Form layout="vertical">
                <Row gutter={16}>
                  <Col xs={24} lg={12}>
                    <Form.Item label="Name">
                      <Input placeholder='Input your name' name='name' value={state.name} onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                      <Form.Item label="User Name">
                        <Input placeholder="Your User Name" prefix={<UserOutlined />} name='username' value={state.username} onChange={handleChange} />
                      </Form.Item>
                    </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item label="Address">
                      <Input placeholder='Input your address' name='address' value={state.address} onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item label="Date of birth">
                      <DatePicker className='w-100' value={state.DoB ? dayjs(state.DoB) : ""} onChange={handleDate} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item label="Status">
                      <Select value={state.status} onChange={status => setState(s => ({ ...s, status }))}>
                        {["active", "inactive"].map((status, i) => {
                          return <Select.Option key={i} value={status}>{status}</Select.Option>
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item label="Role">
                      <Select value={state.roles} onChange={roles => setState(s => ({ ...s, roles }))}>
                        {["admin", "student"].map((roles, i) => {
                          return <Select.Option key={i} value={roles}>{roles}</Select.Option>
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="Email">
                      <Input.TextArea placeholder='Input your description' name='email' value={state.email} onChange={handleChange} />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 8 }} >
                    <Button type='primary' htmlType='submit' className='w-100' loading={isProcessing} onClick={handleSubmit}>Update User Info</Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
