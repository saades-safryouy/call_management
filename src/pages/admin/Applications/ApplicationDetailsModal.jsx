import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";

import applicationService from "../../../services/applicationService";

const STATUS = [
  "PENDING",
  "UNDER_REVIEW",
  "ACCEPTED",
  "REJECTED",
];

const initialState = {
  candidateId: "",
  callId: "",
  status: "PENDING",
  finalScore: "",
};

export default function ApplicationFormModal({
  open,
  onClose,
  application,
  onSaved,
}) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (application) {
      setForm({
        candidateId: application.candidateId,
        callId: application.callId,
        status: application.status,
        finalScore: application.finalScore ?? "",
      });
    } else {
      setForm(initialState);
    }
  }, [application]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (application) {
        await applicationService.update(
          application.applicationId,
          form
        );
      } else {
        await applicationService.create(form);
      }

      onSaved();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {application ? "Edit Application" : "New Application"}
      </DialogTitle>

      <DialogContent>

        <Grid container spacing={2} mt={1}>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Candidate ID"
              name="candidateId"
              value={form.candidateId}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Call ID"
              name="callId"
              value={form.callId}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              {STATUS.map((status) => (
                <MenuItem
                  key={status}
                  value={status}
                >
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              label="Final Score"
              name="finalScore"
              value={form.finalScore}
              onChange={handleChange}
            />
          </Grid>

        </Grid>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Save
        </Button>

      </DialogActions>

    </Dialog>
  );
}