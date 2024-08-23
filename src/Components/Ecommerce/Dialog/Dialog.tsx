
import {useState} from 'react';
import Dialog from '@mui/material/Dialog';


const Dialog = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
       sx={{".MuiPaper-root": {background: "#181818"}}}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="">
          <span className="flex justify-end p-2 text-xl text-gray-600" onClick={handleClose}>
             
          </span>
          
          <Filter />
        </div>
        
      </Dialog>
  );
}

export default Dialog;