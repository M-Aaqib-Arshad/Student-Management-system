import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { onAuthStateChanged } from 'firebase/auth';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { auth, firestore } from '../../config/firebase';

import { Button, Input, Space, Tooltip, message } from 'antd';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";





export default function Datatable() {
  const [user, setUser] = useState({})
  const [search, setSearch] = useState("")

  const [documents, setDocuments] = useState([])
  const [filterDocuments, setFilterDocuments] = useState([])
  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setUser(user)
        
      }
      else {
        console.log('dashboard Signout')
        setUser(null)
      }
    });
  }, [])
  const getData = async () => {

    const querySnapshot = await getDocs(collection(firestore, "users"));
    const array = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let data = doc.data()
      array.push(data)
      // console.log(doc.id, " => ", doc.data());
    });

    // setAllDocuments(array)
    setDocuments(array)
    if(array!==filterDocuments) {
      setFilterDocuments(array)

    }
    console.log('Array', array)
  }
  useEffect(()=>{
    getData();
  },[])

  useEffect(()=>{
   
    const result = documents.filter((doc)=>{
      return doc.name.toLowerCase().match(search.toLowerCase())
    })
    setFilterDocuments(result)
  },[search])

  const columns = [
    {
      name: "UId",
      selector: (row) => row.uid,
      sortable:true
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable:true
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable:true
    },
    {
      name: "Date of Birth",
      selector: (row) => row.DoB,
      sortable:true
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable:true
    },
    {
      name: "Role",
      selector: (row) => row.roles[0],
      sortable:true
    },
    {
      name: "Action",
      cell: (row) => (
        <Space >
          <Tooltip title="Delete" color='red'><Button danger icon={<DeleteOutlined />} onClick={() => {
            handleDelete(row)
          }} /></Tooltip>
          <Tooltip title="Update"><Button type="primary" icon={<EditOutlined />} onClick={() => { handleUpdate(row) }} />
          </Tooltip>
        </Space>
      )
    },
  ]
  const handleUpdate= () =>{

  }

  const handleDelete = async (user) => {
    try {
        // only Update  Go to cloud Firestore> add and manage data > delete data 
        await deleteDoc(doc(firestore, "users", user.uid));
        message.success("User is Successfully deleted.")
        

    } catch (e) {
        console.error("Error adding document: ", e);
        return message.error("Something went wrong, User doesn't deleted")
    }
}

  return (
    <>
      <div className="w-100">

        <DataTable
          title="Users"
          columns={columns}
          data={filterDocuments}
          pagination
          fixedHeader
          fixedHeaderScrollHeight='500px'
          selectableRows
          selectableRowsHighlight
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input
             type='text' 
            placeholder='Search here...'
             className='form-control w-25' 
             value={search}
             onChange={(e)=>{setSearch(e.target.value)}}
             />
          }
          subHeaderAlign='right'
        />

      </div>
    </>
  )
}

// import React, { useEffect, useState } from 'react'
// import DataTable from 'react-data-table-component'
// import { onAuthStateChanged } from 'firebase/auth';
// import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
// import { auth, firestore } from '../../config/firebase';

// import { Button, Input, Space, Tooltip, message } from 'antd';
// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";





// export default function Datatable() {
//   const [user, setUser] = useState({})
//   const [documents, setDocuments] = useState([])
//   useEffect(() => {

//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/auth.user
//         setUser(user)
        
//       }
//       else {
//         console.log('dashboard Signout')
//         setUser(null)
//       }
//     });
//   }, [])
//   const getData = async () => {

//     const querySnapshot = await getDocs(collection(firestore, "users"));
//     const array = []
//     querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       let data = doc.data()
//       array.push(data)
//       // console.log(doc.id, " => ", doc.data());
//     });

//     // setAllDocuments(array)
//     if(array !== documents){

//       setDocuments(array)
//     }
//     console.log('Array', array)
//   }
//   useEffect(()=>{
//     getData();
//   },[documents])

//   const columns = [
//     {
//       name: "UId",
//       selector: (row) => row.uid,
//       sortable:true
//     },
//     {
//       name: "Name",
//       selector: (row) => row.name,
//       sortable:true
//     },
//     {
//       name: "Email",
//       selector: (row) => row.email,
//       sortable:true
//     },
//     {
//       name: "Date of Birth",
//       selector: (row) => row.DoB,
//       sortable:true
//     },
//     {
//       name: "Status",
//       selector: (row) => row.status,
//       sortable:true
//     },
//     {
//       name: "Role",
//       selector: (row) => row.roles[0],
//       sortable:true
//     },
//     {
//       name: "Action",
//       cell: (row) => (
//         <Space >
//           <Tooltip title="Delete" color='red'><Button danger icon={<DeleteOutlined />} onClick={() => {
//             handleDelete(row)
//           }} /></Tooltip>
//           <Tooltip title="Update"><Button type="primary" icon={<EditOutlined />} onClick={() => { handleUpdate(row) }} />
//           </Tooltip>
//         </Space>
//       )
//     },
//   ]
//   const handleUpdate= () =>{

//   }

//   const handleDelete = async (user) => {
//     try {
//         // only Update  Go to cloud Firestore> add and manage data > delete data 
//         await deleteDoc(doc(firestore, "users", user.uid));
//         message.success("User is Successfully deleted.")
        

//     } catch (e) {
//         console.error("Error adding document: ", e);
//         return message.error("Something went wrong, User doesn't deleted")
//     }
// }

//   return (
//     <>
//       <div className="w-100">

//         <DataTable
//           title="User"
//           columns={columns}
//           data={documents}
//           pagination
//           fixedHeader
//           fixedHeaderScrollHeight='500px'
//           selectableRows
//           selectableRowsHighlight
//           highlightOnHover
//           subHeader
//           subHeaderComponent={
//             <input
//              type='text' 
//             placeholder='Search here...'
//              className='form-control w-25' 
//              />
//           }
//           subHeaderAlign='right'
//         />

//       </div>
//     </>
//   )
// }
