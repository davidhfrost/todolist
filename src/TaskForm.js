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

export default function TaskForm(props) {
  return (
    <div>
      <Dialog open={props.formOpen} onClose={props.handleClose}>
        <DialogTitle>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: 'center' }}
          >
            Add Task
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            color="warning"
            value={props.title}
            onChange={(e) => props.setTitle(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={props.description}
            onChange={(e) => props.setDescription(e.target.value)}
          />
          <FormControl>
            <FormLabel id="priority-group">Priority</FormLabel>
            <RadioGroup
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
            Add
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => props.handleClickCancel()}
          >
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
