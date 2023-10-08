// import React from 'react'
// import { Navigate, Route, Routes } from 'react-router-dom'
// import Home from './Home'
// import UpdateTodo from './Home/UpdateTodo'
// import NoPage from '../../components/NoPage'

// export default function Index() {
//     return (
//         <div className='dashboard'>
//             <Routes>
//                 <Route path='/' element={<Navigate to="/dashboard/todos" />} />
//                 <Route path='/todos' element={<Home />} />
//                 <Route path='/todos/:id' element={<UpdateTodo />} />
//                 {/* <Route path='register' element={<Register />} />
//             <Route path='forgot-password' element={<ForgotPassword />} />
//         <Route path='reset-password' element={<ResetPassword />} /> */}
//                 <Route path="*" element={<NoPage />} />
//             </Routes>
//         </div>
//     )
// }
import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, Link } from 'react-router-dom'
// Pages 
import Home from './Home'
import NoPage from '../../components/NoPage'
import Students from './Students'
// Icons 
import { MenuOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { UploadOutlined, UserOutlined, MailOutlined, CheckCircleOutlined, } from '@ant-design/icons';
import { FaSearch, FaCalendarAlt } from '../../../node_modules/react-icons/fa';
import { Button, Layout, Menu, theme } from 'antd';
import { AiOutlineBars, AiTwotoneWallet } from '../../../node_modules/react-icons/ai';
// Pages 
import UpdateUser from "./Home/UpdateTodo"
import AddCourses from './AddCourses/Courses';
import Courses from './Courses';
// import Datatable from '../../../Components/Datatable/Datatable';
// import { auth, firestore } from '../../config/firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// import { collection, getDocs } from 'firebase/firestore';

const { Header, Content, Footer, Sider } = Layout;

const Hero = () => {
  const [Icons, setIcons] = useState([UserOutlined, CheckCircleOutlined, UploadOutlined, MailOutlined])
  const [names, setNames] = useState(['Users', 'Products', 'Resturant', 'Messages'])
  const [user, setUser] = useState({})
  const [documents, setDocuments] = useState([])
  const [tasks, setTasks] = useState([{ icon: DoubleRightOutlined, name: "Students", path: 'students' }, { icon: AiOutlineBars, name: "Attendance", path: 'Attendance' }, { icon: FaCalendarAlt, name: "Add Courses", path: 'add-courses' }, { icon: FaCalendarAlt, name: "Courses", path: 'courses' }, { icon: MailOutlined, name: "Messages", path: 'Messages' }, { icon: UserOutlined, name: "Profile", path: 'profile' }, { icon: UserOutlined, name: "Profile", path: 'profile' }, { icon: UserOutlined, name: "Profile", path: 'profile' }])

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="row d-flex justify-content-between w-100 ms-1 mt-3">
          <div className="col-6 mt-2">
            <strong style={
              {
                color: "white",
                paddingTop: "20px",
                marginTop: "40px !important",
                fontFamily: "sans-serif",
                fontSize: "20px"
              }
            }>Dashboard</strong>
          </div>
          <div className="col-4 text-end py-2">
            <MenuOutlined />
          </div>
        </div>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['4']}
          items={tasks.map(
            (object, index) => ({
              key: String(index + 1),
              icon: React.createElement(object.icon),
              label: <Link className='text-decoration-none' to={object.path} >{object.name}</Link>,
            }),
          )}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} ></Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div className='h-100'><div className="container">
            <Routes>
              {/* //                 <Route path='/' element={<Navigate to="/dashboard/" />} /> */}
              <Route path='/' element={<Home />} />
              <Route path='/users/:id' element={<UpdateUser />} />
              <Route path="add-courses" element={<AddCourses />} />
              <Route path="courses" element={<Courses />} />
              <Route path="students" element={<Students />} />
              <Route path="*" element={<NoPage />} />
            </Routes>


          </div>

          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default Hero;