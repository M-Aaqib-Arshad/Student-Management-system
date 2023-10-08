
import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Typography, Col, Row, message, Divider, Select } from 'antd';
import { useAuthContext } from 'contexts/AuthContext'
import {  firestore } from 'config/firebase'
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore'

const { Title } = Typography
const initialState = {name: "", courseName: ""}

export default function Apply() {

  const { user } = useAuthContext()
//   console.log('user', user)
  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const [allDocuments, setAllDocuments] = useState([])
  const [documents, setDocuments] = useState([])


  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const getTodos = async () => {
    const q = query(collection(firestore, "courses"))
    const querySnapshot = await getDocs(q);
    const array = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let data = doc.data()
      console.log('data', data)
      array.push(data)
    });
    setAllDocuments(array)
    setDocuments(array)
  }


  const handleCourses = async (e) => {
    e.preventDefault()
    setIsProcessing(true)
    let { name, courseName } = state


    if (!courseName) {
        setIsProcessing(false)
         return  message.error("Please enter course name") }
 
    const attendance = {
      name,courseName, 
      status: "active",
      dateCreated: new Date().getTime(),
      id: Math.random().toString(36).slice(2),
      enrolledBy: {
        fullName: user.name,
        email: user.email,
        uid: user.uid,
      }
    }
    createDocument(attendance)
    setState(initialState)
  }

  const createDocument = async (attendance) => {
    try {
      await setDoc(doc(firestore, "attendance", attendance.id), attendance);
      message.success("A new course is added successfully")
    } catch (e) {
      message.success("Appy was unsuccessfull")
    }
    setIsProcessing(false)
  }
  useEffect(() => {
    getTodos()
    console.log('documents', documents)
  }, [])

  return (
    <main>
      <div className="container mt-4">
        <div className="row justify-content-center align-items-center">
          <div className="col-10">
            <div className="card py-5">
              <div className="card-body">

                <Form layout="vertical">
                <Title level={2} className='m-0 text-center'>Apply Now</Title>

                <Divider />

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Student Name">
                        <Input placeholder="Enter your name" name='name' value={state.name} onChange={handleChange} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} lg={12}>
                    <Form.Item label="Course Name">
                      <Select  value={state.courseName} onChange={courseName => setState(s => ({ ...s, courseName }))}>
                        {documents.map((object, i) => {
                          return <Select.Option key={i} value={object.courseName}>{object.courseName}</Select.Option>
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  </Row>

                  <Button type='primary' htmlType='submit' className='w-100' loading={isProcessing} onClick={handleCourses}>Apply Now</Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
