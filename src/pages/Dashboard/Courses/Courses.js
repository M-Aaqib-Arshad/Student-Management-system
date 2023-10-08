import React, { useEffect, useState } from 'react'
import { Avatar, Button, Col, DatePicker, Divider, Form, Image, Input, Modal, Row, Select, Space, Tooltip, message } from 'antd'
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons"
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { firestore } from 'config/firebase'
import { useAuthContext } from 'contexts/AuthContext'

export default function Courses() {

  const { user } = useAuthContext()
  const [allDocuments, setAllDocuments] = useState([])
  const [documents, setDocuments] = useState([])
  const [status, SetStatus] = useState("active")
  const [course, setCourse] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => setCourse(s => ({ ...s, [e.target.name]: e.target.value }))
  const handleDate = (_, date) => setCourse(s => ({ ...s, date }))

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

  useEffect(() => {
    getTodos()
    console.log('allDocuments', allDocuments)
  }, [status])

  useEffect(() => {
    const filteredDocuments = allDocuments.filter(course => course.status === status)
    setDocuments(filteredDocuments)
  }, [allDocuments, status,documents])

  const handleEdit = (course) => {
    console.log('course', course)
    setCourse(course)
    setIsModalOpen(true)
  }
  const handleUpdate = async () => {
    let { courseName, courseCode,description,status } = course

    if (!courseName) { return message.error("Please enter course") }

    const updatedCourse = {
      ...course,
      courseName, courseCode,description,
      status, dateCreated: new Date().getTime()
    }
    try {
      await setDoc(doc(firestore, "courses", course.id), updatedCourse);
      message.success("Course is updated successfully")
      navigate("/dashboard/courses")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setIsModalOpen(false)
  }


  const handleDelete = async (course) => {
    console.log('course', course)
    try {
      await deleteDoc(doc(firestore, "courses", course.id));

      let documentsAfterDelete = documents.filter(doc => doc.id !== course.id)
      setAllDocuments(documentsAfterDelete)
      setDocuments(documentsAfterDelete)
      message.success("Course deleted successfully")
    } catch (err) {
      console.error(err)
      message.error("something went wrong while delting todo")
    }
  }

  return (
    <>
      <div className='py-5'>
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <h1>Courses</h1>
              <Select placeholder="Select status" onChange={status => SetStatus(status)}>
                {["active", "inactive"].map((status, i) => {
                  return <Select.Option key={i} value={status}>{status}</Select.Option>
                })}
              </Select>
            </div>
          </div>
          <Divider />

          <div className="row">
            <div className="col">
              <div className="table-responsive">
                <table className="table table-striped align-middle">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Course id</th>
                      <th>Course Name</th>
                      <th>Course Code</th>
                      <th>Course Description</th>
                      <th>Date Created</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((course, i) => {
                      console.log('todo', course)
                      return (
                        <tr key={i}>
                          <th>{i + 1}</th>
                          <td>{course.id}</td>
                          <td>{course.courseName}</td>
                          <td>{course.courseCode}</td>
                          <td>{course.description}</td>
                          <td>{course.dateCreated? dayjs(course.dateCreated).format("dddd, DD/MM/YYYY") : ""}</td>
                          <td>{course.status}</td>
                          <td>
                            <Space>
                              <Tooltip title="Delete" color='red'><Button danger icon={<DeleteOutlined />} onClick={() => { handleDelete(course) }} /></Tooltip>
                              <Tooltip title="Edit"><Button type="primary" icon={<EditOutlined />} onClick={() => {handleEdit(course)}} /></Tooltip>
                            </Space>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Update Course"
        centered
        open={isModalOpen}
        onOk={handleUpdate}
        okText="Confirm"
        cancelText="Close"
        onCancel={() => setIsModalOpen(false)}
        style={{ width: 1000, maxWidth: 1000 }}
      >
        <Form layout="vertical" className='py-4'>
          <Row gutter={16}>
            <Col xs={24} lg={8}>
              <Form.Item label="Coure Name">
                <Input placeholder='Enter Course Name' name='courseName' value={course.courseName} onChange={handleChange} />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item label="Course Code">
                <Input placeholder='Enter Course Code' name='courseCode' value={course.courseCode} onChange={handleChange} />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
                    <Form.Item label="Status">
                      <Select value={course.status} onChange={status => setCourse(s => ({ ...s, status }))}>
                        {["active", "inactive"].map((status, i) => {
                          return <Select.Option key={i} value={status}>{status}</Select.Option>
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
           
            <Col span={24}>
              <Form.Item label="Description" className='mb-0'>
                <Input.TextArea placeholder='Enter description' name='description' value={course.description} onChange={handleChange} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}
