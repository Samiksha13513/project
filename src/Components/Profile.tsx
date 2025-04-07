// import React from 'react';
// import { Box, Typography, Avatar } from '@mui/material';

// const Profile = () => {
 
//   const user = {
//     name: "samiksha Yadav",
//     email: "samiksha@yadav.com",
//     avatar: "SY" 
//   };

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
//       <Avatar sx={{ width: 100, height: 100, marginBottom: 2 }} src={user.avatar} />
//       <Typography variant="h5">{user.name}</Typography>
//       <Typography variant="body1" color="textSecondary">{user.email}</Typography>
//     </Box>
//   );
// };

// export default Profile;
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
 import { useSpring, animated } from '@react-spring/web';
 import { Avatar } from '@mui/material';

interface FadeProps {
  children: React.ReactElement<any>;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
  ownerState?: any;
}
const user = {

    name: "samiksha Yadav",
         email: "samiksha@yadav.com",
         avatar: "SY" 
    
};

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null as any, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null as any, true);
      }
    },
  });

  return (
   
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SpringModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>profile</Button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
//       <Avatar sx={{ width: 100, height: 100, marginBottom: 2 }} src={user.avatar} />
//       <Typography variant="h5">{user.name}</Typography>
//       <Typography variant="body1" color="textSecondary">{user.email}</Typography>
//     </Box>
        </Fade>
      </Modal>
    </div>
  );
}
