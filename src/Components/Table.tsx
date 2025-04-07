// import React from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, IconButton, Typography,Modal } from '@mui/material';
// import { Visibility, Delete } from '@mui/icons-material';
// import { Visibility, Delete,Close} from "@mui/icons-material";
// // import { UserContext } from "../ContextAPI/UserContext";
// import { useUser } from '../ContextApi/UserContext';
// import { useState } from 'react';

// const Tables = () => {
//   const { users } = useUser(UserContext)!;
//   // const [checked, setChecked] = useState<boolean>(false);
//   const [selectedUser, setSelectedUser] = useState<any | null>(null);
//   const [open, setOpen] = useState(false);
//   const {  deleteUser } = useUser();
//   const handleOpen = (user: any) => {
//     setSelectedUser(user);
//     setOpen(true); // Open the modal
// };
// const handleClose = () => {
//     setOpen(false);
//     setSelectedUser(null); // Clear selected user when closing modal
// };
// const handleDelete = (userId: string) => {
//     console.log(userId);
//     const updatedUsers = users.filter((user: any) => user !== userId);
//     console.log('Updated Users:', updatedUsers);
// };
  
//   return (
//    <Typography>
//     <Box
//       sx={{
//         py: 4,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         textAlign: 'center',
//       }}
     
//     >
   
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Password</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
         

//   {users.length === 0 ? (
//     <TableRow>
//       <TableCell colSpan={4}>No users available</TableCell>
//     </TableRow>
//   ) : (

//     [...new Set(users.map(user => user.email))].map(email => {
//       const user = users.find(u => u.email === email);
     
//       return (
//         {users.map((user: any, index: any) => (
//           <TableRow key={user.id}>
//         {/* <TableRow key={email}> */}
//           <TableCell>{user?.name}</TableCell>
//           <TableCell>{user?.email}</TableCell>
//           <TableCell>{user?.password}</TableCell>
//           <Switchusers
//                                     checked={checked}
//                                     onChange={(event) => setChecked(event.target.checked)}
//                                 />
//              <TableCell align="center">
//                                 <IconButton onClick={() => handleOpen(user)}>
//                                     <Visibility sx={{ color: "primary.main" }} />
//                                 </IconButton>
//                                 <IconButton
//                                     onClick={() => handleDelete(index)}
//                                     sx={{ ml: 2 }}
//                                 >
//                                     <Delete sx={{ color: "error.main" }} />
//                                 </IconButton>
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//             <Modal
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//             >
//                 <Box sx={{ ...style, width: 400 }}>
//                 <IconButton
//                         onClick={handleClose}
//                         sx={{
//                             position: 'absolute',
//                             top: 8,
//                             right: 8,
//                             color: 'grey.500',
//                         }}
//                     >
//                         <Close />
//                     </IconButton>
//                 {selectedUser && (
//                     <>
//                         <Typography id="modal-modal-title" variant="h6" component="h2">
//                             User Details
//                         </Typography>
//                         <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                             <strong>Name:</strong> {selectedUser.name}
//                         </Typography>
//                         <Typography id="modal-modal-description" sx={{ mt: 1 }}>
//                             <strong>Email:</strong> {selectedUser.email}
//                         </Typography>
//                         <Typography id="modal-modal-description" sx={{ mt: 1 }}>
//                             <strong>Password:</strong> {selectedUser.password}
//                         </Typography>
//            



import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, IconButton, Typography, Modal } from '@mui/material';
import { Visibility, Delete, Close } from '@mui/icons-material';
// import { UserContext } from "../ContextAPI/UserContext"; // This is commented out but can be included as needed
import { useUser } from '../ContextApi/UserContext';

const Tables = () => {
  const { users, deleteUser } = useUser(); 
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (user: any) => {
    setSelectedUser(user);
    setOpen(true); 
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null); 
  };

  const handleDelete = (userId: string) => {
    deleteUser(userId); 
  };

  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>No users available</TableCell>
              </TableRow>
            ) : (
              users.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell>{user?.name}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>{user?.password}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleOpen(user)}>
                      <Visibility sx={{ color: "primary.main" }} />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(user.id)} sx={{ ml: 2 }}>
                      <Delete sx={{ color: "error.main" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'grey.500',
            }}
          >
            <Close />
          </IconButton>
          {selectedUser && (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                User Details
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <strong>Name:</strong> {selectedUser.name}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                <strong>Email:</strong> {selectedUser.email}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                <strong>Password:</strong> {selectedUser.password}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default Tables;


