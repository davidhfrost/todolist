import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AppBar from '@mui/material/AppBar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

// Date picker
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function TaskForm(props) {
  return (
    <div>
      <Dialog open={props.formOpen} onClose={props.handleClose}>
        <DialogTitle>
          <span>
            <AddCircleIcon />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: 'center' }}
            >
              Add Task
            </Typography>
          </span>
        </DialogTitle>
        <DialogContent>
          <br></br>
          {!props.editing && (
            <TextField
              autoFocus
              id="title"
              label="Title"
              type="text"
              fullWidth
              //variant="standard"
              //color="warning"
              value={props.title}
              onChange={(e) => props.setTitle(e.target.value)}
              error={props.titleError}
              {...(props.titleError
                ? { helperText: 'Title is Required!' }
                : {})}
            />
          )}
          <br></br>
          <br></br>
          <TextField
            autoFocus
            id="description"
            label="Description"
            type="text"
            fullWidth
            //variant="standard"
            value={props.description}
            onChange={(e) => props.setDescription(e.target.value)}
            error={props.descriptionError}
            {...(props.descriptionError
              ? { helperText: 'Description is Required!' }
              : {})}
            //{props.description.length != 0 ? false : true}
            //{props.description.length == 0 && helperText="Description is required!"}
          />
          <br></br>
          <br></br>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Deadline"
              value={props.deadline.toString()}
              inputFormat="MM/DD/YYYY"
              onChange={(newValue) => {
                props.setDeadline(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <br></br>
          <br></br>
          <FormControl>
            <FormLabel id="priority-group">Priority</FormLabel>
            <RadioGroup
              row
              aria-labelledby="priority-group"
              name="priority-group"
              value={props.priority}
              onChange={(e) => props.setPriority(e.target.value)}
            >
              <FormControlLabel value="low" control={<Radio />} label="Low" />
              <FormControlLabel value="med" control={<Radio />} label="Med" />
              <FormControlLabel value="high" control={<Radio />} label="High" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => props.handleClickAdd()}>
            <AddCircleIcon />
            Add
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => props.handleClickCancel()}
          >
            <DoDisturbIcon />
            Cancel
          </Button>
          {/*
          <Button onClick={props.handleClose}>Add</Button>
          <Button onClick={props.handleClose}>Cancel</Button>*/}
        </DialogActions>
      </Dialog>
    </div>
  );
}
