import React from 'react'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Chip from '@material-ui/core/Chip';

// https://reactjs.org/docs/forwarding-refs.html
// pass a ref and props to dialog that 'slides' up
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  function renderJobCat(job){
    if(job.categories){
        return job.categories.map((c) => {
          return <Chip size="small" label={c} style={chipStyle} />
      })
    }   
  }

  const chipStyle = {
    // color: "white",
    // backgroundColor: "DodgerBlue",
    margin: "2px",
    padding: "5px",
    fontFamily: "Arial"
  };

  export default function JobModal({job,  open, handleClose}) {
    
    if (!job.title) {
        return <div />
    }

    //https://material-ui.com/api/dialog/
    //https://stackoverflow.com/questions/37337289/react-js-set-innerhtml-vs-dangerouslysetinnerhtml
    //https://mathiasbynens.github.io/rel-noopener/
    
    //when click into each job, dialog will pop up
    return (
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {job.title} - 
            {job.company}
            {/* <img className={'detail-logo'} src={job.company_logo} /> */}
          </DialogTitle>
          <DialogContent>
            <DialogContentText 
                id="alert-dialog-slide-description"
            >
              {renderJobCat(job)}
              
            </DialogContentText>
            <DialogContentText 
                id="alert-dialog-slide-description"
                dangerouslySetInnerHTML={{__html: job.description || job.content}}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
            <a href={job.url || job.link} target="_blank" rel="noopener noreferrer">
                <Button color="primary">
                Apply
                </Button>
            </a>
          </DialogActions>
        </Dialog>
      </div>
    );
  }