import React,{useRef, useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {cardsData} from '../data/cardsData';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function AddCard({inn, search}) {

  const imageInput = useRef("");

  const [input, setInput] = useState("");
  const [input1, setInput1] = useState("")
  const [image, setImage] = useState("");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleImage = (e) => {
    const image1 = e.target.files[0];
    setImage(URL.createObjectURL(image1));
  }

  const save = () => {
    if(input === "" || input1 === "" || image === ""){
        alert("")
    }
    else{
        cardsData.push({name:  input, description: input1, image: image})
        handleClose();
        search(Math.floor(Math.random() * 10000000))
        setInput("");
        setInput1("");
        setImage("");
    }
  }

  return (
    <div>
      <Button style={(inn==="pc")? ({color: "#ffffff"}): null} onClick={handleClickOpen}>
        Add Card
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth maxWidth="sm">
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add Card
        </DialogTitle>
        <DialogContent dividers style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
         
         {/* Card Name */}
         <div>
         <TextField id="outlined-basic" label="Card Name" variant="outlined" value={input} onChange={(e)=>{setInput(e.target.value)}}/>
         </div>

        <br />

         {/* Card Description */}
         <div>
         <TextField id="outlined-basic1" label="Card Discription" variant="outlined" value={input1} onChange={(e)=>{setInput1(e.target.value)}} />
         </div>

         <br />
         
         {/* Card Image */}
         <div>


         <span
                // className={(open === true)? (styles.edit) : (styles.edit2)}
                className={styles.edit}
                onClick={() => {
                  imageInput.current.click();
                }}
              >
                  {(image === "") ?(
                      <CloudUploadIcon size={100} style={{cursor: "pointer", fontSize: 140}} />
                  ):(
                    <img src={image} alt="Card Image" style={{width: 140, height: 140, objectFit: "contain"}} />
                  )}
        </span>


            <input
                  type="file"
                  accept="image/x-png,image/gif,image/jpeg"
                  name="image"
                  ref={imageInput}
                  onChange={(e) => handleImage(e)}
                  style={{ display: "none" }}
            />
         </div>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="secondary" onClick={()=>save()}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
