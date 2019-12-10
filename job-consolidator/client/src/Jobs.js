import React from 'react'
import Typography from '@material-ui/core/Typography';
import Job from './Job';
import JobModal from './JobModal'
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

export default function Jobs({jobs}){

    // React.useEffect(() => {
    //     const welcomeItem= document.querySelectorAll('.welcome-item');
    //     let delay = 0;
    //     welcomeItem.forEach(item => {
    //         setTimeout(() => item.style.opacity = 1, delay);
    //         delay += 500;
    //     })
    // }, []);

    // modal
    const [open, setOpen] = React.useState(false);
    const [selectedJob, selectJob] = React.useState({});

    // set state
    function handleClickOpen() {
      setOpen(true);
    }  
    function handleClose() {
      setOpen(false);
    }

    // pagination
    const numJobs = jobs.length;
    const numPages = Math.ceil(numJobs / 50);
    const [activeStep, setActiveStep] = React.useState(0);
    const jobsOnPage = jobs.slice(activeStep * 50, (activeStep * 50) + 50);

    // step == 0, show 0-49
    // step == 1, show 50 - 99

    function scrollToTop () {
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
          window.requestAnimationFrame(scrollToTop);
          window.scrollTo(0, c - c / 8);
        }
      };

    function handleNext() {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        scrollToTop();
    }

    function handleBack() {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
        scrollToTop();
    }    

    // loop through list of jobs
    // for each job 
    // set key and pass in job and cb func to job component
    //  -> update setOpen state
    //  -> update selectJob state

    //https://material-ui.com/api/mobile-stepper/
    return (
        <div className="jobs">
            <Typography variant="h4" component="h1">
                Software Jobs
            </Typography>
            <Typography variant="h6" component="h2">
                Found {numJobs} Jobs
            </Typography>

            {
                jobsOnPage.map(
                    (job) => <Job key={job.guid || job.id} job={job} onClick={() => {
                        console.log('clicked')
                        handleClickOpen(); //setOpen(true)
                        selectJob(job)
                    }} />
                )
            }

            <JobModal open={open} job={selectedJob} handleClose={handleClose} />

            <div>
                Page {activeStep + 1} of {numPages}
            </div>
            <MobileStepper
                variant="progress"
                steps={numPages}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === numPages - 1}>
                    Next
                    <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    <KeyboardArrowLeft />
                    Back
                    </Button>
                }
            />

        </div>
    )
}