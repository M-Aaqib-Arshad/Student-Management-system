// import React from 'react'

// function Courses() {
//   return (
//     <>
//     courses
//     </>
//   )
// }

// export default Courses
import React, { useState } from 'react'
import { Button, Form, Input, Typography, DatePicker, Col, Row, message, Divider } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from '@ant-design/icons';
import { useAuthContext } from 'contexts/AuthContext'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, firestore } from 'config/firebase'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'

const { Title } = Typography
const initialState = {courseId: "", courseName: "", courseCode: "", description: ""}

export default function Courses() {

  const { dispatch,user } = useAuthContext()
//   console.log('user', user)
  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const { courseName, courseCode, description } = state

  const handleCourses = async (e) => {
    e.preventDefault()
    setIsProcessing(true)
    let { courseName, courseCode, description } = state

    if (!courseName) {
        setIsProcessing(false)
         return  message.error("Please enter course name correctly") }
    if (description.length < 10) { 
        setIsProcessing(false)
        return message.error("Description length is less than 10") }

    const course = {
      courseName, courseCode,description,
      status: "active",
      dateCreated: new Date().getTime(),
      id: Math.random().toString(36).slice(2),
      createdBy: {
        fullName: user.name,
        email: user.email,
        uid: user.uid,
      }
    }
    createDocument(course)
    setState(initialState)
  }

  const createDocument = async (course) => {
    try {
      await setDoc(doc(firestore, "courses", course.id), course);
      console.log('todo.id', course.id)
      message.success("A new course is added successfully")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setIsProcessing(false)
  }

  return (
    <main>
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-10">
            <div className="card py-5">
              <div className="card-body">

                <Form layout="vertical">
                <Title level={2} className='m-0 text-center'>Add Courses</Title>

                <Divider />

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Course Name">
                        <Input placeholder="Enter course name" name='courseName' value={courseName} onChange={handleChange} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Course Code">
                        <Input placeholder="Enter course code" name='courseCode' value={courseCode} onChange={handleChange} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item label="description">
                    <Input
                      placeholder="Course description"
                      name='description' onChange={handleChange} value={description}
                    />
                  </Form.Item>

                  <Button type='primary' htmlType='submit' className='w-100' loading={isProcessing} onClick={handleCourses}>Add</Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
